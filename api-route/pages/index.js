import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useRef, useState, useEffect } from 'react';

export default function Home() {
  const [adviceBacks, setAdviceBacks] = useState([]);
  const emailRef = useRef();
  const adviceRef = useRef();

  function submitForm(event) {
    event.preventDefault();

    const email = emailRef.current.value;
    const advice = adviceRef.current.value;

    const reqBody = {
      email: email,
      advice,
    };

    fetch('/api/hello', {
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((respnse) => respnse.json())
      .then((data) => console.log(data));
  }

  function loadAdvice() {
    fetch('/api/hello')
      .then((respnse) => respnse.json())
      .then((data) => {
        setAdviceBacks(data.data);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>fell free to add advice !</h1>

        <p className={styles.description}>any advice is important to us !</p>

        <form onSubmit={submitForm}>
          <div>
            <label>email:</label>
            <input ref={emailRef}></input>
          </div>
          <div>
            <label>advice:</label>
            <input ref={adviceRef}></input>
          </div>
          <button>submit</button>
        </form>
        <hr />
        <button onClick={loadAdvice}>load advice</button>
        <ul>
          {adviceBacks.map((a) => {
            const { id, email, advice } = a;
            return (
              <li key={id}>
                email:{email} advice :{advice}{' '}
              </li>
            );
          })}
        </ul>
      </main>

      <footer className={styles.footer}>
        Powered by stay at home office !
      </footer>
    </div>
  );
}
