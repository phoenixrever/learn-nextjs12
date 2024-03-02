import Header from '../components/Header';

export default function Layout(props) {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{props.children}</main>
    </>
  );
}
