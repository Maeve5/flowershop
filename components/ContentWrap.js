import React from 'react';
import { Layout, Space, Input, Menu } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

function ContentWrap({ children }) {

	return (
		<>
			<Layout style={{ background : 'white' }}>
				<div>
					<div className='top-wrap'>
						<div className='top-rightside-wrap'>
						
						</div>
						<div className='top-home-wrap'>
							<div></div>
							<div className='search-wrap'>
								<Space direction="vertical">
									<Search
										placeholder="input search text"
										allowClear
										// onSearch={onSearch}
										bordercolor='rgb(0, 122, 79)'
										style={{
											width: 360,
										}}
										size='large'
									/>
								</Space>
							</div>
							<div className='icon-wrap'>
								<ShoppingCartOutlined
									style={{
										fontSize: '200%',
										color: 'rgb(0, 122, 79)'
									}}
								/>
							</div>
						</div>
					</div>
					<div className='header-wrap'>
						<Header style={{ background: 'white' }}>
							<div className='menu-wrap'>
								<Menu
									theme='light'
									mode='horizontal'
									defaultSelectedKeys={['3']}
									items={[
										{
											key: '1',
											label: '신상품',
										},
										{
											key: '2',
											label: '베스트',
										},
										{
											key: '3',
											label: '알뜰쇼핑',
										},
									]}
								/>
							</div>
						</Header>
					</div>
				</div>
				<Layout style={{ background : 'white' }}>
					<div className='content-wrap'>
						<Content>
							<div className='children-wrap'>
								{children}
							</div>
						</Content>
					</div>
				</Layout>
				<div className='footer-wrap'>
					<Footer>Maeve Shop</Footer>
				</div>
			</Layout>

			<style jsx>{`
			.top-wrap { position: relative; }
			.top-rightside-wrap { text-align: right; margin-right: 64px; height: 50px }
			.top-home-wrap { display: flex; align-items: center; }
			.header-wrap { position: fixed; zIndex: 1; width: 100%; }
			.menu-wrap { float: right; width: 280px; }
			.content-wrap { padding: 0 50px; margin-top: 64px; }
			.children-wrap { padding: 24px; min-height: 380px; background-color: white; }
			.footer-wrap { text-align: center; }
			`}</style>
		</>
	);
};

export default ContentWrap;