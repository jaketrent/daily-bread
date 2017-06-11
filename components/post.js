import 'isomorphic-fetch'
import Head from 'next/head'
import Markdown from 'react-markdown'
import React from 'react'

const getMonth = i => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'][parseInt(i, 10) - 1]

const formatDate = str => {
  const [yyyy, mm, dd] = str.split('-')
  const month = getMonth(mm)
  return `${dd} ${month} ${yyyy}`
}

const Post = props =>
  <div className="root">
    <Head>
      <meta property="og:title" content={`${props.title} | Daily Bread`} />
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://jaketrent.github.io/daily-bread/" />
      <meta property="og:description" content={props.title} />
      <meta property="og:image" content="https://jaketrent.github.io/daily-bread/static/img/bg.jpg" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={`${props.title} | Daily Bread`} />
      <meta name="twitter:description" content={props.body} />
      <meta name="twitter:image" content="https://jaketrent.github.io/daily-bread/static/img/bg.jpg" />
    </Head>
    <div className="titleContainer">
      <time className="date" dateTime={props.date}>{formatDate(props.date)}</time>
      <h1 className="title">{props.title}</h1>
    </div>
    <div className="body">
      <Markdown source={props.body} />
    </div>
    <a className="reference" href={props.url}>{props.reference}</a>
    <style jsx>{`
      .root {
        display: inline-block;
        font-size: 1rem;
      }
      .titleContainer {
        display: flex;
        align-items: center;
        line-height: 2.625em;
        color: #595a5b;
      }
      .date {
        font-size: 0.75rem;
        margin-right: 1.125em;
      }
      .title {
        margin: 0;
        font-size: 1.5em;
        font-family: "Milkshake";
      }
      .body {
        font-size: 2.25em;
        line-height: 1.125em;
        font-family: "Questa_Regular";
        color: #5ba9a9;
        text-shadow: 1px 1px 0 #516a6f;
      }
      .body :global(p) {
        margin: 0 0 0.75em 0;
      }
      .reference {
        font-size: 1.5em;
        color: #595a5b;
        font-family: "Milkshake";
        text-decoration: none;
      }
      .reference:hover {
        text-decoration: underline;
      }
    `}</style>
  </div>


class PostContainer extends React.Component {
  static async fetchLatest() {
    const res = await fetch('http://localhost:3000/api/v1/posts/latest')
    const json = await res.json()
    return json ? json.data : {}
  }
  render() {
    return <Post {...this.props.post} />
  }
}

export default PostContainer
