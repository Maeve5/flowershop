import React from 'react';
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
				? <CheckCircleFilled style={{ color: 'rgb(0, 122, 79)', padding: '8%', marginRight: 2 }} />
				: <CheckCircleOutlined style={{ color: '#aaa', padding: '8%', marginRight: 2 }} />
			}
			{text}
		</div>
	);
};

export default React.memo(Checkbox);