import axios from "axios";

const API = axios.create({
	baseURL : 'https://bank-api.d-leaf.kr',
	headers : {
		'Content-Type' : 'application/json', 
		'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJ4MTR4M25lY2R0IiwiaXNzIjoia2tvdGZhcm0iLCJzdWIiOiJhY2Nlc3MiLCJleHAiOjE2NjMzODE5MzEsImlhdCI6MTY2MzI5NTUzMX0.ou1okGrCdzWq3N77vbNPO_ToGHi8TNsHq33cINVaYYw'
	}
});

export default API;