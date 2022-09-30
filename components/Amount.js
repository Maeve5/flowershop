import React from 'react';
import { Button } from 'antd';

function ProductAcount({ amount, onClickAmount }) {
	// 수량 증감
	const handleDecresement = () => {
		onClickAmount(amount - 1);
	};

	const handleIncresement = () => {
		onClickAmount(amount + 1);
	};

	return (
		<>
			<Button
				size='small'
				onClick={handleDecresement}
				disabled={amount < 2 ? true : false }
			>-</Button>
			<div className='amount'>{amount}</div>
			<Button
				size='small'
				onClick={handleIncresement}
				disabled={amount > 9999 ? true : false}
			>+</Button>

			<style jsx>{`
			.amount { width: 60px; height: 24px; text-align: center; }
			`}</style>
		</>
	);
};

export default React.memo(ProductAcount);