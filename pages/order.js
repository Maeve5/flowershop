import React, { useState, useEffect } from 'react';
import ContentWrap from '../components/ContentWrap';
import API from '../modules/api';
import Link from 'next/link';
import { Input } from 'antd';

function order({ dataSet }) {

	// 데이터
	const [name, setName] = useState('');
	const [tel, setTel] = useState('');
	const [email, setEmail] = useState('');
	const [receiverName, setReceiverName] = useState('');
	const [receiverTel, setReceiverTel] = useState('');
	const [postcode, setPostcode] = useState('');
	const [address, setAddress] = useState('');
	const [detailAddress, setDetailAddress] = useState('');
	const [isCoupon, setIsCoupon] = useState('');
	const [couponCode, setCouponCode] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');
	const [deliveryMessage, setDeliveryMessage] = useState('');

	let info = {};


	useEffect(() => {

		info = {
			name: name,
			tel: tel,
			email: email,
			receiverName: receiverName,
			receiverTel: receiverTel,
			postcode: postcode,
			address: address,
			detailAddress: detailAddress,
			isCoupon: isCoupon ? isCoupon : null,
			couponCode: couponCode ? couponCode : null,
			paymentMethod: paymentMethod,
			deliveryMessage: deliveryMessage ? deliveryMessage : null
		}

		localStorage.setItem('infos', JSON.stringify(info));
		console.log('info', info);
		// localStorage.setItem('items', JSON.stringify(data));

	}, [name, tel, email, receiverName, receiverTel, postcode, address, detailAddress, isCoupon, couponCode, paymentMethod, deliveryMessage]);



	return (
		<ContentWrap>
			<div className='order-product-list'>
				<h2>주문서</h2>
				<div className='order-product'>
					<h3>주문 상품</h3>
					<div className='cart-list-wrap'>
						{dataSet.map((row) => {
							return (
								<div key={row.cartKey} className='cart-list'>
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
										수량 : {row.amount}
									</div>
									<div className='cart-sum-wrap'>
										<div className='sum-value'>{(row.price * row.amount).toLocaleString('ko-KR')}</div>
										<div className='sum-unit'>원</div>
									</div>
								</div>
							)
						})}
					</div>
					<h3>주문자 정보</h3>
					<div className='order-info-wrap'>
						<div className='order-info'>
							<div className='info'>보내는 분</div>
							<div className='info-input'>
								<Input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='ex) 홍길동' />
							</div>
						</div>
						<div className='order-info'>
							<div className='info'>휴대폰</div>
							<div className='info-input'>
								<Input type='tel' value={tel} onChange={(e) => setTel(e.target.value)} placeholder='ex) 01012345678' maxLength={11} />
							</div>
						</div>
						<div className='order-info'>
							<div className='info'>이메일</div>
							<div className='info-input'>
								<Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='ex) abc1234@flowershop.com' />
							</div>
						</div>
					</div>
					<h3>배송 정보</h3>
					<div className='delivery-info-wrap'>
						<div className='info'>배송지</div>
						<div className='info-input'>배송 주소</div>
						<div className='info'>상세 정보</div>
					</div>
					<div className='pay-wrap'>
						<div className='extra-info-wrap'>
							<h3>쿠폰/적립금</h3>
							<div className='discount-wrap'>
								<div className='info'>쿠폰 적용</div>
								<div className='info'>적립금 적용</div>
							</div>
							<h3>결제 수단</h3>
							<div className='pay-method-wrap'>
							</div>
							<h3>개인정보 수집/제공</h3>
							<div className='privacy-info-wrap'>
							</div>
						</div>
						<div className='payment-wrap'>
							<h3>결제 금액</h3>
						</div>
					</div>
				</div>
			</div>

			<style jsx>{`
			.order-product-list { max-width: 720px; margin: 0 auto; }
			h2 { text-align: center; font-size: 36px; }
			h3 { font-size: 20px; margin: 20px 0;  }

			.cart-list { display: flex; justify-content: center; align-items: center; border-bottom: 1px solid #eee; padding: 8px 10px; }
			.cart-image { margin-right: 8px; }
			a { color: rgba(0, 0, 0, 0.85); }
			.cart-product { width: 44%; margin-left: 2%; font-size: 16px; font-weight: 500; }
			.cart-amount-wrap { display: flex; width: 120px; justify-content: center; }
			.cart-sum-wrap { display: flex; width: 100px; justify-content: flex-end; margin-right: 8px; font-weight: 700; }

			.order-info { display: flex; }
			.info { width: 200px; padding: 0 10px; }
			.info-input { width: 300px; }
			.delivery-info-wrap { display: flex; }

			.pay-wrap { display: flex; }
			.extra-info-wrap { flex: 2; }
			.payment-wrap { flex: 1; }
			`}</style>
		</ContentWrap>
	);
};

export default React.memo(order);

export const getServerSideProps = async () => {
	try {
		const res = await API.get('/v1/shop/cart');
		console.log('res dataSet >> ', res.data.dataSet);
		console.log('res >> ', res);
		const dataSet = await res.data.dataSet;
		return { props: { dataSet } }
	}
	catch (e) {
		console.log('e >> ', e);
		return { props: {} }
	}
}