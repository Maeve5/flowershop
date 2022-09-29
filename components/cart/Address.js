import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { SearchOutlined } from '@ant-design/icons';

function Address() {
	let info = [];
	const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
	
	// 데이터
	const [name, setName] = useState('');
	const [key, setKey] = useState(0);
	const [tel, setTel] = useState('');
	const [email, setEmail] = useState('');
	const [receiverName, setReceiverName] = useState('');
	const [receiverTel, setReceiverTel] = useState('');
	const [postcode, setPostcode] = useState('');
	const [address, setAddress] = useState('');
	const [detailAddress, setDetailAddress] = useState('');
	const [isCoupon, setIsCoupon] = useState('');
	const [couponCode, setCouponCode] = useState('');
	const [paymentMethod, setPaymentMethod] = useState('');
	const [deliveryMessage, setDeliveryMessage] = useState('');

	//
	const handleComplete = (data) => {
		let fullAddress = data.address;
		let extraAddress = '';

		if (data.addressType === 'R') {
			if (data.bname !== '') {
				extraAddress += data.bname;
			}
			if (data.buildingName !== '') {
				extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
			}
			fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
		}
		
		setPostcode(data.zonecode);
		setAddress(fullAddress);
		// e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
	};
	
	
	useEffect(() => {

		const data = JSON.parse(localStorage.getItem('infos'));
		info = {
			key: key,
			postcode: postcode,
			address: address,
			detailAddress: detailAddress,
		}
		
		localStorage.setItem('infos', JSON.stringify(info));
	}, [postcode, address, detailAddress]);

	const popup = () => {
		open({ onComplete: handleComplete });
	};

	return (
		<>
			<div className='body'>
				<h2>배송지</h2>
				<div className='address-container'>
					<div className='address-wrap'>
						<div className='address'>
							<Input
								type='text'
								size='large'
								value={address ? address : '주소를 검색해주세요'}
								style={{color: address ? 'inherit' : '#bbb'}}
								readOnly
							/>
						</div>
						<div className='research'>
						<Button type='primary' ghost block onClick={popup} size='large' icon={<SearchOutlined />}>{address ? '재검색' : '검색'}</Button>
						</div>
					</div>
					<div>
						<Input type='text' value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} placeholder='나머지 주소를 입력해주세요' size='large' />
					</div>
				</div>
				
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