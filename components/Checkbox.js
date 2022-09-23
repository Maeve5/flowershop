import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';

function Checkbox({ checked, mode, onClickCheck }) {
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
			<Button
				type='link'
				onClick={(e) => {e.stopPropagation(); onClick();}}
				style={{ padding: 0 }}
				icon={checked === 'Y'
					? <CheckCircleFilled style={{ color: checked === 'Y' ? 'rgb(0, 122, 79)' : '#aaa', padding: '8%' }} />
					: <CheckCircleOutlined style={{ color: checked === 'Y' ? 'rgb(0, 122, 79)' : '#aaa', padding: '8%' }} />
				}
			>
			</Button>
			{!mode ? '' : '전체선택'}
		</div>
	);
};

export default Checkbox;