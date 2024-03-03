export default function UserProfilePage(props) {
  const { username, pasword } = props;
  return (
    <div>
      <div>username:{username}</div>
      <div>username:{pasword}</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  //console.log('ctx', ctx)
  const { params ,req ,rep } = ctx
  return {
    props: { username: 'tom' },
  };
}
