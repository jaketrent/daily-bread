import Markdown from 'react-markdown'
import 'isomorphic-fetch'

import React from 'react'

const Post = props =>
  <div>
    <h1>{props.title}</h1>
    <time dateTime={props.date}>{props.date}</time>
    <Markdown source={props.body} />
    <a href={props.url}>{props.reference}</a>
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
