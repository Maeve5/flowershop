import React, { useState, useEffect } from 'react';
import ContentWrap from '../components/ContentWrap';
import API from '../modules/api';
import Link from 'next/link';
import router from 'next/router';
import { Button } from 'antd';
import { CloseOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Amount from '../components/Amount';
import Checkbox from '../components/Checkbox';

function cart({ dataSet }) {
	// 장바구니 담긴 품목 데이터
	const [data, setData] = useState(dataSet);
	// 체크박스 체크 여부
	const [checked, setChecked] = useState('Y');
	
	// 상품금액 합계
	let total = 0;
	data.forEach((row) => {
		total += (row.price*row.amount);
	})

	// 변경사항 조회
	const getData = async () => {
		try {
			const res = await API.get('/v1/shop/cart');
			// console.log('res >> ', res.data.dataSet);
			setData(res.data.dataSet);
			return data;
		}
		catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		getData();
	}, []);

	// checkbox 상태 변경
	const onChangeCheck = async (cartKey, checked) => {
		// 단일 선택, 전체 선택
		const apiUrl = ``;
		if (cartKey) {
			apiUrl = `/v1/shop/cart/check/${cartKey}`;
		}
		else {
			apiUrl = '/v1/shop/cart/check/all';
		}

		// post
		try {
			const res = await API.post(apiUrl, {
				checked: checked === 'N' ? 'N' : 'Y'
			});
			console.log('res data >> ', res);
			setChecked(checked);
			getData();
		}
		catch (e) {
			console.log('e >> ', e)
		}
	};

	// 수량 변경
	const onChangeAmount = async (cartKey, amount) => {
		// patch
		try {
			const res = await API.patch(`/v1/shop/cart/${cartKey}`, {
				amount: amount
			});
			// console.log('res data >> ', response);
			getData();
		}
		catch (e) {
			console.log('e >> ', e);	
		}
	};

	// 항목 삭제
	const onDelete = async (cartKey) => {
		// 단일 삭제, 선택 삭제
		const apiUrl = ``;
		if (cartKey) {
			apiUrl = `/v1/shop/cart/${cartKey}`;
		}
		else {
			apiUrl = '/v1/shop/cart/';
		}

		// delete
		try {
			const res = await API.delete(apiUrl);
			// console.log('res >> ', res);
			alert('삭제되었습니다.');
			getData();
		}
		catch (e) {
			alert(e.message);
		    console.log('e >> ', e);
		}
	};

	return (
		<ContentWrap>
			<h2>장바구니</h2>
			<div className='content-wrap'>
				<div className='cart-wrap'>
					<div className='cart-select'>
						<div className='select-all'>
							<Checkbox checked={checked} mode='all' onClickCheck={(checked) => onChangeCheck('', checked)} />
						</div>
						<Button type='text' onClick={() => onDelete()}>선택삭제</Button>
					</div>
					{data.map((row) => {
						return (
							<div key={row.productKey} className='cart-list'>
								<div className='checkbox'>
									<Checkbox checked={row.isChecked} onClickCheck={(checked) => onChangeCheck(row.cartKey, checked)} />
								</div>
								<div className='cart-image'>
									<img
										src={row.imageUrl}
										alt={row.imageUrl}
										width={80}
									/>
								</div>
								<Link href={`/goods/${row.productKey}`}>
									<a className='cart-product'>
										{row.productName}
									</a>
								</Link>
								<div className='cart-amount-wrap'>
									<Amount amount={row.amount} onClickAmount={(amount) => onChangeAmount(row.cartKey, amount)} />
								</div>
								<div className='cart-sum-wrap'>
									<div className='sum'>{(row.price * row.amount).toLocaleString('ko-KR')}</div>
									<div className='sum-won'>원</div>
								</div>
								<Button type='text' size='small' icon={<CloseOutlined style={{color: '#aaa'}} />} onClick={() => onDelete(row.cartKey)} />
							</div>
						)
					})}
					<div className='cart-select'>
						<div className='checkbox'>
							<Checkbox checked={checked} onClickCheck={(checked) => onChangeCheck('', checked)} />
						</div>
						<Button type='text' style={{paddingLeft: '1%'}} onClick>전체선택</Button>
						<Button type='text' onClick={() => onDelete()}>선택삭제</Button>
					</div>
				</div>
				<div className='order-wrap'>
					<div className='order-address-wrap'>
						<div className='address-title'>
							<EnvironmentOutlined />
							<h3>배송지</h3>
						</div>
						<div className='address-wrap'>
							<p>주소지</p>
							<Button type='primary' ghost block>주소 검색</Button>
						</div>
					</div>
					<div className='order-sum-wrap'>
						<div className='sum'>
							<div>상품금액</div>
							<div>{total.toLocaleString('ko-KR')} 원</div>
						</div>
						<div className='sum-delivery'>
							<div>배송비</div>
							<div>+ 3,000 원</div>
						</div>
						<div className='sum-price'>
							<div>결제예정금액</div>
							<div className='total-price'>{(total + 3000).toLocaleString('ko-KR')} 원</div>
						</div>
					</div>
					<div className='order-button-wrap'>
						<Button type='primary' block size='large' onClick={() => router.push('/order')}>주문하기</Button>
					</div>
				</div>
			</div>

			<style jsx>{`
			h2 { font-size: 28px; text-align: center; padding-bottom: 40px; }
			.content-wrap { display: flex; justify-content: space-between; font-size: 16px; }

			.cart-wrap { width: 700px; }
			.cart-select { display: flex; align-items: center; padding: 12px; border-bottom: 1px solid #aaa; }
			.select-all { width: 100px; }
			.cart-list { display: flex; align-items: center; border-bottom: 1px solid #eee; padding: 8px 12px; }
			.cart-image { margin: 0 1%; }
			a { color: rgba(0, 0, 0, 0.85); }
			.cart-product { width: 44%; margin-left: 1%; font-size: 16px; font-weight: 500; }
			.cart-amount-wrap { display: flex; width: 120px; justify-content: center; }
			.amount { width: 52px; height: 24px; text-align: center; }
			.cart-sum-wrap { display: flex; width: 100px; justify-content: flex-end; margin-right: 8px; font-weight: 700; }

			.order-wrap { width: 270px; padding-top: 56px; }
			.order-address-wrap { padding: 20px; border: 1px solid #eee; }
			.address-title { display: flex; align-items: baseline; }
			h3 { padding-left: 4px; margin: 0; }
			.address-wrap { padding-top: 12px; }

			.order-sum-wrap { background-color: rgb(250, 250, 250); border: 1px solid #eee; padding: 20px; }
			.sum { display: flex; justify-content: space-between; }
			.sum-delivery { display: flex; justify-content: space-between; padding-top: 12px; }
			.sum-price { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; margin-top: 12px; border-top: 1px solid #eee; }
			.total-price { font-size: 20px; font-weight: 700; }

			.order-button-wrap { padding-top: 20px; }
			`}</style>
		</ContentWrap>
	);
};

export default React.memo(cart);

export const getServerSideProps = async () => {
	try {
		const res = await API.get('/v1/shop/cart');
		console.log('res >> ', res);
		const dataSet = await res.data.dataSet;
		return { props: { dataSet } }
	}
	catch (e) {
		console.log('e >> ', e);
		return { props: {} }
	}
}