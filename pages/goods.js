import React from 'react';
import ContentWrap from '../components/ContentWrap';
import Image from 'next/image';
import API from '../modules/api';
import { Button } from 'antd';

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
					<div className='' style={{fontSize: 20, fontWeight: 500, paddingTop: 16}}>
						{data[0].productName}
					</div>
					<div className='line price'>
						<div style={{fontSize: 28, fontWeight: 700}}>{price}</div>
						<div style={{fontSize: 18, fontWeight: 600, paddingLeft: 4}}>원</div>
					</div>
					<div className='line-container'>
						<dl className='line'>
							<dt>배송</dt>
							<dd>당일배송</dd>
						</dl>
						<dl className='line'>
							<dt>판매자</dt>
							<dd>꽃팜</dd>
						</dl>
						<dl className='line'>
							<dt>판매단위</dt>
							<dd>상품명 참조</dd>
						</dl>
					</div>
					<div className=''>
						<dl className='line'>
							<dt>구매수량</dt>
							<div className='count'>
								<Button size='small'>-</Button>
								<div style={{width: 60, height: 24, textAlign:'center'}}>1</div>
								<Button size='small'>+</Button>
							</div>
						</dl>
						<div>
							<div className='' style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', paddingTop: 32}}>
								<div>총 상품금액 :</div>
								<div style={{fontSize: 36, fontWeight: 700, padding: '0 4px'}}>{price}</div>
								<div style={{fontSize: 20, fontWeight: 600, paddingRight: '4px'}}>원</div>
							</div>
							<div style={{paddingTop: 12}}>
								<Button type='primary' block='true' size='large'>장바구니 담기</Button>
							</div>
						</div>
					</div>
				</div>
			</article>
			<nav>
				<div className='tap'>
					<a href="#">
						상품설명
					</a>
				</div>
				<div className='tap'>
					<a href="#">
						상세정보
					</a>
				</div>
				<div className='tap'>
					<a href="#">
						후기
					</a>
				</div>
				<div className='tap'>
					<a href="#">
						문의
					</a>
				</div>
			</nav>
			<div className='detail-wrap'>
				상품설명 ~ 상세정보 ~ 후기 ~ 문의
			</div>

			<style jsx>{`
			article { display: flex; justify-content: space-between; }
			.summary-wrap { width: 440px; align-items: center; }
			.line { margin: 0; border-bottom: 1px solid #eee; display: flex; align-items: center; }
			.price { margin: 0; padding: 16px 0; align-items: baseline; }
			dl { height: 70px; }
			dt { flex: 1; }
			dd { flex: 2; margin: 0; }
			.count { flex: 2; display: flex; }
			nav { display: flex; justify-content: space-between; text-align: center; line-height: 50px; margin-top: 80px; }
			.tap { flex: 1; height: 50px; border:1px solid #eee; font-size: 16px; }
			.detail-wrap { margin: 10px 0; }
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