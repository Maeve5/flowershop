import React from 'react';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

function MallWrap({ children }) {



	return (
		<Layout>
			<Header>
				<Menu
					theme="light"
					items={[
						{
							key: 1,
							label: '신상품',
						},
						{
							key: 2,
							label: '베스트',
						},
					]} />
			</Header>
			<Layout>
				<Sider>left sidebar</Sider>
				<Content>{children}</Content>
				<Sider>right sidebar</Sider>
			</Layout>
			<Footer>footer</Footer>
		</Layout>
	);
};

export default MallWrap;