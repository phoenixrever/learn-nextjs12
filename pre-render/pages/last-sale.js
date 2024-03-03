import { useEffect, useState } from 'react';
import axios from 'axios';
import useRequest from '../lib/useRequest';

export default function LastSalePage(props) {
  const [sales, setSales] = useState(props.sales);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  /**
   * {I
        "s1": {
          "username": "shadow",
          "volume": 100
        },
        "s2": {
          "username": "phoenix",
          "volume": 200
        }
      }
   */

  //useSWR 不能放在方法当中 组件每渲染一次就会执行一次
  const { data, error, isLoading } = useRequest({
    url: 'https://next-js12-e72e3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
  });

  //现在返回的data 不符合我们的需求
  //监视data
  //注意这边不能直接在方法里面 setSales 不然 setSales 渲染组件 组件方法重新运行会调用useRequest 获取到数据后也会渲染组件 就会无限循环
  useEffect(() => {
    //判断不能少不然Object.values报错
    if (data) {
      // setSales([{ ...data.s1 }, { ...data.s2 }]);
      console.log(data); //注意data是一个object 首先要转成数组
      const salesArr = Object.values(data);
      const sales = salesArr.map((sale) => ({ ...sale }));
      setSales(sales);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(
  //       `https://next-js12-e72e3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json`
  //     )
  //     .then(({ data }) => {
  //       console.log('data', data);
  //       setSales([{ ...data.s1 }, { ...data.s2 }]);
  //     })
  //     .catch((error) => {
  //       setError('error', error);
  //     })
  //     .finally(() => setIsLoading(false));
  // }, []);

  //getStaticProps 构建初始化静态页面 loading 就不用了
  // if (isLoading) return <div>loading...</div>;
  if (error) return <div>failed to load</div>;
  if (!data && !sales) return <div>no data </div>;

  return (
    <ul>
      {sales.map((sale, index) => (
        <li key={index}>
          username:{sale.username} volume:{sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(ctx) {
  // async里面可以 使用await 但是要 try catch 处理error 这边就不用了
  // try {
  //   const response = await fetch('https://api.example.com/data');
  //   const data = await response.json();
  //   console.log(data);
  // } catch (error) {
  //   console.error('An error occurred:', error);
  // }

  return axios.get(
      `https://next-js12-e72e3-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json`
    )
    .then(({ data }) => {
      let sales = [];
      if (data) {
        console.log(typeof data); //注意data是一个object 首先要转成数组
        const salesArr = Object.values(data);
        sales = salesArr.map((sale) => ({ ...sale }));
        //加入一点数据验证初始化的数据
        sales.push({ username: 'initusernanme', volume: 'initVolume' });
      }
      return {
        props: {
          sales: sales,
        },
      };
    })
    .catch((error) => {
      return {
        props: {
          sales: [],
        },
      };
    });
}
