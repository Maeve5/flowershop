import React, { useEffect, useState } from 'react';

function info() {

	// 데이터
	let [info, setInfo] = useState([]);
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