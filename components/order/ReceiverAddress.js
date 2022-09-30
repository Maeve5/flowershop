import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import { Button } from 'antd';
import Address from './Address';
import { useRecoilValue } from 'recoil';
import orderDataState from '../../atom/orderDataState';

function ReceiverAddress() {
	// 배송지
	const data = useRecoilValue(orderDataState);

	// 주소 검색 모달
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className='address-wrap'>
			<p>
				{data.info.address ?
				`${data.info.address}${data.info.detailAddress ? ', ' : ''}${data.info.detailAddress}`
				: '배송지를 등록하세요.'}
			</p>
			<Button onClick={() => setIsOpen(!isOpen)}>
				{data.info.address ? '변경' : '등록'}
			</Button>
			<Modal isOpen={isOpen} style={{ overlay: { top: 220, maxWidth: 720, margin: '0 auto', backgroundColor: 'none' } }} ariaHideApp={false}>
				<Address />
				<Button type='primary' onClick={() => setIsOpen(false)} style={{ width: 500, display: 'block', margin: '0 auto' }} size='large' block>저장</Button>
			</Modal>

			<style jsx>{`
			p { width: 500px; }
			`}</style>
		</div>
	);
};

export default ReceiverAddress;