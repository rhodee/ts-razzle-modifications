import App from './App';
import * as React from 'react';
import { StaticRouter } from 'react-router-dom';
import * as express from 'express';
import { renderToString } from 'react-dom/server';

const assets = require((process.env.RAZZLE_ASSETS_MANIFEST as string));

const server = express();
server
  .disable('x-powered-by')
  .use(express.static((process.env.RAZZLE_PUBLIC_DIR as string)))
  .get('/*', (req, res) => {
    const context: any = {};
    const markup = renderToString(
      <StaticRouter context={context} location={req.url}>
        <App />
      </StaticRouter>
    );

    if (context.url) {
      res.redirect(context.url);
    } else {
      res.status(200).send(
        `<!doctype html>
    <html lang="">
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${assets.client.css
          ? `<link rel="stylesheet" href="${assets.client.css}">`
          : ''}
          </head>
    <body>
        <div id="root">${markup}</div>
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assets.manifest.js}" defer></script>`
          : `<script src="${assets.manifest.js}" defer crossorigin></script>`}
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assets.vendor.js}" defer></script>`
          : `<script src="${assets.vendor.js}" defer crossorigin></script>`}
        ${process.env.NODE_ENV === 'production'
          ? `<script src="${assets.client.js}" defer></script>`
          : `<script src="${assets.client.js}" defer crossorigin></script>`}
    </body>
</html>`
      );
    }
  });

export default server;
