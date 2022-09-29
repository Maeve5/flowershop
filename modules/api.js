import axios from 'axios';

const API = axios.create({
	baseURL : 'https://bank-api.d-leaf.kr',
	headers : {
		'Content-Type' : 'application/json', 
		'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJ5NHJiZGtyYzkyIiwiaXNzIjoia2tvdGZhcm0iLCJzdWIiOiJhY2Nlc3MiLCJleHAiOjE2NjQ1MDQ1ODAsImlhdCI6MTY2NDQxODE4MH0.ok4yQEkUfYusAMJe6WJ_px6vCYhuG4i7v-eESyMcqlI'
	}
});

export default API;