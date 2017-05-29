const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const repo = require('./repo')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const serialize = data => JSON.stringify({ data })

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname.includes('/api/')) {
      const post = await repo.fetchLatest()

      res.writeHead(200, { 'Content-Type': 'application/json'})
      return res.end(serialize(post))
    }

    return handle(req, res, parsedUrl)
  })
    .listen(process.env.PORT || 3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + (process.env.PORT || 3000))
    })
})
