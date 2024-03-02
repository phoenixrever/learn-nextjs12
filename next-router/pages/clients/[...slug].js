import {useRouter} from 'next/router'

export default function CatchMultiPathPage() {
  const router = useRouter();
  //slug就是文件的【中的名字】 比如【id】
  console.log(router.query.slug)

  return (
    <div>CatchMultiPathPage</div>
  )
}
