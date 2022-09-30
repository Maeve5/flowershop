import { Radio } from 'antd';
import React, { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import orderDataState from '../../atom/orderDataState';

function PaymentMethod() {
	const setInfo = useSetRecoilState(orderDataState);

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


	useEffect(() => {
		setPaymentMethod((data) => {
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
		<>
			<div className='title'>
				<h3>결제 수단</h3>
			</div>
			<div>
				<Radio.Group options={options} onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod} optionType="button" />
			</div>
		</>
	);
};

export default PaymentMethod;