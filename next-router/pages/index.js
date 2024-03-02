import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

export default function Home() {
  const router = useRouter();

  function Jump() {
    // router.push("/clients/1")

    router.push({
      pathname: '/clients/[id]',
      query: { id: '001' },
    });
  }

  return (
    <div className={styles.container}>
      <ul>
        <li>
          <Link replace href="/clients/1">
            replace Link
          </Link>
        </li>
        <li>
          <Link
            href={{
              pathname: '/clients/[id]',
              query: { id: '001' },
            }}
          >
            Link
          </Link>
        </li>
        <li>
          <button onClick={Jump}>点我跳转client 页面</button>
        </li>
      </ul>
    </div>
  );
}
