import {useRouter} from 'next/router'

export default function ClientId() {
  const router = useRouter();
  console.log(router.pathname)
  console.log(router.query)
  
  return (
    <div>ClientId</div>
  )
}
