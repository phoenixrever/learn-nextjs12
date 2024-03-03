import useSWR from 'swr'
import axios from 'axios'


  
// 1. key : 标识数据的唯一键。可以是URL字符串或任何其他字符串。当这个key改变时，`useSWR`将重新请求数据。
// 2. fetcher: 一个函数，用于获取数据。它接受`key`作为参数，应该返回一个Promise，该Promise解析为数据。
export default function useRequest(request, { initialData, ...config } = {}) {
  return useSWR(
    request && JSON.stringify(request),
    () => axios(request || {}).then(response => response.data),
    {
      ...config,
      initialData: initialData && {
        status: 200,
        statusText: 'InitialData',
        headers: {},
        data: initialData
      }
    }
  ) 
}