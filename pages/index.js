import React, { useEffect } from 'react';
import MallWrap from '../components/MallWrap';
// import styles from '../styles/Home.module.css';
import API from '../modules/api';
import axios from 'axios';

function Home() {

	
	return (
		<MallWrap>
			<div>
			</div>
		</MallWrap>
	)
}

export default React.memo(Home);

export async function getServerSideProps() {
	try {
		const res = await API.get('/v1/shop/product');
		if (res.status === 200) {
			console.log('res >> ', res.data.dataSet);
			const data = await res.data.dataSet;
			return { props : { data }}
		}
		return { props : { data }}
	}
	catch (e) {
		console.log('e >> ', e);
		return { props : { }}
	}
}