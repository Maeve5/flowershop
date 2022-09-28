import axios from 'axios';

const API = axios.create({
	baseURL : 'https://bank-api.d-leaf.kr',
	headers : {
		'Content-Type' : 'application/json', 
		'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJ6cG56d3RmdHd1IiwiaXNzIjoia2tvdGZhcm0iLCJzdWIiOiJhY2Nlc3MiLCJleHAiOjE2NjQ0MTE3NjUsImlhdCI6MTY2NDMyNTM2NX0.UehcwDr8Ql1HZPxDxn2ofeg157lc8MllGdePj6eoTos'
	}
});

export default API;