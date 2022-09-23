import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';

function Checkbox({ checked, text, onClickCheck }) {
	// 체크 여부 변경
	const onClick = () => {
		if (checked === 'Y') {
			onClickCheck(checked = 'N');
		}
		else {
			onClickCheck(checked = 'Y');
		}
	};

	return (
		<div onClick={() => {onClick()}}>
			{checked === 'Y'
				? <CheckCircleFilled style={{ color: checked === 'Y' ? 'rgb(0, 122, 79)' : '#aaa', padding: '8%', marginRight: 2 }} />
				: <CheckCircleOutlined style={{ color: checked === 'Y' ? 'rgb(0, 122, 79)' : '#aaa', padding: '8%', marginRight: 2 }} />
			}
			{text}
		</div>
	);
};

export default Checkbox;