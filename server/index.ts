require('dotenv').config();
import compression from 'compression';
import express from 'express';
import next from 'next';
import renderAndCache from './cache/cache';
import getSiteMap from './sitemap/sitemap';

const port = parseInt(process.env.PORT, 10) || 4200;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const path = require('path');
const publicDir = path.join(__dirname, '../public');

app.prepare()
  .then(() => {
    const server = express();
    server.use(compression());

    server.use('/', express.static(publicDir));

    server.get('/_next/*', (req, res) => {
      handle(req, res);
    });

    server.get('/sitemap.xml', (req: any, res: any) => {
      return getSiteMap(req, res);
    });

    server.all('*', (req, res) => {
      return renderAndCache(app, handle, req, res)
    })

    server.listen(port, (err) => {
      if (err) {
        console.log(err)
        throw err;
      }

      console.log(`> Ready on http://localhost:${port}`)
    })
  });

