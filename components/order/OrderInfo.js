import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { useSetRecoilState } from 'recoil';
import orderDataState from '../../atom/orderDataState';

function OrderInfo() {
	const setInfo = useSetRecoilState(orderDataState);

	// 주문자 정보
	const [name, setName] = useState('');
	const [tel, setTel] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		setInfo((data) => {
			return {
				...data,
				info: {
					...data.info,
					name: name,
					tel: tel,
					email: email,
				}
			};
		});
	}, [name, tel, email]);

	return (
		<>
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

			<style jsx>{`
			.order-info { display: flex; align-items: center; padding: 10px 0;  }
			.info { width: 200px; padding: 0 10px; }
			.info-input { width: 500px; }
			`}</style>
		</>
	);
};

export default OrderInfo;