const path = require('path')
const promisify = require('promisify-node')
const frontMatter = require('front-matter')
const fs = promisify('fs')

let cache = null

const findLatest = filenames =>
  filenames.sort()[filenames.length - 1]

const deserialize = parsed => ({
  title: parsed.attributes.title,
  date: parsed.attributes.date,
  reference: parsed.attributes.reference,
  url: parsed.attributes.url,
  body: parsed.body
})

async function fetchLatest() {
  if (cache) return Promise.resolve(cache)

  const postsDir = path.join(__dirname, '..', 'posts')
  const filenames = await fs.readdir(postsDir)
  const latest = findLatest(filenames)
  const markdown = await fs.readFile(path.join(postsDir, latest), 'utf-8')
  const parsed = frontMatter(markdown)
  const post = deserialize(parsed)
  cache = post
  return Promise.resolve(cache)
}

exports.fetchLatest = fetchLatest
