import React from 'react';
import { useRecoilValue } from 'recoil';
import orderDataState from '../../atom/orderDataState';
import Link from 'next/link';

function OrderProducts() {
	const orderData = useRecoilValue(orderDataState);

	return (
		<>
			<div className='cart-list-wrap'>
				{/* 주문할 품목 리스트 */}
				{orderData.items.map((row) => {
					return (
						<div key={row.cartKey} className='cart-list'>
							<div className='cart-image'>
								<img
									src={row.imageUrl}
									alt={row.imageUrl}
									width={80}
								/>
							</div>
							<Link href={`/goods/${row.productKey}`}>
								<a className='cart-product'>
									{row.productName}
								</a>
							</Link>
							<div className='cart-amount-wrap'>
								수량 : {row.amount}
							</div>
							<div className='cart-sum-wrap'>
								<div className='sum-value'>{(row.price * row.amount).toLocaleString('ko-KR')}</div>
								<div className='sum-unit'>원</div>
							</div>
						</div>
					)
				})}
			</div>

			<style jsx>{`
			.cart-list { display: flex; justify-content: center; align-items: center; border-bottom: 1px solid #eee; padding: 8px 10px; }
			.cart-image { margin-right: 8px; }
			a { color: rgba(0, 0, 0, 0.85); }
			.cart-product { width: 44%; margin-left: 2%; font-size: 16px; font-weight: 500; }
			.cart-amount-wrap { display: flex; width: 120px; justify-content: center; }
			.cart-sum-wrap { display: flex; width: 100px; justify-content: flex-end; margin-right: 8px; font-weight: 700; }s
			`}</style>
		</>
	);
};

export default OrderProducts;