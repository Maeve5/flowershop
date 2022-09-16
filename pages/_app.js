import Head from 'next/head'
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>꽃 쇼핑몰</title>

				<meta charSet='utf-8' />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>

			<ConfigProvider locale={koKR}>
				<Component {...pageProps} />
			</ConfigProvider>

		</>
	)
}

export default MyApp
