export default function UserPage(props) {
  const { id,username } = props;
  return (
    <div>
      <div>userId:{id}</div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { params } = ctx
  return {
    props: { id: params.uid },
  };
}
