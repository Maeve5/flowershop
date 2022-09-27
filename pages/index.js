import React from 'react';
import ContentWrap from '../components/ContentWrap';
// import styles from '../styles/Home.module.css';
import { Divider } from 'antd';
import API from '../modules/api';
import GoodsList from '../components/index/GoodsList';

function Home({ data }) {

	return (
		<ContentWrap>
			<Divider orientation="left">전체상품</Divider>
			<div>
				<GoodsList data={data}/>
			</div>

			<style jsx>{`
			div { padding-left: 60px; }
			`}</style>
		</ContentWrap>
	)
}

export default React.memo(Home);

export const getServerSideProps = async () => {
	try {
		const res = await API.get('/v1/shop/product');
		console.log('res >> ', res.data.dataSet);
		const data = await res.data.dataSet;
		return { props : { data }}
	}
	catch (e) {
		console.log('e >> ', e);
		return { props : { }}
	}
}