import { Radio } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import orderDataState from '../../atom/orderDataState';
import PayAmount from './PayAmount';

function PaymentInfo() {
	// 결제 수단
	const [paymentMethod, setPaymentMethod] = useState('');
	
	const options = [
		{
			label: '신용카드',
			value: '신용카드',
		},
		{
			label: '계좌이체',
			value: '계좌이체',
		},
		{
			label: '무통장 입금',
			value: '무통장 입금',
		},
	];
	
	// atom 저장
	const setInfo = useSetRecoilState(orderDataState);

	useEffect(() => {
		setInfo((data) => {
			return {
				...data,
				info: {
					...data.info,
					paymentMethod: paymentMethod,
				}
			};
		});
	}, [paymentMethod]);

	return (
		<div className='payment-info-wrap'>
			<div className='payment-info'>
				<div className='info'>결제 수단</div>
				<div>
					<Radio.Group options={options} onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} optionType="button" />
				</div>
			</div>
			<div className='payment-info'>
				<div className='info'>결제 금액</div>
				<div>
					<PayAmount />
				</div>
			</div>

			<style jsx>{`
			.payment-info { display: flex; padding: 10px 0;}
			.info { width: 200px; padding: 0 10px; }
			`}</style>
		</div>
	);
};

export default PaymentInfo;