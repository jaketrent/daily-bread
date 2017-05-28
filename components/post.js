import 'isomorphic-fetch'

import React from 'react'

class Post extends React.Component {
  static async fetchLatest() {
    const res = await fetch('http://localhost:3000/api/v1/posts/latest')
    const json = await res.json()
    return json || {}
  }
  render() {
    return (
      <div>
        <div>post</div>
      </div>
    )
  }
}

export default Post
