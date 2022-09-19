import React from 'react';
import ContentWrap from '../components/ContentWrap';
import Image from 'next/image';
import API from '../modules/api';
import { Button, InputNumber } from 'antd';

function goods({ data }) {
	const price = data[0].price.toLocaleString('ko-KR');
	return (
		<ContentWrap>
			<article>
				<div>
					<Image
						src={data[0].imageUrl}
						alt={data[0].imageUrl}
						width={480}
						height={560}
					/>
				</div>
				<div className='summary-wrap'>
					<div className=''>
						{data[0].productName}
					</div>
					<div className='line'>
						{price}원
					</div>
					<div className='line-container'>
						<dl className='line'>
							<dt>배송</dt>
							<dd></dd>
						</dl>
						<dl className='line'>
							<dt>판매자</dt>
							<dd></dd>
						</dl>
						<dl className='line'>
							<dt>판매단위</dt>
							<dd></dd>
						</dl>
					</div>
					<div className=''>
						<dl className='line'>
							<dt style={{flex: 1}}>구매수량</dt>
							<div className='count'>
								<Button size='small'>-</Button>
								<div style={{width: 60, height: 24, textAlign:'center'}}>1</div>
								<Button size='small'>+</Button>
							</div>
						</dl>
						<div>총 상품금액</div>
						<div>장바구니</div>
					</div>

				</div>
			</article>

			<style jsx>{`
			article { display: flex; justify-content: space-between; }
			.summary-wrap { width: 400px; }
			.line { border-bottom: 1px solid #aaa; display: flex; padding-bottom: 14px; }
			.count { flex: 2; display: flex; }
			`}</style>
		</ContentWrap>
	);
};

export default React.memo(goods);

export const getServerSideProps = async () => {
	try {
		const res = await API.get(`/v1/shop/product`);
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