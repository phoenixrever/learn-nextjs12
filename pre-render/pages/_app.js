import '../styles/globals.css';
import Head from 'next/head';
import Layout from '../layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>_app.js文件中全局加head</title>
        {/* 搜索引擎用 搜出来的就显示 content内容 */}
        <meta name = "description" content='I am not happy!!!'/>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
