import * as path from 'path'
import * as webpack from 'webpack'
import { isDev, isServer } from './utils'
import { coreResolver } from './resolve'
import { tslintLoader, tsLoader } from './loader/typescript'
import { sourcemapLoader } from './loader/sourcemap'
import { stylelintPlugin } from './plugin/stylelint'
import { offline } from './plugin/offline'
import {
  common as commonPlugins,
  client as clientCommonPlugins
} from './plugin/common'
import { optimizeAssets } from './plugin/optimization'
import { modernizrcLoader } from './loader/modernizr'
import { defaultConfig } from './defaultConfig'

export declare namespace razzleBuild {
  type PluggableFunc = (prodOnly: boolean) => webpack.Plugin[]
  type Plugins = webpack.Plugin[] | PluggableFunc
  interface ModifyOptions {
    dev: boolean
    target: string
  }

  interface AliasPaths {
    [name: string]: string
  }

  interface Configuration {
    appRoot: string
    cssModules?: {
      cssFilePath: string;
      moduleIdentifer: string;
    }
    extensions?: {
      aliasPaths?: razzleBuild.AliasPaths;
      plugins?: {
        client?: razzleBuild.Plugins;
        server?: razzleBuild.Plugins;
        universal?: razzleBuild.Plugins;
      };
      styleLint?: {
        cssPath: string[];
      };
      tslintConfig?: string;
    }
    modernizrConfig: RegExp
    pwaConfig: any
    srcRoot?: string
    vendorPaths: string[]
    workboxConfig: any
  }
}

export function modifyBuilder (
  razzleOptions: razzleBuild.Configuration = defaultConfig
) {
  return (
    baseConfig: webpack.Configuration,
    { target, dev }: razzleBuild.ModifyOptions,
    _webpackConfig: webpack.Compiler
  ) => {
    const config = baseConfig
    const supportedExtension = ['.ts', '.tsx', '.css']
    const slFiles =
      razzleOptions.extensions &&
      razzleOptions.extensions.styleLint &&
      razzleOptions.extensions.styleLint.cssPath
    const stylelintConfig = {
      context: path.resolve(razzleOptions.appRoot),
      files: slFiles || []
    }

    /**
     * Add user specified additional plugins customized by
     * target and environment.
     */
    const customServerPluginHandler =
      razzleOptions.extensions &&
      razzleOptions.extensions.plugins &&
      razzleOptions.extensions.plugins.server
    const customUniversalPluginHandler =
      razzleOptions.extensions &&
      razzleOptions.extensions.plugins &&
      razzleOptions.extensions.plugins.universal
    const customClientPluginHandler =
      razzleOptions.extensions &&
      razzleOptions.extensions.plugins &&
      razzleOptions.extensions.plugins.client

    let customServerPlugins: webpack.Plugin[] = []
    let customClientPlugins: webpack.Plugin[] = []
    let customUniversalPlugins: webpack.Plugin[] = []

    if (typeof customUniversalPluginHandler === 'function') {
      customUniversalPlugins = customUniversalPluginHandler(dev)
    } else if (Array.isArray(customUniversalPluginHandler)) {
      customUniversalPlugins = customUniversalPluginHandler
    }

    baseConfig.plugins && baseConfig.plugins.push(...customUniversalPlugins)

    if (isServer(target)) {
      if (typeof customServerPluginHandler === 'function') {
        customServerPlugins = customServerPluginHandler(dev)
      } else if (Array.isArray(customServerPluginHandler)) {
        customServerPlugins = customServerPluginHandler
      }

      if (isDev(dev)) {
        baseConfig.plugins && baseConfig.plugins.push(...customServerPlugins)
      } else if (!isDev(dev)) {
        baseConfig.plugins && baseConfig.plugins.push(...customServerPlugins)
      }
    }

    if (!isServer(target)) {
      if (typeof customClientPluginHandler === 'function') {
        customClientPlugins = customClientPluginHandler(dev)
      } else if (Array.isArray(customClientPluginHandler)) {
        customClientPlugins = customClientPluginHandler
      }
      if (isDev(dev)) {
        baseConfig.plugins && baseConfig.plugins.push(...customClientPlugins)
      } else if (!isDev(dev)) {
        baseConfig.plugins && baseConfig.plugins.push(...customClientPlugins)
      }
    }

    if (!config.module) {
      config.module = {
        rules: []
      }
    }

    const aliasPaths =
      (razzleOptions.extensions && razzleOptions.extensions.aliasPaths) || {}

    config.resolve = {
      ...coreResolver(config, aliasPaths, supportedExtension)
    }
    config.devtool = isDev(dev) ? 'cheap-module-source-map' : 'source-map'

    let babelLoader: number

    if (config.module && config.module.hasOwnProperty('rules')) {
      const r = (config.module as webpack.NewModule).rules
      babelLoader = r.findIndex(
        rule => rule['options'] && rule['options']['babelrc']
      )
      r[babelLoader] = tsLoader(config)
      r.push(sourcemapLoader())
      if (razzleOptions.extensions && razzleOptions.extensions.tslintConfig) {
        r.push(tslintLoader(config, razzleOptions.extensions.tslintConfig))
      }
    }

    if (!isServer(target)) {
      if (config.module && config.module.hasOwnProperty('rules')) {
        const r = (config.module as webpack.NewModule).rules
        r.push(modernizrcLoader(razzleOptions.modernizrConfig))
      }

      // Set the output path for client-side JS
      if (config.output) {
        config.output.filename = isDev(dev)
          ? 'static/js/[name].js'
          : 'static/js/[name].[hash:8].js'
      } else {
        config.output = {
          filename: isDev(dev)
            ? 'static/js/[name].js'
            : 'static/js/[name].[hash:8].js'
        }
      }

      if (config.entry && config.entry['vendor']) {
        config.entry['vendor'] = razzleOptions.vendorPaths || []
      }

      if (Array.isArray(config.plugins)) {
        config.plugins.push(
          ...stylelintPlugin(stylelintConfig),
          ...offline(razzleOptions.workboxConfig, razzleOptions.pwaConfig),
          ...commonPlugins(),
          ...clientCommonPlugins()
        )
      } else {
        config.plugins = []
        config.plugins.push(
          ...stylelintPlugin(stylelintConfig),
          ...offline(razzleOptions.workboxConfig, razzleOptions.pwaConfig),
          ...commonPlugins(),
          ...clientCommonPlugins()
        )
      }

      if (!isDev(dev)) {
        config.plugins.push(...optimizeAssets())
      }
    }

    return config
  }
}
