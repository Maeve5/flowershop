import React, { useState, useEffect } from 'react';
import { Button, Input, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

function receiverDetails() {
	const [receiverName, setReceiverName] = useState('');
	const [receiverTel, setReceiverTel] = useState('');
	const [message, setMessage] = useState('메세지 선택 (선택사항)');
	const [deliveryMessage, setDeliveryMessage] = useState('');

	useEffect(() => {
		let info = JSON.parse(localStorage.getItem('infos'));

		info.receiverName = receiverName;
		info.receiverTel = receiverTel;
		info.deliveryMessage = deliveryMessage;

		localStorage.setItem('infos', JSON.stringify(info));

	}, [receiverName, receiverTel, deliveryMessage]);

	const onChangeMessage = (e) => {
		setMessage(e);
		if (e !== '직접 입력') {
			setDeliveryMessage(e);
		}
	};

	const onClickCancel = () => {
		setReceiverName('');
		setReceiverTel('');
		setDeliveryMessage('');
		window.close();
	}

	console.log('message', message);
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
					<div className='info-message'>
						<Select
							defaultValue='메세지 선택 (선택사항)'
							style={{display: 'block'}}
							value={message}
							onChange={onChangeMessage}
						>
							<Option value='메세지 선택 (선택사항)'>메세지 선택 (선택사항)</Option>
							<Option value='배송 전에 미리 연락바랍니다.'>배송 전에 미리 연락바랍니다.</Option>
							<Option value='부재 시 경비실에 맡겨주세요.'>부재 시 경비실에 맡겨주세요.</Option>
							<Option value='부재 시 문 앞에 놓아주세요.'>부재 시 문 앞에 놓아주세요.</Option>
							<Option value='빠른 배송 부탁드립니다.'>빠른 배송 부탁드립니다.</Option>
							<Option value='택배함에 보관해 주세요.'>택배함에 보관해 주세요.</Option>
							<Option value='직접 입력'>직접 입력</Option>
						</Select>
						<div className='message-input'>
							{message === '직접 입력' &&
								<TextArea showCount maxLength={50} style={{ display: 'block' }} onChange={(e) => setDeliveryMessage(e.target.value)} />
							}
						</div>
					</div>
				</div>
			</div>

			<div className='button'>
				<Button type='default' style={{ margin: '4px' }} onClick={onClickCancel} block>취소</Button>
				<Button type='primary' style={{ margin: '4px' }} onClick={() => window.close()} block>저장</Button>
			</div>

			<style jsx>{`
			.content { max-width: 600px; margin: 40px auto; }
			.item { margin: 20px; }
			h2 { font-size: 24px; color: rgb(0, 122, 79); border-bottom: 1.4px solid #aaa; }
			
			.info-item { margin: 10px; padding-bottom: 10px; }
			.info-title { font-size: 16px; padding: 8px 0; }
			.info-message { padding: 18px 10px; border-top: 1.4px solid #aaa; }
			.message-input { padding-top: 8px; }

			.button { display: flex; padding: 0 10px; }
			`}</style>
		</div>
	);
};

export default React.memo(receiverDetails);