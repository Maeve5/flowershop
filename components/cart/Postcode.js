import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

function Postcode({ value }) {
	const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
	const [postcode, setPostcode] = useState('');
	const [address, setAddress] = useState('');
	const [detailAddress, setDetailAddress] = useState('');
	
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


		setAddress(fullAddress);
		console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
	};

	const popup = () => {
		open({ onComplete: handleComplete });
	}

	return (
		<>
			{/* <p>{address ? address : '배송지를 등록하세요.'}</p> */}
			<Button type='primary' ghost block onClick={popup} size='large' icon={<SearchOutlined />} >{value}</Button>

			<style jsx>{`
			p { text-align: center; }
			`}</style>
		</>
	);
};

export default React.memo(Postcode);