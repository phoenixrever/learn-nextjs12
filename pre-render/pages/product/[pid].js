import fs from 'fs/promises' 
import path from 'path'

export default function ProductId(props) {
  const { product } = props

  //fallback: "blocking"  状态下会等服务器把数据装备好了再呈现和页面 不需要下面代码
  
  //03即时渲染会向先服务端请求数据 会有一定的延迟
  if(!product){
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1>{product.title}</h1>
      <h3>{product.describtion}</h3>
    </>
  );
}


async function  getData() {
  const filePath=path.join(process.cwd(),"data","fake-data.json")
  const jsonData = await fs.readFile(filePath)
  return JSON.parse(jsonData)
}


//这个函数告诉nextjs 有哪些动态页面需要预渲染
export async function getStaticPaths() {
  //TODO getStaticPaths 和 getStaticProps 里面获取了2此数据 是不是不太好 数据好像也不能存在compoent里面（这2个函数运行的时候component还没加载）
  const {products} =await getData();

  const ids = products.map(p=>p.id)

  const params = ids.map(id=>{
    //map的返回对象是个数组
    return {params:{pid:id}}
  })

  return {
    paths:params,
    fallback:true
    // fallback: "blocking"
  }
}



/**
 * 注意这边不能用userRouter 来获取路由的query 参数 
 * 因为getStaticProps实在哎组件构建的时候运行，这个时候组件还没有渲染 serRouter（）是没有数据的
 */
export async function getStaticProps(context) {
  //查看context 的params 属性
  const { params } = context
  console.log('params', params) //params { pid: '03' }
  const {products} =await getData();

  const product = products.find(p=>p.id===params.pid)

  //没有找到对于pid的产品的情况下可以使用 notFound 或者 redirect
  // if (!product) {
  //   return {
  //     redirect: {
  //       destination: '/no-data',
  //     },
  //   };
  // }

  if (!product) {
    return {notFound:true};
  }

  return {
    props:{
      product:product
    }
  }
}

