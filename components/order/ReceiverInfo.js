import React from 'react';

function ReceiverInfo() {
	return (
		<>
			<div className='title'>
				<h3>배송 정보</h3>
			</div>
			<div className='delivery-info-wrap'>
				<div className='delivery-info'>
					<div className='info'>배송지</div>
					<div className='info-input'>{address}{detailAddress ? ', ' + detailAddress : ''}</div>
				</div>
				<div className='delivery-info'>
					<div className='info'>상세 정보</div>
					<div className='input-container'>
						{deliveryMessage &&
							<>
								<div className='info-input receiver'>받으실 분 : {receiverName}</div>
								<div className='info-input receiver'>연락처 : {receiverTel}</div>
								<div className='info-input receiver'>배송 메세지 : {deliveryMessage}</div>
							</>
						}
						<div className='receiver-button'>
							<Button onClick={() => window.open('/order/receiverDetails')}>{deliveryMessage ? '수정' : '입력'}</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default ReceiverInfo;