import React from 'react';

function OrderInfo() {
	return (
		<>
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
		</>
	);
};

export default OrderInfo;