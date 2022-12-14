import React from 'react';
import { Layout, Space, Input, Menu, Button } from 'antd';
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import router from 'next/router';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

function ContentWrap({ children }) {
	// 검색
	const onSearch = (e) => {
		alert(e);
	}

	return (
		<div className='layout'>
			<Layout style={{ background: 'white' }}>
				<div className='top-layout-wrap'>
					<div className='top-wrap'>
						<div className='top-rightside-wrap'>
							<div className='newuser'>회원가입</div>
							<div className='login'>로그인</div>
							<div className='usercenter'>고객센터</div>
						</div>
						<div className='top-home-wrap'>
							<div className='home-btn'>
								<Button
									type='link'
									size='large'
									style={{color: 'rgb(0, 122, 79)', backgroundColor: 'none'}}
									icon={<HomeOutlined />}
									onClick={() => router.push('/')}
								/>
							</div>
							<div className='search-wrap'>
								<Space direction='vertical'>
									<Search
										placeholder='검색어를 입력해 주세요.'
										allowClear
										onSearch={onSearch}
										size='large'
										bordercolor='rgb(0, 122, 79)'
										style={{width: 360}}
									/>
								</Space>
							</div>
							<div className='icon-wrap'>
								<Button
									type='link'
									size='large'
									style={{color: 'rgb(0, 122, 79)', backgroundColor: 'none'}}
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
									style={{border: 'none'}}
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
							<Content style={{ background : 'white' }}>
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
			* { background-color: white; }
			.layout { margin: auto; }

			.top-layout-wrap { position: sticky; top: 0; margin: 0; z-index: 100; border-bottom: 1px solid #eee; box-shadow: 0px 1px 10px #eee; }
			.top-wrap { position: relative; margin-bottom: 20px; }
			.top-rightside-wrap { display: flex; justify-content: flex-end; margin: 0 64px 30px 0; height: 50px; line-height: 50px; }
			.top-rightside-wrap > div { margin-right: 8px; }
			.top-home-wrap { display: flex; align-items: center; margin: 0 auto; max-width: 720px; }
			.home-btn { flex: 1; }
			.search-wrap { flex: 1; }
			.icon-wrap { text-align: right; flex: 1; }
			.menu-wrap { margin: 0 auto; padding-left: 56px; width: 320px; }

			.content-wrap { margin: 64px auto; }
			.children-wrap { min-height: 380px; }

			.footer-wrap { text-align: center; }
			`}</style>
		</div>
	);
};

export default React.memo(ContentWrap);