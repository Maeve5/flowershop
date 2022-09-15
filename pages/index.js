import React from 'react';
import MallWrap from '../components/MallWrap';
import styles from '../styles/Home.module.css';
import API from '../modules/api';

function Home({ data }) {
	return (
		<MallWrap>
			<div className={styles.container}>
				
			</div>
		</MallWrap>
	)
}

export default React.memo(Home);

export async function getServerSideProps() {
	try {
		const res = await fetch('https://bank-api.d-leaf.kr/v1/admin/product');
		if (res.status === 200) {
			console.log('res >> ', res);
			const data = await res.json();
			return { props : { data }}
		}
		return { props : { data }}
	}
	catch (e) {
		console.log('e >> ', e);
		return { props : { }}
	}
}