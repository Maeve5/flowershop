import React from 'react';
import { Layout, Space, Input, Menu } from 'antd';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

function MallWrap({ children }) {

	return (
		<>
			<Layout style={{ background : 'white' }}>
				<div>
					<div className='top-wrap'>
						<div className='top-rightside-wrap'></div>
						<div className='top-home-wrap'>
							<Space direction="vertical">
								<Search
									placeholder="input search text"
									allowClear
									// onSearch={onSearch}
									style={{
										width: 400,
									}}
								/>
							</Space>
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
											label: '특가/이벤트',
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
					<Footer>footer</Footer>
				</div>
			</Layout>

			<style jsx>{`
			.top-wrap { position: relative; }
			.top-rightside-wrap { position: absolute; }
			.top-home-wrap {}
			.header-wrap { position: fixed; zIndex: 1; width: 100%; }
			.menu-wrap { float: right; width: 280px; }
			.content-wrap { padding: 0 50px; margin-top: 64px; }
			.children-wrap { padding: 24px; min-height: 380px; background-color: white; }
			.footer-wrap { text-align: center; }
			`}</style>
		</>
	);
};

export default MallWrap;