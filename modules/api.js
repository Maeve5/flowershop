import axios from 'axios';

const API = axios.create({
	baseURL : 'https://bank-api.d-leaf.kr',
	headers : {
		'Content-Type' : 'application/json', 
		'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJlYWE5ZzV6bGR5IiwiaXNzIjoia2tvdGZhcm0iLCJzdWIiOiJhY2Nlc3MiLCJleHAiOjE2NjQzMjUxNjUsImlhdCI6MTY2NDIzODc2NX0.BoHmPdVOc6vDdkuYJlyXyrQ-qJwCI2eFL7a0X1klJ7w'
	}
});

export default API;