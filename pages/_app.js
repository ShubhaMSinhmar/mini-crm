import "@/styles/globals.css";
import Layout from "./layout";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }) {
  return (
  <RecoilRoot>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </RecoilRoot>)
}
