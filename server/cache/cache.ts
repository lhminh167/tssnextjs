import LRUCache from 'lru-cache';
import getSiteMap from '../sitemap/sitemap';

const ssrCache = new LRUCache({
    max: 100 * 1024 * 1024,
    maxAge: 1000 * 60 * 60 * 24 * 30
});

function getCacheKey(req) {
    return `${req.path}`
}

export default async function renderAndCache(app, handle, req, res) {
    try {
        const key = getCacheKey(req);
        let xCache = 'MISS';
        let data = null;
        const cached = ssrCache.has(key) && req.query['noCache'] !== 'true';

        if (cached) {
            console.log('HIT ' + key);
            xCache = 'HIT';
            data = ssrCache.get(key);
        }

        if (!cached) {
            data = await render(res, req, handle, app);
        }

        if (res.statusCode !== 200) {
            console.log('SKIP ' + key);
            xCache = 'SKIP';
        }

        if (res.statusCode === 200 && !cached) {
            console.log('NO ' + key);
            ssrCache.set(key, data);
        }

        res.setHeader('x-cache', xCache);
        res.send(data);
    } catch (err) {
        console.log(err);
        app.renderError(err, req, res, req.path, req.query);
    }
}

async function render(res, req, handle, app) {

    return await app.renderToHTML(req, res, req.path, req.query);
}