//下面的import  代码页不会发送给客户端 ,而且必须注意 必须要在客户端使用（getServerSideProps，getStaticProps） 不然会报错
// import fs from 'fs'
import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

export default function HOME(props) {
  console.log(props);
  const { products } = props;
  return (
    <div>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/product/${p.id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// export async function getStaticProps(ctx) {  。。。 }

//ngspr
//getServerSideProps 里面的所有内容客户端都不可见 ，并且服务端在拿到数据后才会展示在客户端
//return的  props 就是传给HOME的props

//由于下面的代码是在服务端运行
//我们可以在这边做一些 服务端操作 比如访问文件，访问数据库
export const getStaticProps = async (ctx) => {
  //下面的输出在浏览器的控制台是看不到的

  //process notejs 提供的全局变量   process.cwd() 项目根目录
  const filePath = path.join(process.cwd(), 'data', 'fake-data.json');
  console.log('filePath', filePath);

  //fs的 readFileSync 阻塞  readFile 异步
  //nextjs 的 fs/promises readFile 是异步的 会返回一个 promise getStaticProps 是一个async（异步方法） 方法 我们可以在里面wait
  const jsonData = await fs.readFile(filePath);

  if (!jsonData) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  //上面返回的是一个字符串 不是json不能 结构赋值
  const { products } = JSON.parse(jsonData);
  console.log('data', products);

  //返回404 页面
  if (products.length === 0) {
    return { notFound: true };
  }

  return {
    //props  名字不能更改
    props: {
      products: products,
    },
    //每隔10秒钟 重新预渲染 这个文件
    //不加这个方法 只会再页面第一次加载的时候运行此方法生成静态页面
    //revalidate:10 会检查你离上次访问本页面是否已经超过10s ，超过的话此方法会再度运行，预渲染静态文件。
    revalidate: 10,
  };
};
