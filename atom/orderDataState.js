import { atom } from "recoil";

const orderDataState = atom({
	key: 'orderDataState',
	default: {
		'rowKey': 0,
		'info': {			
			'name': null,
			'tel': null,
			'email': null,
			'receiverName': null,
			'receiverTel': null,
			'postcode': null,
			'address': null,
			'detailAddress': null,
			'isCoupon': 'N',
			'couponCode': null,
			'paymentMethod': null,
			'productPrice': 0,
			'discountPrice': 0,
			'couponPrice': 0,
			'deliveryFee': 3000,
			'paymentAmount': 0,
			'deliveryMessage': 0
		},
		'items': []
	}
})

export default orderDataState;