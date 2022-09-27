import React, { useState } from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

function Address( dataSet ) {
	const [zoneCode, setZoneCode] = useState('');
	const [roadAddress, setRoadAddress] = useState('');

	const handleComplete = (data) => {
		console.log(data);
		setZoneCode(data.zonecode);
		setRoadAddress(data.roadAddress);

		console.log(typeof window);

		useEffect(() => {
			let item = localStorage.getItem('key');
			console.log(item);
		}, [])


		// let items = JSON.parse(localStorage.getItem('items'));
		// 	console.log(items);

		// 	let data = {
		// 		key: items ? items?.length + 1 : 1,
		// 		zoneCode: zoneCode,
		// 		roadAddress: roadAddress
		// 	}

		// 	items.push(data);
		// 	localStorage.setItem('items', JSON.stringify(items));
		// 	console.log(items);

		// let fullAddress = data.address;
		// let extraAddress = '';
		// if (data.addressType === 'R') {
		//     if (data.bname !== '') {
		//         extraAddress += data.bname;
		//     }
		//     if (data.buildingName !== '') {
		//         extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
		//     }
		//     fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
		// }
		// fullAddress -> 전체 주소반환
	}

	return (
		<>
			<p>우편번호 : {zoneCode}</p>
			<p>주소 : {roadAddress}</p>
			<DaumPostcodeEmbed onComplete={handleComplete} />
		</>
	);
};

export default React.memo(Address);

export const getServerSideProps = async () => {
	try {
		const res = await API.get('/v1/shop/cart');
		// console.log('res dataSet >> ', res.data.dataSet);
		// console.log('res >> ', res);
		const dataSet = await res.data.dataSet;
		return { props: { dataSet } }
	}
	catch (e) {
		console.log('e >> ', e);
		return { props: {} }
	}
}