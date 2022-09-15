import React from 'react';
import { Layout, Menu } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

function MallWrap({ children }) {



	return (
		<Layout>
			<Header style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
      }}>
				<div>
					<Menu
						theme="light"
						mode="horizontal"
						defaultSelectedKeys={['3']}
						items={[
							{
								key: 1,
								label: '신상품',
							},
							{
								key: 2,
								label: '베스트',
							},
							{
								key: 3,
								label: '베스트',
							},
						]} />
				</div>
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