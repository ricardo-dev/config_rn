React-Native Anotations

########################################## REDUX

view.js

import { connect } from 'react-redux';
(...)
class n extends Component {


	<Text> {this.props.counter } </Text>

	<TouchableOpacity onPress={this.props.funcao(obj={name:'R', age:27})}> ... </...>


}

function mapStateToProps(state){
	return {
		counter: state.counter, ..., 
	}
}

function mapDispatchToProps(dispatch){
	return {
		funcao : (obj) => dispatch({type:'FUNCAO', payload:obj}), ... , 	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(n);


middleware.js

const logger = ({getState, dispatch}) => next => action => {
	(...)
	action.type == 'FUNCAO'
	action.payload.nome
	(...)
}

export default logger


reducer.js

const initialState { counter:0, ..., }
const reducer = (state = initialState, action) => {
	
	if(action.type == 'FUNCAO'){
		...
		return { ...state, counter: action.payload.nome, ...}
	} else if ...
	
	return state;
}

export default reducer;

src/index.js

import React, {Component} from 'react';
import Routes || Main from './routes || ./pages/main';

import {createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import logger from './path_logger.js';
import reducer from './patg_reducer.js';

const store = createStore(reducer, applyMiddleware(logger));

class App extends Component {
	render(){
		return (
			<Provider store = {store}> <Routes || Main /> </Provider>
		);
	}
}

export default App;

########################################## REDUX and APIs

view.js

(...)
mapDispatchToProps(dispatch) {
	return {
		funcao : (obj) => api.post('...', obj, {Headers={"Content-Type":"application/json"}})
				.then((response)=> dispatch({type:'FUNCAP_POST', payload:response}))
				.catch((error) => dispatch({type:'ERROR'})), ... ,
	}
}

########################################## REDUX and AsyncStorage

reducer.js
import {AsyncStorage} from 'react-native';

const initialState = {
	token:'',
	nome:'',
	id:-1,
	endereco ... 
}

const reducer = (state = initialState, action) => {
	
	switch(action.type){
		case: 'SAVE_FUNCAO':
			AsyncStorage.setItem('@...:token', action.payload.token);
			(...)
			return { ...state, token: action.payload.token, (...) }
		case: 'INIT_APP':
			(...)
		case: 'REMOVE_FUNCAO':
			AsyncStorage.removeItem(".@...:token');
			return { ...state, token:'', nome:'', ...,}
	}
	return state;
}

########################################### axios config service/api.js

import axios from 'axios';
import { AsyncStorage } from 'react-native';

const api = axios.create({
  baseURL: 'http://ec2-18-231-45-167.sa-east-1.compute.amazonaws.com/multify',
  timeout: 10000,
});

api.interceptors.request.use(async (options)=>{
  const token = await AsyncStorage.getItem("@...:token");
  if(token){
    options.headers['Authorization'] = `Bearer ${token}`;
  }
  return options;
}, (error)=> {
  return Promise.reject(error);
});


export default api;

########################################### consumo API

import {api} form './path_service/api.js';
(...)

apiFunction = () => {
	await api.post ('url', params, {Header={} }).then(response => {}).catch(error => {});
	await api.get('url', {Header={}}).then(response => {}).catch(error => {});
}

apiRequestParam = () => {
	const params = new URLSearchParams();
	params.append('chave', valor);
	params.append('chave', valor);

	await api.post('url', params, {Header:{}});

	ou

	let url = 'url?x=1&y=w';
	await api.post(url, {Header:{}});
}

########################################### axios login OAUTH2

import {api} form './path_service/api.js';
(...)

authFunction = () => {
        let loginData = {
            'grant_type': 'password',
            'username': login,
            'password': senha
        };

        let auth = { username: 'USER', password: '******' }

        const formData = new FormData();
        formData.append('username', loginData.username)
        formData.append('password', loginData.password)
        formData.append('grant_type', loginData.grant_type)

        await api.post(
            'url',
            formData,
            {
                auth: auth,
                headers: { 'Content-Type': 'application/form-data' }
            })
            .then(res => {})
            .catch(err => {});
}
(...)

######################################

