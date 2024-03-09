import Head from 'next/head'

export default function UserPage(props) {
  const { id,username } = props;
  return (
    <div>
      <Head>
        <title>{username}</title>
      </Head>
      <div>userId:{id}</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { params } = ctx
  return {
    props: { id: params.uid ,username:'bad boy'},
  };
}
