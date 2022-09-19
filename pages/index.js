import React, { useState } from 'react';
import Image from 'next/image';
import ContentWrap from '../components/ContentWrap';
// import styles from '../styles/Home.module.css';
import { Col, Divider, Row } from 'antd';
import API from '../modules/api';

function Home({ data }) {
	const cols = [];


	console.log(data.length);
	
	data.map((row) => {
		const price = row.price.toLocaleString('ko-KR');
		console.log('price', price);
		cols.push(
			<Col key={row.rowKey} span={5} style={{ margin: '32px 10px' }}>
				{/* link router */}
				<Image
					src={row.imageUrl}
					alt={row.imageUrl}
					width={200}
					height={280}
				/>
				<div>{row.productName}</div>
				<div>{price}원</div>
			</Col>,
		);
	})

	return (
		<ContentWrap>
			<div>
				<Divider orientation="left">전체상품</Divider>
				<Row justify="space-evenly">
					{cols}
				</Row>
			</div>
		</ContentWrap>
	)
}

export default React.memo(Home);

export const getServerSideProps = async () => {
	try {
		const res = await API.get('/v1/shop/product');
		if (res.status === 200) {
			console.log('res >> ', res.data.dataSet);
			// console.log('res.token >> ', res);
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