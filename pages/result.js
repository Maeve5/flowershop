import React from 'react';
import ContentWrap from '../components/ContentWrap';
import API from '../modules/api';
import Image from 'next/image';

function result ({ data }) {
	return (
		<ContentWrap>
			
		</ContentWrap>
	);
};

export default React.memo(result);

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