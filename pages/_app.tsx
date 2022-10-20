import "../styles/globals.css"
import 'antd/dist/antd.css';
import { Layout } from "antd";
import Cookies from "next-cookies";
import App from "next/app";
import Navbar from "../Components/Layout/Navbar";

function MyApp({ Component, pageProps, user }: any) {
  return (
    <Layout>
      <Navbar user={user}/>
      <Component {...pageProps} />
    </Layout>

  )
}
MyApp.getInitialProps = async (context: any) => {
  const appProps = await App.getInitialProps(context)
  const { user } = Cookies(context.ctx)
  return { ...appProps, user: user }
}
export default MyApp
