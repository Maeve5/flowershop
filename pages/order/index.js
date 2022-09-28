import React, { useState, useEffect } from 'react';
import ContentWrap from '../../components/ContentWrap';
import API from '../../modules/api';
import Link from 'next/link';
import { Button, Input } from 'antd';
import router from 'next/router';

function order({ dataSet }) {

	// 데이터
	// const [info, setInfo] = useState({});
	const [name, setName] = useState('');
	const [tel, setTel] = useState('');
	const [email, setEmail] = useState('');
	const [isCoupon, setIsCoupon] = useState('');
	const [couponCode, setCouponCode] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');
	const [deliveryMessage, setDeliveryMessage] = useState('');

	let info = JSON.parse(localStorage.getItem('infos'));

	useEffect(() => {
		// info.push(data);
		console.log('info', info);
	}, []);
	
	useEffect(() => {
		info.name = name;
		info.tel = tel;
		info.email = email;
		info.isCoupon = isCoupon;
		info.couponCode = couponCode;
		info.paymentMethod = paymentMethod;
		info.deliveryMessage = deliveryMessage;

		localStorage.setItem('infos', JSON.stringify(info));
		// console.log('info', info);

	}, [name, tel, email, isCoupon, couponCode, paymentMethod, deliveryMessage]);



	return (
		<ContentWrap>
			<div className='order-product-list'>
				<h2>주문서</h2>
				<div className='order-product'>
					<div className='title'>
						<h3>주문 상품</h3>
					</div>
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
					<div className='title'>
						<h3>주문자 정보</h3>
					</div>
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
					<div className='title'>
						<h3>배송 정보</h3>
					</div>
					<div className='delivery-info-wrap'>
						<div className='delivery-info'>
							<div className='info'>배송지</div>
							<div className='info-input'>{info.address}{info.detailAddress ? ', ' : ''}{info.detailAddress}</div>
						</div>
						<div className='delivery-info'>
							<div className='info'>상세 정보</div>
							<Button onClick={() => window.open('/order/receiverDetails')}>입력</Button>
						</div>
					</div>
					<div className='pay-wrap'>
						<div className='extra-info-wrap'>
							<div className='title'>
								<h3>쿠폰/적립금</h3>
							</div>
							<div className='discount-wrap'>
								<div className='info'>쿠폰 적용</div>
								<div className='info'>적립금 적용</div>
							</div>
							<div className='title'>
								<h3>결제 수단</h3>
							</div>
							<div className='pay-method-wrap'>
							</div>
							<div className='title'>
								<h3>개인정보 수집/제공</h3>
							</div>
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
			.order-product-list { min-width: 720px; margin: 0 auto; }
			h2 { text-align: center; font-size: 36px; }
			h3 { display: inline-block; color: rgb(0, 122, 79); margin: 10px 0; font-size: 20px; padding: 0 4px; }
			.title { border-bottom: 1.4px solid #aaa; margin: 40px 0 10px 0; }

			.cart-list { display: flex; justify-content: center; align-items: center; border-bottom: 1px solid #eee; padding: 8px 10px; }
			.cart-image { margin-right: 8px; }
			a { color: rgba(0, 0, 0, 0.85); }
			.cart-product { width: 44%; margin-left: 2%; font-size: 16px; font-weight: 500; }
			.cart-amount-wrap { display: flex; width: 120px; justify-content: center; }
			.cart-sum-wrap { display: flex; width: 100px; justify-content: flex-end; margin-right: 8px; font-weight: 700; }

			.order-info { display: flex; align-items: center; padding: 10px 0;  }
			.info { width: 200px; padding: 0 10px; }
			.info-input { width: 500px; }
			.delivery-info { display: flex; align-items: center; height: 32px; padding: 20px 0; }

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