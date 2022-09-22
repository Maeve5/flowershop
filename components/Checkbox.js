import React from 'react';
import { Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

function Checkbox() {

	return (
		<Button
			type='text'
			style={{ color: 'rgb(0, 122, 79)', backgroundColor: 'white'}}
			icon={<CheckCircleOutlined />}
			onClick
		/>
	);
};

export default Checkbox;