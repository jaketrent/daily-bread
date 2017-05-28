const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname.includes('/api/')) {
      console.log('api something');
      console.log('parsedUrl', parsedUrl)
      res.writeHead(200, { 'Content-Type': 'application/json'})
      return res.end(JSON.stringify({ one: 'two' }))
    }

    if (pathname.includes('/post/')) {
      console.log('is post something');
      const splitPath = pathname.split('/');
      
      // Add post slug to query object
      query.slug = splitPath[2];
      
      app.render(req, res, '/post', query)
    } else {
      handle(req, res, parsedUrl)
    }
  })
    .listen(process.env.PORT || 3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + (process.env.PORT || 3000))
    })
})
