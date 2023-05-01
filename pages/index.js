import Layout from "../components/Layout";
import Link from "next/link";

const Index = () => (
  <Layout>
    <h2>Index page</h2>
    <Link href="/signin">Signin</Link>
  </Layout>
);

export default Index;
