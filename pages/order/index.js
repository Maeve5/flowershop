import React, { useState, useEffect } from 'react';
import ContentWrap from '../../components/ContentWrap';
import API from '../../modules/api';
import Link from 'next/link';
import { Button, Input } from 'antd';
import router from 'next/router';
import OrderProducts from '../../components/order/OrderProducts';
import OrderInfo from '../../components/order/OrderInfo';
import ReceiverInfo from '../../components/order/ReceiverInfo';
import PaymentMethod from '../../components/order/PaymentMethod';
import PayAmount from '../../components/order/PayAmount';
import CouponReserve from '../../components/order/CouponReserve';
import orderDataState from '../../atom/orderDataState';
import { useRecoilValue } from 'recoil';

function order({ dataSet }) {
	const orderData = useRecoilValue(orderDataState);
	const { info, items } = orderData;

	console.log('paymentAmount', info.paymentAmount);
	console.log('items', items);

	// // 데이터
	// // const [info, setInfo] = useState({});
	// const [name, setName] = useState('');
	// const [tel, setTel] = useState('');
	// const [email, setEmail] = useState('');
	// const [receiverName, setReceiverName] = useState('');
	// const [receiverTel, setReceiverTel] = useState('');
	// const [address, setAddress] = useState('');
	// const [detailAddress, setDetailAddress] = useState('');
	// const [isCoupon, setIsCoupon] = useState('');
	// const [couponCode, setCouponCode] = useState('');
	// const [paymentMethod, setPaymentMethod] = useState('');
	// const [deliveryMessage, setDeliveryMessage] = useState('');

	// const getLocalStorage = () => {
	// 	const info1 = JSON.parse(localStorage.getItem('infos'));
	// 	// localStorage의 데이터를 return에 사용
	// 	setAddress(info1.address);
	// 	setDetailAddress(info1.detailAddress);
	// 	setReceiverName(info1.receiverName);
	// 	setReceiverTel(info1.receiverTel);
	// 	setDeliveryMessage(info1.deliveryMessage);
	// };

	// // 브라우저가 로딩된 후에 localStorage 불러오기
	// useEffect(() => {
	// 	getLocalStorage();
	// }, []);

	// useEffect(() => {
	// 	// console.log('info1', info1);
	// 	// info1.name = name,
	// 	// info1.tel = tel,
	// 	// info1.email = email
	// 	// info2 = {
	// 	// 	name: name,
	// 	// 	tel: tel,
	// 	// 	email: email,
	// 	// 	isCoupon: isCoupon,
	// 	// 	couponCode: couponCode,
	// 	// 	paymentMethod: paymentMethod,
	// 	// }
	// 	// console.log('info1', info1);

	// }, [name, tel, email, isCoupon, couponCode, paymentMethod]);

	const onClickPayment = () => {
		// localStorage.setItem('infos', JSON.stringify(info1));
		// const infos = {...info1, ...info2};
		// localStorage.setItem('infos', JSON.stringify(infos));
		// console.log('infos >> ', infos);
	};


	return (
		<ContentWrap>
			<div className='order-product-list'>
				<h2>주문서</h2>
				<div className='order-product'>
					{/* <OrderProducts />
					<OrderInfo />
					<ReceiverInfo />
					<div className='payment-wrap'>
						<div className='extra-info-wrap'>
							<CouponReserve />
							<PaymentMethod />
							<div className='payment-amount-wrap'>
								<PayAmount />
							</div>
						</div>
						<div className='payment-wrap'>
							<h3>결제 금액</h3>
						</div>
					</div> */}
					<div className='payment-button'>
						<Button type='primary' size='large' style={{ width: 300, height: 52 }} onClick={onClickPayment}>{info.paymentAmount}원 결제하기</Button>
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
			.delivery-info-wrap { display: block; }
			.delivery-info { display: flex; align-content: flex-start; padding: 10px 0; }
			.receiver { padding: 4px 0; }
			.receiver-button { padding: 10px 0; }

			.payment-wrap { display: flex; }
			.extra-info-wrap { flex: 2; }
			.payment-wrap { flex: 1; }
			.payment-button { text-align: center; margin-top: 40px; }
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
		router.push('/cart');
	}
}