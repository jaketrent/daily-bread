const path = require('path')
const promisify = require('promisify-node')
const frontMatter = require('front-matter')
const fs = promisify('fs')

const findLatest = filenames =>
  filenames.sort()[0]

const deserialize = parsed => ({
  title: parsed.attributes.title,
  date: parsed.attributes.date,
  ref: parsed.attributes.ref,
  url: parsed.attributes.url,
  body: parsed.body
})

async function fetchLatest() {
  const postsDir = path.join(__dirname, '..', 'posts')
  const filenames = await fs.readdir(postsDir)
  const latest = findLatest(filenames)
  const markdown = await fs.readFile(path.join(postsDir, latest), 'utf-8')
  const parsed = frontMatter(markdown)
  const post = deserialize(parsed)
  console.log('repo post', post)
  return Promise.resolve(post)
}

exports.fetchLatest = fetchLatest
