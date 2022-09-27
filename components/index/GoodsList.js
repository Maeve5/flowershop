import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Col, Row } from 'antd';

function GoodsList({data}) {
	return (
		<>
			<Row>
				{data.map((row) => {
					return (
						<Col key={row.rowKey} span={5} style={{ margin: '32px 10px' }}>
							<Link href={`/goods/${row.rowKey}`}>
								<a>
									<Image
										src={row.imageUrl}
										alt={row.imageUrl}
										width={200}
										height={240}
									/>
									<div>{row.productName}</div>
									<div>{row.price.toLocaleString('ko-KR')}원</div>
								</a>
							</Link>
						</Col>
					)
				})}
			</Row>

			<style jsx>{`
			a { color: rgba(0, 0, 0, 0.85); }
			`}</style>
		</>
	);
};

export default React.memo(GoodsList);