import React from 'react';
import { Layout, Space, Input, Menu, Button } from 'antd';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import router from 'next/router';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

function ContentWrap({ children }) {

	return (
		<div className='layout'>
			<Layout style={{ background: 'white' }}>
				<div className='top-layout-wrap'>
					<div className='top-wrap'>
						<div className='top-rightside-wrap'>
							회원가입 로그인 고객센터
						</div>
						<div className='top-home-wrap'>
							<div className='home-btn'>
								<Button
									type='text'
									size='large'
									style={{color: 'rgb(0, 122, 79)', backgroundColor: 'white'}}
									icon={<HomeOutlined />}
									onClick={() => router.push('/')}
								/>
							</div>
							<div className='search-wrap'>
								<Space direction="vertical">
									<Search
										placeholder="검색어를 입력해 주세요."
										allowClear
										// onSearch={onSearch}
										size='large'
										bordercolor='rgb(0, 122, 79)'
										style={{width: 360}}
									/>
								</Space>
							</div>
							<div className='icon-wrap'>
								<Button
									type='text'
									size='large'
									style={{color: 'rgb(0, 122, 79)', backgroundColor: 'white'}}
									icon={<ShoppingCartOutlined />}
									onClick={() => router.push('/cart')}
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
				<div className='content-layout-wrap'>
					<Layout style={{ background : 'white' }}>
						<div className='content-wrap'>
							<Content>
								<div className='children-wrap'>
									{children}
								</div>
							</Content>
						</div>
					</Layout>
				</div>
				<div className='footer-wrap'>
					<Footer>Flower Shop</Footer>
				</div>
			</Layout>

			<style jsx>{`
			.layout { width: 1000px; margin: auto; }

			.top-layout-wrap { position: sticky; top: 0; background-color: white; }
			.top-wrap { position: relative; }
			.top-rightside-wrap { text-align: right; margin: 0 64px 30px 0; height: 50px; line-height: 50px; }
			.top-home-wrap { display: flex; align-items: center; margin: 20px; }
			.home-btn { flex: 1; }
			.search-wrap { flex: 1; }
			.icon-wrap { text-align: right; flex: 1; }
			.header-wrap { width: 100%; }
			.menu-wrap { float: right; width: 280px; }

			.content-wrap { margin-top: 64px; }
			.children-wrap { min-height: 380px; background-color: white; }

			.footer-wrap { text-align: center; }
			`}</style>
		</div>
	);
};

export default ContentWrap;