import React from 'react';
import ContentWrap from '../components/ContentWrap';


function result() {
	return (
		<ContentWrap>
			<div>
				<h2>주문 완료</h2>
				<div>
					
				</div>
			</div>

			<style jsx>{`
			h2 { font-size: 50px; }
			`}</style>
		</ContentWrap>
	);
};

export default React.memo(result);
