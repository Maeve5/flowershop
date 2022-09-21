import React, { useState } from 'react';
import ContentWrap from '../../components/ContentWrap';
import API from '../../modules/api';
import Image from 'next/image';
import { Button, Modal } from 'antd';
import router from 'next/router';

function Post({ data, images, details }) {
	const price = data.price.toLocaleString('ko-KR');
	const image = [];
	const detail = [];
	const [amount, setAmount] = useState(1);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// 상세설명란 이미지
	images.map((row) => {
		image.push(
			<div key={row.rowKey} className='image' style={{width: '100%', height: '600px', position: 'relative'}}>
				<Image
					src={row.large}
					alt={row.large}
					layout='fill'
					objectFit='contain'
				/>
			</div>,
		)
	})

	details.map((row) => {
		detail.push(
			<div key={row.rowKey} className='image' style={{width: '100%', height: '100%', position: 'relative'}}>
				<Image
					src={row.large}
					alt={row.large}
					layout='fill'
					objectFit='contain'
				/>
			</div>,
		)
	})

	// 수량 증감
	const handleDecresement = () => {
		setAmount(amount-1);
	}
	
	const handleIncresement = () => {
		setAmount(amount+1);
	}

	// 장바구니 추가
	const showModal = () => {
		setIsModalOpen(true);
		console.log('rowKey >>', data.rowKey);
		console.log('amount >>', amount);
		
	};

	// 장바구니 이동 모달
	const handleOk = async () => {
		try {
			API.post('/v1/shop/cart', {
				productKey: data.rowKey,
				cartQty: amount
			})
			router.push('/cart');
		}
		catch (e) {
			console.log('e >> ', e);
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<ContentWrap>
			<article>
				<div>
					<Image
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
								<Button
									size='small'
									onClick={handleDecresement}
									// disabled={conditionD}
								>-</Button>
								<div className='amount'>{amount}</div>
								<Button
									size='small'
									onClick={handleIncresement}
									// disabled={conditionI}
								>+</Button>
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
				{image}
				{detail}
			</div>

			<style jsx>{`
			article { display: flex; justify-content: space-between; }
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
			.amount { width: 60px; height: 24px; text-align: center; }
			.sum-wrap { display: flex; justify-content: flex-end; align-items: baseline; padding-top: 32px; }
			.sum { font-size: 36px; font-weight: 700; padding: 0 4px; }
			.sum-won { font-size: 20px; font-weight: 600; padding-right: 4px; }
			.cart-btn { padding-top: 12px; }

			nav { display: flex; justify-content: space-between; text-align: center; line-height: 50px; margin-top: 80px; position: sticky; top: 210px; }
			.tap { flex: 1; height: 50px; border:1px solid #eee; font-size: 16px; }
			.detail-wrap { display: flex; margin: 10px 0; flex-direction: column; max-width: 50%; margin: 40px auto; }
			.image { width: 100%; height: 100%; position: relative; }
			`}</style>
		</ContentWrap>
	);
};

export default React.memo(Post);

export const getServerSideProps = async ({ params }) => {
	try {
		const res = await API.get(`/v1/shop/product/${params.id}`);
		if (res.status === 200) {
			// console.log('res >> ', res.data.dataSet);
			console.log('res.token >> ', res.data);
			const datas = await res.data;
			const { data, images, details } = datas;
			return { props : { data, images, details }}
		}
		return { props : { data, images, details }}
	}
	catch (e) {
		console.log('e >> ', e);
		return { props : { }}
	}
}