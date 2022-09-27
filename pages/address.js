import React, { useState, useEffect } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

function address() {
	const [zoneCode, setZoneCode] = useState('');
	const [roadAddress, setRoadAddress] = useState('');


	const handleComplete = (data) => {
		// console.log(data);
		setZoneCode(data.zonecode);
		setRoadAddress(data.roadAddress);
	};

	// useEffect(() => {
	// 	let info = JSON.parse(localStorage.getItem('info'));
	// 	info = info ? info : [];
	// 	console.log('info', info);
		
	// 	info = {
	// 		...info,
	// 		postcode: zoneCode,
	// 		address: roadAddress,
	// 		detailAddress: ''
	// 	}

	// 	localStorage.setItem('infos', JSON.stringify(info));
	// }, []);
	console.log(roadAddress);
	return (
		<>
			<DaumPostcodeEmbed onComplete={handleComplete} autoClose />
		</>
	);
};

export default address;