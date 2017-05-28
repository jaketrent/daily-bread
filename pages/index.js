import Post from '../components/post'

const FullBleedPage = props =>
  <div className="full-bleed">
        {props.children}
    <style jsx>{`
      .full-bleed {
        height: calc(100vh - 48px);
        width: calc(100vw - 48px);
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 24px;
      }
    `}</style>
  </div>

export default class Index extends React.Component {
  static async getInitialProps({ query }) {
    const post = await Post.fetchLatest()
    return { post }
  }
  render() {
    return (
      <div>
        <FullBleedPage>
          <Post post={this.props.post} />
        </FullBleedPage>
        <style global jsx>{`
          @font-face {
            font-family: "Milkshake";
            src: url('/static/type/Milkshake.otf') format('opentype'),
                 url('/static/type/Milkshake.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Questa_Regular";
            src: url('/static/type/2-Questa_Regular-webfont.woff2') format('woff2'),
                 url('/static/type/2-Questa_Regular-webfont.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          body {
            box-sizing: border-box;
            margin: 0;
            font-family: sans-serif;
            background: #EDF391;
            background: linear-gradient(to bottom, #EDF391, #ead874);
            color: #fff;
          }
          a {
            color: #fff;
          }
        `}</style>
      </div>
    )
  }
}
