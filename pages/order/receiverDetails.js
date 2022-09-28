import React, { useState, useEffect } from 'react';
import { Button, Input, Radio, Space } from 'antd';
const { TextArea } = Input;

function receiverDetails() {
	const [location, setLocation] = useState('문 앞');
	const [door, setDoor] = useState('');
	const [access, setAccess] = useState('공동현관 비밀번호');
	// const [location, setLocation] = useState('문 앞');
	const [receiverName, setReceiverName] = useState('');
	const [receiverTel, setReceiverTel] = useState('');
	const [deliveryMessage, setDeliveryMessage] = useState('');

	const onChange = (e) => {
		let name = e.target.name;
		// console.log(e.target);
		if (name === 'location') {
			setLocation(e.target.value);
			// console.log('location', location);
		}
		else if (name === 'access') {
			setAccess(e.target.value);
			// console.log('access', access);
		}
	};

	useEffect(() => {
		let info = JSON.parse(localStorage.getItem('infos'));
		
		info.receiverName = receiverName;
		info.receiverTel = receiverTel;
		info.deliveryMessage = deliveryMessage;

		localStorage.setItem('infos', JSON.stringify(info));
		// console.log('info', info);

	}, [receiverName, receiverTel, deliveryMessage]);


	return (
		<div className='content'>
			<div className='item'>
				<h2>배송 정보</h2>
				<div className='info'>
					<div className='info-item'>
						<div className='info-title'>받으실 분</div>
						<Input type='text' placeholder='이름' value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
					</div>
					<div className='info-item'>
						<div className='info-title'>휴대폰</div>
						<Input type='tel' maxLength={11} placeholder='휴대폰 번호' value={receiverTel} onChange={(e) => setReceiverTel(e.target.value)} />
					</div>
					<div className='info-item'>
						<div className='info-title'>받으실 장소</div>
						<div className='radio-location'>
							<Radio.Group
								onChange={onChange}
								name='location'
								value={location}
							>
								<Space direction='vertical'>
									<Radio value='문 앞'>문 앞</Radio>
									<Radio value='경비실'>경비실</Radio>
									<Radio value='기타 장소'>기타 장소</Radio>
								</Space>
							</Radio.Group>
						</div>
					</div>
					{location === '문 앞' ?
						<div className='info-item'>
							<div className='info-title'>공동현관 출입방법</div>
							<div className='radio-location'>
								<Radio.Group onChange={onChange} name='access' value={access}>
									<Space direction='vertical'>
										<Radio value='공동현관 비밀번호'>
											<div>공동현관 비밀번호</div>
											{access === '공동현관 비밀번호' ? (<Input type='text' style={{ width: 400 }} placeholder='예: #1234*' value={deliveryMessage} onChange={(e) => setDeliveryMessage(e.target.value)} />) : null}
										</Radio>
										<Radio value='자유 출입 가능'>자유 출입 가능</Radio>
										<Radio value='기타'>
											<div>기타</div>
											{access === '기타' ? (<TextArea rows={4} style={{ width: 400 }} placeholder='예: 연락처로 전화, 경비실로 호출 등' />) : null}
										</Radio>
									</Space>
								</Radio.Group>
							</div>
						</div>
						: location === '경비실' ?
							<div className='info-item'>
								<div className='info-title'>경비실 특이사항</div>
								<TextArea rows={4} style={{ width: 400 }} placeholder='예: 경비실 위치 등 특이사항이 있을 경우 작성해주세요' />
							</div>
							: location === '기타 장소' ?
								<div className='info-item'>
									<div className='info-title'>기타 장소 세부 사항</div>
									<TextArea rows={4} style={{ width: 400 }} placeholder='예: 계단 밑, 주택단지 앞 경비초소를 지나 A동 출입구'  value={deliveryMessage} onChange={(e) => setDeliveryMessage(e.target.value)} />
								</div>
								: null
					}
				</div>
			</div>

			<div className='button'>
				<Button type='default' size='large' style={{ margin: '10px 4px'}} onClick block>취소</Button>
				<Button type='primary' size='large' style={{ margin: '10px 4px'}} onClick block>저장</Button>
			</div>

			<style jsx>{`
			.content { max-width: 720px; margin: 40px auto; }
			.item { margin: 20px; }
			h2 { font-size: 24px; color: rgb(0, 122, 79); border-bottom: 1.4px solid #aaa; }
			
			.info-item { margin: 10px; padding-bottom: 10px; }
			.info-title { font-size: 16px; padding: 8px 0; }

			.button { display: flex; }
			`}</style>
		</div>
	);
};

export default React.memo(receiverDetails);