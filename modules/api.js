import axios from 'axios';

const API = axios.create({
	baseURL : 'https://bank-api.d-leaf.kr',
	headers : {
		'Content-Type' : 'application/json', 
		'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOiJ6d2d0MW9zbWdqIiwiaXNzIjoia2tvdGZhcm0iLCJzdWIiOiJhY2Nlc3MiLCJleHAiOjE2NjM4NDUwNzAsImlhdCI6MTY2Mzc1ODY3MH0.0JVcmQJ-xj2A1fWLME1-R_2bGDYVO8-QG1Ra2hOw7hI'
	}
});

export default API;