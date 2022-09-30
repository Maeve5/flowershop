import React from 'react';
import ContentWrap from '../../components/ContentWrap';
import { Button } from 'antd';
import router from 'next/router';
import OrderProducts from '../../components/order/OrderProducts';
import OrderInfo from '../../components/order/OrderInfo';
import DeliveryInfo from '../../components/order/DeliveryInfo';
import PaymentInfo from '../../components/order/PaymentInfo';
import CouponReserve from '../../components/order/CouponReserve';
import orderDataState from '../../atom/orderDataState';
import { useRecoilValue } from 'recoil';

function order() {
	const data = useRecoilValue(orderDataState);

	console.log('data', data);

	return (
		<ContentWrap>
			<div className='order-product-list'>
				<h2>주문서</h2>
				<div className='order-product'>
					<div className='title'>
						<h3>주문 상품</h3>
					</div>
					<OrderProducts />
					<div className='title'>
						<h3>주문자 정보</h3>
					</div>
					<OrderInfo />
					<div className='title'>
						<h3>배송 정보</h3>
					</div>
					<DeliveryInfo />

					<div className='payment-info'>
						<h3>결제 정보</h3>
					</div>
					<div className='payment-wrap'>
						<PaymentInfo />
						<div className='payment-amount-wrap'>
							{/* <PayAmount /> */}
						</div>
					</div>
					<div className='payment-button'>
						<Button type='primary' size='large' style={{ width: 300, height: 52 }} onClick={() => router.push('/result')}>{data.info.paymentAmount.toLocaleString('ko-KR')}원 결제하기</Button>
					</div>
				</div>
			</div>

			<style jsx>{`
			.order-product-list { min-width: 720px; margin: 0 auto; }
			h2 { text-align: center; font-size: 36px; }
			h3 { display: inline-block; color: rgb(0, 122, 79); margin: 10px 0; font-size: 20px; padding: 0 4px; }
			.title { border-bottom: 1.4px solid #aaa; margin: 40px 0 10px 0; }
			
			.order-info { display: flex; align-items: center; padding: 10px 0;  }
			.info { width: 200px; padding: 0 10px; }
			.info-input { width: 500px; }

			.payment-info { border-bottom: 1.4px solid #aaa; margin-bottom: 10px; }
			.payment-button { text-align: center; margin-top: 40px; }
			`}</style>
		</ContentWrap >
	);
};

export default React.memo(order);