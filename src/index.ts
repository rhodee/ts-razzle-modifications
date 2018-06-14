import * as path from 'path'
import * as webpack from 'webpack'
import { isDev, isServer } from './utils'
import { coreResolver } from './resolve'
import { tsLoader } from './loader/typescript'
import { sourcemapLoader } from './loader/sourcemap'
import { modernizrcLoader } from './loader/modernizr'
import { cssLoader } from './loader/css'
import { cssPlugin } from './plugin/css'
import { offline } from './plugin/offline'
import { pwa } from './plugin/pwa'

import {
  common as commonPlugins,
  client as clientCommonPlugins
} from './plugin/common'
import { optimizeAssets } from './plugin/optimization'
import { defaultConfig } from './defaultConfig'

const rMods = path.resolve(__dirname, '..', 'node_modules')

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
    overrideTSLoader?: boolean
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
      loaders?: webpack.Loader[];
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
    const supportedExtension = ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
    const loaders =
      (razzleOptions.extensions && razzleOptions.extensions.loaders) || []

    // https://github.com/jaredpalmer/razzle/issues/412
    if (target === 'node' && config && config.output) {
      config.output.publicPath = `${process.env.PUBLIC_PATH}`
    }
    // const oldOut = config.output && config.output

    // if (oldOut) {
    //   config.output = { pathinfo: false, ...oldOut }
    // } else if (!oldOut) {
    //   config.output = { pathinfo: false }
    // }

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
    let babelLoader: number

    if (typeof customUniversalPluginHandler === 'function') {
      customUniversalPlugins = customUniversalPluginHandler(dev)
    } else if (Array.isArray(customUniversalPluginHandler)) {
      customUniversalPlugins = customUniversalPluginHandler
    }

    if (!config.module) {
      config.module = {
        rules: []
      }
    }

    /**
     * TODO (dr): determine why the webpack rule does not behave as expected.
     * when passing a loader.
     */
    (config.module as any).rules = (config.module as any).rules.concat(
      ...loaders
    )

    const r = (config.module as webpack.NewModule).rules
    babelLoader = r.findIndex(rule => {
      return rule['options'] && rule['options']['babelrc']
    })

    /**
     * This *should* enable use of both TS and babel
     */
    if (razzleOptions.overrideTSLoader) {
      delete razzleOptions.overrideTSLoader
      r.push(tsLoader(config, dev))
    } else {
      r[babelLoader] = tsLoader(config, dev)
    }

    r.push(sourcemapLoader())
    r.push(cssLoader(config, dev))
    /**
     * Set the sourcemap tool.
     */
    config.devtool = isDev(dev) ? config.devtool : 'source-map'

    /**
     * Insert webpack plugins that are intended for both client and server.
     */
    config.plugins && config.plugins.push(...customUniversalPlugins)

    /**
     * If the razzle builder provides alias paths, support it.
     */
    const aliasPaths =
      (razzleOptions.extensions && razzleOptions.extensions.aliasPaths) || {}

    config.resolve = {
      ...config.resolve,
      ...coreResolver(config, aliasPaths, supportedExtension)
    }

    if (config.resolveLoader) {
      config.resolveLoader.modules =
        config.resolveLoader.modules &&
        config.resolveLoader.modules.concat(rMods)
    }

    /**
     * CLIENT SIDE CONFIGURATION
     */
    if (!isServer(target)) {
      if ((config.module as webpack.NewModule).rules) {
        r.push(modernizrcLoader(razzleOptions.modernizrConfig))
        // Set the output path for client-side JS
        if (config.output) {
          config.output.filename = isDev(dev)
            ? 'static/js/[name].js'
            : 'static/js/[name].[hash:8].js'
        }
      }

      if (config.entry && razzleOptions.vendorPaths) {
        config.entry['vendor'] = razzleOptions.vendorPaths || []
      }
    }

    /**
     * SERVER SIDE CONFIGURATION
     */
    if (isServer(target)) {
      if ((config.module as webpack.NewModule).rules) {
        r.push({ test: /.scss$/, use: 'css-loader' })
      }
    }

    config.module['rules'] = r

    /**
     * PLUGINS
     * Accept webpack.Plugin | (isDev: boolean) => webpack.Plugin
     * Should be used to provide the right webpack rule for the
     * given context but switch on the current environment.
     */
    const c = (config.plugins && config.plugins) || []

    if (!isDev(dev) && !isServer(target)) {
      c.push(...optimizeAssets(), cssPlugin)
    }

    if (isServer(target)) {
      if (typeof customServerPluginHandler === 'function') {
        customServerPlugins = customServerPluginHandler(dev)
      } else if (Array.isArray(customServerPluginHandler)) {
        customServerPlugins = customServerPluginHandler
      }

      c.push(...customServerPlugins)
      config.plugins = c
    }

    if (!isServer(target)) {
      const wbcPlugin = razzleOptions.workboxConfig
        ? offline(razzleOptions.workboxConfig)
        : []
      const pwaPlugin = razzleOptions.pwaConfig
        ? pwa(razzleOptions.pwaConfig)
        : []

      if (typeof customClientPluginHandler === 'function') {
        customClientPlugins = customClientPluginHandler(dev)
      } else if (Array.isArray(customClientPluginHandler)) {
        customClientPlugins = customClientPluginHandler
      }

      c.push(...customClientPlugins)

      c.push(
        ...commonPlugins(),
        ...clientCommonPlugins(),
        ...customClientPlugins,
        ...pwaPlugin,
        ...wbcPlugin
      )
      config.plugins = c
    }

    return config
  }
}
