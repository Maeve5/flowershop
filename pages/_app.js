import Head from 'next/head'
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import '../styles/globals.css'
import 'antd/dist/antd.css';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps }) {
	return (
		<RecoilRoot>
			<Head>
				<title>꽃#</title>

				<meta charSet='utf-8' />
				<meta httpEquiv='X-UA-Compatible' content='IE=edge' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			</Head>

			<ConfigProvider locale={koKR}>
				<Component {...pageProps} />
			</ConfigProvider>
		</RecoilRoot>
	)
}

export default MyApp
