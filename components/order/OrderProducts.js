import React from 'react';

function OrderProducts() {
	return (
		<>
			<div className='title'>
				<h3>주문 상품</h3>
			</div>
			<div className='cart-list-wrap'>
				{dataSet.map((row) => {
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
		</>
	);
};

export default OrderProducts;