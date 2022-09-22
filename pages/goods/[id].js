import React, { useState } from 'react';
import ContentWrap from '../../components/ContentWrap';
import API from '../../modules/api';
import { Button, Modal } from 'antd';
import router from 'next/router';
import Amount from '../../components/Amount';

function Post({ data, images, details }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [amount, setAmount] = useState(1);
	const onClickAmount = (amount) => {
		setAmount(amount);
	}
	const price = (data.price * amount).toLocaleString('ko-KR');

	// 장바구니 추가
	const showModal = async () => {
		setIsModalOpen(true);
		const res = await API.post('/v1/shop/cart', {
			productKey: data.rowKey,
			cartQty: amount
		})
			.then((response) => {
				console.log('res status >> ', response);
				console.log('res data >> ', response.data);
			})
			.catch((e) => {
				console.log('e >> ', e);
			})
	};

	// 장바구니 이동 모달
	const handleOk = async () => {
		router.push('/cart');
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<ContentWrap>
			<article>
				<div>
					<img
						src={data.imageUrl}
						alt={data.imageUrl}
						width={480}
						height={560}
					/>
				</div>
				<div className='summary-wrap'>
					<div className='product'>
						{data.productName}
					</div>
					<div className='line price-wrap'>
						<div className='price'>{price}</div>
						<div className='price-won'>원</div>
					</div>
					<div className='line-container'>
						<dl className='line'>
							<dt>배송</dt>
							<dd>당일배송</dd>
						</dl>
						<dl className='line'>
							<dt>판매자</dt>
							<dd>꽃팜</dd>
						</dl>
						<dl className='line'>
							<dt>판매단위</dt>
							<dd>상품명 참조</dd>
						</dl>
					</div>
					<div className='order'>
						<dl className='line'>
							<dt>구매수량</dt>
							<div className='amount-wrap'>
								<Amount amount={amount} onClickAmount={onClickAmount} />
							</div>
						</dl>
						<div>
							<div className='sum-wrap'>
								<div>총 상품금액 :</div>
								<div className='sum'>{price}</div>
								<div className='sum-won'>원</div>
							</div>
							<div className='cart-btn'>
								<Button type='primary' block size='large' onClick={showModal}>
									장바구니 담기
								</Button>
								<Modal title='장바구니 담기 완료' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
									장바구니로 이동하시겠습니까?
								</Modal>
							</div>
						</div>
					</div>
				</div>
			</article>
			<nav>
				<div className='tap'>
					<a href="#">
						상품설명
					</a>
				</div>
				<div className='tap'>
					<a href="#">
						상세정보
					</a>
				</div>
				<div className='tap'>
					<a href="#">
						후기
					</a>
				</div>
				<div className='tap'>
					<a href="#">
						문의
					</a>
				</div>
			</nav>
			<div className='detail-wrap'>
				{images.map((row) => {
					return (
						<div key={row.rowKey} className='image'>
							<img
								className='detailImage'
								src={row.large}
								alt={row.large}
								width={600}
							/>
						</div>
					)
				})}
				{details.map((row) => {
					return (
						<div key={row.rowKey} className='image'>
							<img
								className='detailImage'
								src={row.large}
								alt={row.large}
								width={600}
							/>
						</div>
					)
				})}
			</div>

			<style jsx>{`
			article { display: flex; justify-content: space-around; }
			.summary-wrap { width: 440px; align-items: center; }
			.product { font-size: 20px; font-weight: 500; padding-top: 16px; }
			.line { margin: 0; border-bottom: 1px solid #eee; display: flex; align-items: center; }
			.price-wrap { margin: 0; padding: 16px 0; align-items: baseline; }
			.price { font-size: 28px; font-weight: 700; }
			.price-won { font-size: 18px; font-weight: 600; padding-left: 4px; }
			dl { height: 70px; }
			dt { flex: 1; }
			dd { flex: 2; margin: 0; }
			.amount-wrap { flex: 2; display: flex; }
			.sum-wrap { display: flex; justify-content: flex-end; align-items: baseline; padding-top: 32px; }
			.sum { font-size: 36px; font-weight: 700; padding: 0 4px; }
			.sum-won { font-size: 20px; font-weight: 600; padding-right: 4px; }
			.cart-btn { padding-top: 12px; }

			nav { display: flex; justify-content: space-between; text-align: center; line-height: 50px; margin-top: 80px; position: sticky; top: 204.14px; background-color: white; }
			.tap { flex: 1; height: 50px; border:1px solid #eee; font-size: 16px; }
			.detail-wrap { display: flex; flex-direction: column; justify-content: space-around; max-width: 80%; margin: 40px auto; }
			.image { display: flex; text-align: center; }
			.detailImage { display: block; margin: 40px auto; }
			`}</style>
		</ContentWrap>
	);
};

export default React.memo(Post);

export const getServerSideProps = async ({ params }) => {
	try {
		const res = await API.get(`/v1/shop/product/${params.id}`);
		if (res.status === 200) {
			console.log('res.token >> ', res.data);
			const datas = await res.data;
			const { data, images, details } = datas;
			return { props: { data, images, details } }
		}
		return { props: { data, images, details } }
	}
	catch (e) {
		console.log('e >> ', e);
		return { props: {} }
	}
}