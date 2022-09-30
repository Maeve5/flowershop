import React from 'react';
import { useRecoilValue } from 'recoil';
import orderDataState from '../../atom/orderDataState';

function PayAmount() {
	// 결제 정보
	const data = useRecoilValue(orderDataState);

	return (
		<div className='input-container'>
			<div className='info-input'>
				<div className='info'>
					<div className='title'>상품구매금액</div>
					<div className='text'>{data.info.productPrice.toLocaleString('ko-KR')} 원</div>
				</div>
				<div className='info mid'>
					<div className='title'>배송비</div>
					<div className='text'>+ {data.info.deliveryFee.toLocaleString('ko-KR')} 원</div>
				</div>
				<div className='info'>
					<div className='title'>결제금액</div>
					<div className='text'>{data.info.paymentAmount.toLocaleString('ko-KR')} 원</div>
				</div>
			</div>

			<style jsx>{`
			.info-input { width: 300px; }
			.info { display: flex; justify-content: space-between; }
			.mid { padding: 10px 0; }
			`}</style>
		</div>
	);
};

export default PayAmount;