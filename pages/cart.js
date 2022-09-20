import React from 'react';

function cart({ data }) {
	return (
		<div>
			
		</div>
	);
};

export default React.memo(cart);

export const getServerSideProps = async () => {
	try {
		const res = await API.get(`/v1/shop/product`);
		if (res.status === 200) {
			console.log('res >> ', res.data.dataSet);
			// console.log('res.token >> ', res);
			const data = await res.data.dataSet;
			return { props : { data }}
		}
		return { props : { data }}
	}
	catch (e) {
		console.log('e >> ', e);
		return { props : { }}
	}
}