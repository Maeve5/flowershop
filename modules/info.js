import React, { useEffect, useState } from 'react';

function info() {

	// 데이터
	let [info, setInfo] = useState([]);
	const [name, key, tel, email, receiverName, receiverTel, postcode, address, detailAddress, isCoupon, couponCode, paymentMethod, deliveryMessage] = info;

	info = {
		key: key,
		name: name,
		tel: tel,
		email: email,
		receiverName: receiverName,
		receiverTel: receiverTel,
		postcode: postcode,
		address: address,
		detailAddress: detailAddress,
		isCoupon: isCoupon ? isCoupon : null,
		couponCode: couponCode ? couponCode : null,
		paymentMethod: paymentMethod,
		deliveryMessage: deliveryMessage ? deliveryMessage : null
	};

	useEffect(() => {
		window.localStorage.setItem('infos', JSON.stringify(info));
	}, []);
};

export default React.memo(info);