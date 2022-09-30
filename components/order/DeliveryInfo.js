import React from 'react';
import ReceiverAddress from './ReceiverAddress';
import ReceiverInfo from './ReceiverInfo';

function DeliveryInfo() {
	return (
		<div className='delivery-info-wrap'>
			<div className='delivery-info'>
				<div className='info'>배송지</div>
				<ReceiverAddress />
			</div>
			<div className='delivery-info'>
				<div className='info'>상세 정보</div>
				<ReceiverInfo />
			</div>

			<style jsx>{`
			.delivery-info-wrap { display: block; }
			.delivery-info { display: flex; align-content: flex-start; padding: 10px 0; }
			.info { width: 200px; padding: 0 10px; }
			`}</style>
		</div>
	);
};

export default DeliveryInfo;