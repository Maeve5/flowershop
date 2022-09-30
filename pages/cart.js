import React, { useState, useEffect, useCallback, useMemo } from 'react';
import ContentWrap from '../components/ContentWrap';
import API from '../modules/api';
import Link from 'next/link';
import router from 'next/router';
import { Button, Divider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import Amount from '../components/Amount';
import Checkbox from '../components/cart/Checkbox';
import { useRecoilState } from 'recoil';
import orderDataState from '../atom/orderDataState';

function cart({ dataSet }) {
	// 주문 데이터
	const [orderData, setOrderData] = useRecoilState(orderDataState);

	// 장바구니 담긴 품목 데이터
	const [data, setData] = useState(dataSet);

	// 체크박스 체크 여부
	const [checked, setChecked] = useState('Y');

	// 변경사항 조회
	const getData = useCallback(async () => {
		try {
			const res = await API.get('/v1/shop/cart');
			// console.log('res >> ', res.data.dataSet);
			setData(res.data.dataSet);
			return data;
		}
		catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(() => {
		getData();
	}, []);

	// checkbox 상태 변경
	const onChangeCheck = useCallback(async (cartKey, checked) => {
		// 단일 선택, 전체 선택 apiUrl
		const apiUrl = ``;
		if (cartKey) {
			apiUrl = `/v1/shop/cart/check/${cartKey}`;
		}
		else {
			apiUrl = '/v1/shop/cart/check/all'
			setChecked(checked);
		}

		// post
		try {
			const res = await API.post(apiUrl, {
				checked: checked === 'N' ? 'N' : 'Y'
			});
			// console.log('res data >> ', res);
			getData();
		}
		catch (e) {
			console.log('e >> ', e)
		}
	}, []);

	// 체크된 항목
	const checkedItems = useMemo(() => {
		return data.filter((row) => {
			return row.isChecked === 'Y';
		});
	}, [data]);

	// 단일 체크 -> 전체 체크 Y/N
	useEffect(() => {
		if (checkedItems.length === data.length) {
			setChecked('Y');
		}
		else {
			setChecked('N');
		}
	}, [checkedItems]);

	// 수량 변경
	const onChangeAmount = useCallback(async (cartKey, amount) => {
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
	}, []);

	// 항목 삭제
	const onDelete = useCallback(async (cartKey) => {
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
			alert('삭제되었습니다.');
			getData();
		}
		catch (e) {
			alert(e.message);
			console.log('e >> ', e);
		}
	}, []);

	// 상품금액 합계
	const productPrice = useMemo(() => {
		let sum = 0;
		checkedItems.forEach((row) => {
			sum += (row.price) * (row.amount);
		});
		return sum;
	}, [checkedItems]);

	// atom에 체크한 항목 저장
	useEffect(() => {
		setOrderData((data) => {
			return {
				...data,
				info: {
					...data.info,
					productPrice: productPrice,
					paymentAmount: productPrice + orderData.info.deliveryFee,
				},
				items: checkedItems
			};
		});
	}, [productPrice]);

	return (
		<ContentWrap>
			<h2>장바구니</h2>
			<div className='content-wrap'>
				<div className='cart-wrap'>
					<div className='cart-select'>
						<div className='select-all'>
							<Checkbox checked={checked} text='전체선택' onClickCheck={(checked) => onChangeCheck('', checked)} />
						</div>
						<Divider type="vertical" />
						<div className='select-delete' onClick={() => onDelete()}>선택삭제</div>
					</div>
					{data.map((row) => {
						return (
							<div key={row.cartKey} className='cart-list'>
								<div className='checkbox'>
									<Checkbox checked={row.isChecked} text='' onClickCheck={(checked) => onChangeCheck(row.cartKey, checked)} />
								</div>
								<div className='cart-image'>
									<img src={row.imageUrl} alt={row.imageUrl} width={80} />
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
									<div className='sum-value'>{(row.price * row.amount).toLocaleString('ko-KR')}</div>
									<div className='sum-unit'>원</div>
								</div>
								<Button type='link' size='small' icon={<CloseOutlined style={{ color: '#aaa' }} />} onClick={() => onDelete(row.cartKey)} />
							</div>
						)
					})}
					<div className='cart-select'>
						<div className='select-all'>
							<Checkbox checked={checked} text='전체선택' onClickCheck={(checked) => onChangeCheck('', checked)} />
						</div>
						<Divider type="vertical" />
						<div className='select-delete' onClick={() => onDelete()}>선택삭제</div>
					</div>
				</div>
				<div className='order-wrap'>
					<div className='order-sum-wrap'>
						<div className='sum'>
							<div>상품금액</div>
							<div>{productPrice.toLocaleString('ko-KR')} 원</div>
						</div>
						<div className='sum-delivery'>
							<div>배송비</div>
							<div>{orderData.info.deliveryFee.toLocaleString('ko-KR')} 원</div>
						</div>
						<div className='sum-price'>
							<div>결제예정금액</div>
							<div className='total-price'>{(productPrice + orderData.info.deliveryFee).toLocaleString('ko-KR')} 원</div>
						</div>
					</div>
					<div className='order-button-wrap'>
						<Button type='primary' block size='large' onClick={() => router.push('/order')} disabled={orderData.items ? false : true}>주문하기</Button>
					</div>
				</div>
			</div>

			<style jsx>{`
			h2 { font-size: 28px; text-align: center; padding-bottom: 40px; }
			.content-wrap { display: flex; justify-content: space-between; font-size: 16px; }

			.cart-wrap { width: 700px; padding-right: 10px; }
			.cart-select { display: flex; align-items: baseline; padding: 10px; border-bottom: 1px solid #aaa; }
			.select-all { width: 100px; cursor: pointer; }
			.select-delete { padding: 0 10px; cursor: pointer; }
			.cart-list { display: flex; align-items: center; border-bottom: 1px solid #eee; padding: 8px 10px; }
			.checkbox { padding: 8px; }
			.cart-image { margin: 0 4px; }
			a { color: rgba(0, 0, 0, 0.85); }
			.cart-product { width: 44%; margin-left: 1%; font-size: 16px; font-weight: 500; }
			.cart-amount-wrap { display: flex; width: 120px; justify-content: center; }
			.cart-sum-wrap { display: flex; width: 100px; justify-content: flex-end; margin-right: 8px; font-weight: 700; }

			.order-wrap { width: 270px; padding-top: 53px; }

			h3 { padding-left: 4px; margin: 0; }

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
		console.log('res dataSet >> ', res.data.dataSet);
		// console.log('res >> ', res);
		const dataSet = await res.data.dataSet;
		return { props: { dataSet } }
	}
	catch (e) {
		console.log('e >> ', e);
		return { props: {} }
	}
}