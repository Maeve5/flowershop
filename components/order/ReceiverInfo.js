import React, { useState, useEffect } from 'react';
import orderDataState from '../../atom/orderDataState';
import { useSetRecoilState } from 'recoil';
import { Input, Select } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

function ReceiverInfo() {
	// 수령인 정보
	const [receiverName, setReceiverName] = useState('');
	const [receiverTel, setReceiverTel] = useState('');
	const [deliveryMessage, setDeliveryMessage] = useState('');
	
	// atom 저장
	const setInfo = useSetRecoilState(orderDataState);

	useEffect(() => {
		setInfo((data) => {
			return {
				...data,
				info: {
					...data.info,
					receiverName: receiverName,
					receiverTel: receiverTel,
					deliveryMessage: deliveryMessage,
				}
			};
		});
	}, [receiverName, receiverTel, deliveryMessage]);

	// 배송 메세지
	const [message, setMessage] = useState('메세지 선택 (선택사항)');

	const onChangeMessage = (e) => {
		setMessage(e);
		if (e !== '직접 입력') {
			setDeliveryMessage(e);
		}
	};

	return (
		<div className='input-container'>
			<div className='info-input'>
				<div className='info name'>
					<Input type='text' placeholder='이름' value={receiverName} onChange={(e) => setReceiverName(e.target.value)} />
				</div>
				<div className='info tel'>
					<Input type='tel' maxLength={11} placeholder='휴대폰 번호' value={receiverTel} onChange={(e) => setReceiverTel(e.target.value)} />
				</div>
				<div className='info message'>
					<Select
						defaultValue='메세지 선택 (선택사항)'
						style={{ display: 'block' }}
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

			<style jsx>{`
			.info { width: 500px; }
			.tel { padding: 10px 0; }
			.message-input { padding-top: 8px; }
			`}</style>
		</div>
	);
};

export default ReceiverInfo;