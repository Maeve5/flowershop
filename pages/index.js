import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ContentWrap from '../components/ContentWrap';
// import styles from '../styles/Home.module.css';
import { Col, Divider, Row } from 'antd';
import API from '../modules/api';
import Router from 'next/router';

function Home({ data }) {
	const cols = [];

	data.map((row) => {
		const price = row.price.toLocaleString('ko-KR');

		cols.push(
			<Col key={row.rowKey} span={5} style={{ margin: '32px 10px' }}>
				{/* link router */}
				<Link href={`/goods/${row.rowKey}`}>
					<a>
						<Image
							src={row.imageUrl}
							alt={row.imageUrl}
							width={200}
							height={240}
						/>
						<div>{row.productName}</div>
						<div>{price}원</div>
					</a>
				</Link>
			</Col>,
		);
	})

	return (
		<ContentWrap>
			<div>
				<Divider orientation="left">전체상품</Divider>
				<div className='cols'>
					<Row justify="space-evenly">
							{cols}
					</Row>
				</div>
			</div>

			<style jsx>{`

			`}</style>
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