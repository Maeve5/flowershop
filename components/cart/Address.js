import { Button, Input } from 'antd';
import React, { useState } from 'react';
import Modal from 'react-modal/lib/components/Modal';
import Postcode from './Postcode';

function Address() {
	let info = {};
	const [detailAddress, setDetailAddress] = useState('');
	const [address, setAddress] = useState('');

	// useEffect(() => {
		
	// }, []);
	return (
		<>
			<div className='body'>
				<h2>배송지</h2>
				<div className='address-container'>
					<div className='address-wrap'>
						<div className='address'>
							<Input type='text' value='address' size='large' readOnly />
						</div>
						<div className='research'>
							<Postcode value='재검색' />
						</div>
					</div>
					<div>
						<Input type='text' placeholder='나머지 주소를 입력해주세요' onChange={(e) => setDetailAddress(e.target.value)} size='large' />
					</div>
				</div>
				<Button type='primary' size='large' block onClick>저장</Button>
			</div>

			<style jsx>{`
			.body { width: 500px; margin: 20px auto; }
			h2 { text-align: center; font-size: 20px; padding: 20px 0; }
			.address-container { padding: 20px 0; }
			.address-wrap { display: flex; padding: 4px 0; }
			.address { flex: 4; padding-right: 4px; }
			.research { flex: 1; }
			`}</style>
		</>
	);
};

export default React.memo(Address);