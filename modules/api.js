import axios from 'axios';

const API = axios.create({
	baseURL : 'https://bank-api.d-leaf.kr',
	headers : {
		'Content-Type' : 'application/json', 
		'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJzdWltaHIyaXV0IiwiaXNzIjoia2tvdGZhcm0iLCJzdWIiOiJhY2Nlc3MiLCJleHAiOjE2NjM5Nzk1MDMsImlhdCI6MTY2Mzg5MzEwM30.FbTuuH2qGtK7oUI0rcvO3xG9dNJ1ldb-Ha94ddXVcBI'
	}
});

export default API;