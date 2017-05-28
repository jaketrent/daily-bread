import Post from '../components/post'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    return await Post.fetchLatest()
  }
  render() {
    return (
      <div>
        <div>Daily Bread 4</div>
        <Post />
      </div>
    )
  }
}
