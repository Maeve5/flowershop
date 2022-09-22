import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';

function Checkbox({ checked, onClickCheck}) {
	
	const onClick = () => {
		console.log(checked === 'Y');
		if (checked === 'Y') {
			onClickCheck(checked = 'N');
		}
		else {
			onClickCheck(checked = 'Y');
		}
	}

	return (
			<Button
			type='text'
			onClick={onClick}
			style={{ color: checked === 'Y' ? 'rgb(0, 122, 79)' : '#aaa', backgroundColor: 'none'}}
			icon={checked === 'Y' ? <CheckCircleFilled /> : <CheckCircleOutlined />}
			/>
	);
};

export default Checkbox;