import Head from 'next/head'

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
        <Head>
          <meta name="HandheldFriendly" content="True" />
          <meta name="MobileOptimized" content="320" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="shortcut icon" type="image/png" href="static/favicon.png" />
        </Head>
        <FullBleedPage>
          <Post post={this.props.post} />
        </FullBleedPage>
        <style global jsx>{`
          @font-face {
            font-family: "Milkshake";
            src: url('static/type/Milkshake.otf') format('opentype'),
                 url('static/type/Milkshake.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: "Questa_Regular";
            src: url('static/type/2-Questa_Regular-webfont.woff2') format('woff2'),
                 url('static/type/2-Questa_Regular-webfont.woff') format('woff');
            font-weight: normal;
            font-style: normal;
          }
          html {
            box-sizing: border-box;
            font-family: sans-serif;
            font-size: 16px;
            color: #fff;
          }
          body {
            margin: 0;
            background: #EDF391;
            background: linear-gradient(to bottom, #EDF391, #ead874);
            background-repeat: no-repeat;
            background-position: center;
            background-image: url(static/img/bg.jpg);
            background-image: -webkit-image-set(url(static/img/bg.jpg) 1x, url(static/img/bg@2x.jpg) 2x);
            background-image: image-set(url(static/img/bg.jpg) 1x, url(static/img/bg@2x.jpg) 2x);
            background-size: cover;
          }
          a {
            color: #fff;
            cursor: pointer;
          }
          @media screen and (min-width: 500px) {
            html { font-size: 24px; }
          }
          @media screen and (min-width: 800px) {
            html { font-size: 30px; }
          }
          @media screen and (min-width: 1200px) {
            html { font-size: 36px; }
          }
        `}</style>
      </div>
    )
  }
}
