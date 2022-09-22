function init(req, res) {
	// localhost shop_token 쿠키값 가져오기

	// 서버에서 전달받은 쿠키
	const sid_bank_cookie =res.headers['set-cookie'][0].split(' ')[0];
	console.log(sid_bank_cookie)

	// 서버에서 전달받은 쿠키와 기존 쿠키가 다르면 쿠키 변경

	// req.setCookie('shop_token', sid_bank_cookie)

	// localhost의 shop_token 쿠키에 sid_bank_cookie 저장

}

export default init;