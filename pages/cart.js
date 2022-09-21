import React from 'react';
import ContentWrap from '../components/ContentWrap';
import API from '../modules/api';
import Image from 'next/image';
import { Button } from 'antd';
import { CloseOutlined, EnvironmentOutlined } from '@ant-design/icons';
// import checkLined from '../public/check-filled.svg';

function cart({ data }) {
	const price = data[0].price.toLocaleString('ko-KR');
	const sumPrice = (data[0].price+3000).toLocaleString('ko-KR');

	return (
		<ContentWrap>
			<h2>장바구니</h2>
			<div className='content-wrap'>
				<div className='cart-wrap'>
					<div className='cart-select'>
						<div className='selete-all'>
							<label htmlFor='checker'>
								<input type='checkbox' id='checker' />
								전체선택
							</label>
						</div>
						<Button type='text'>선택삭제</Button>
					</div>
					<div className='cart-list'>
						<label htmlFor='checker'>
							<input type='checkbox' id='checker' />
						</label>
						<div className='cart-image'>
							<Image
								src={data[0].imageUrl}
								alt={data[0].imageUrl}
								width={72}
								height={84}
							/>
						</div>
						<div className='cart-product'>
							{data[0].productName}
						</div>
						<div className='cart-count-wrap'>
							<Button size='small'>-</Button>
							<div className='count'>1</div>
							<Button size='small'>+</Button>
						</div>
						<div className='cart-sum-wrap'>
							<div className='sum'>{price}</div>
							<div className='sum-won'>원</div>
						</div>
						<Button type='text' size='small' icon={<CloseOutlined />} />
					</div>
					<div className='cart-select'>
						<div className='selete-all'>
							<label htmlFor='checker'>
								<input type='checkbox' id='checker' />
								전체선택
							</label>
						</div>
						<Button type='text'>선택삭제</Button>
					</div>
				</div>
				<div className='order-wrap'>
					<div className='order-address-wrap'>
						<div className='address-title'>
							<EnvironmentOutlined />
							<h3>배송지</h3>
						</div>
						<div className='address-wrap'>
							<p>주소지</p>
							<Button type='primary' ghost block>배송지 설정</Button>
						</div>
					</div>
					<div className='order-sum-wrap'>
						<div className='sum-count'>
							<div>상품금액</div>
							<div>{price} 원</div>
						</div>
						<div className='sum-delivery'>
							<div>배송비</div>
							<div>+3,000 원</div>
						</div>
						<div className='sum-charge'>
							<div>결제예정금액</div>
							<div>{sumPrice} 원</div>
						</div>
					</div>
					<div className='order-button-wrap'>
						<Button type='primary' block size='large'>주문하기</Button>
					</div>
				</div>
			</div>

			<style jsx>{`
			h2 { font-size: 28px; text-align: center; padding-bottom: 40px; }
			.content-wrap { display: flex; justify-content: space-between; font-size: 16px; padding-bottom: 80px; }

			.cart-wrap { width: 700px; }
			.cart-select { display: flex; align-items: center; padding: 12px; }
			.select-all {  }
			label { display: flex; align-items: center; font-size: 14px }
			input { width: 1.5em; height: 1.5em; margin-right: 10px; appearance: none; outline: none; background: white no-repeat center center; background-image: url('../public/check-lined.svg'); }
			.cart-list { display: flex; align-items: center; border-top: 1px solid #aaa; border-bottom: 1px solid #eee; padding: 10px 0; }
			.cart-image { margin-right: 20px; }
			.cart-product { width: 320px; }
			.cart-count-wrap { display: flex; width: 120px; justify-content: center; }
			.count { width: 52px; height: 24px; text-align: center; }
			.cart-sum-wrap { display: flex; width: 100px; justify-content: flex-end; margin-right: 8px; font-weight: 700; }

			.order-wrap { width: 270px; padding-top: 56px; }
			.order-address-wrap { padding: 20px; border: 1px solid #eee; }
			.address-title { display: flex; align-items: baseline; }
			h3 { padding-left: 4px; margin: 0; }
			.address-wrap { padding-top: 12px; }

			.order-sum-wrap { background-color: rgb(250, 250, 250); border: 1px solid #eee; padding: 20px; }
			.sum-count { display: flex; justify-content: space-between; }
			.sum-delivery { display: flex; justify-content: space-between; padding-top: 12px; }
			.sum-charge { display: flex; justify-content: space-between; padding-top: 20px; margin-top: 12px; border-top: 1px solid #eee; }

			.order-button-wrap { padding-top: 20px; }
			`}</style>
		</ContentWrap>
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