import Post from '../components/post'

export default class extends React.Component {
  static async getInitialProps({ query }) {
    const post = await Post.fetchLatest()
    return { post }
  }
  render() {
    return (
      <div>
        <div>Daily Bread 4</div>
        <Post post={this.props.post} />
      </div>
    )
  }
}
