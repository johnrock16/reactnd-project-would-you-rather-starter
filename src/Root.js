import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import store from './reducer/store';

const Root= ()=>(
    <Provider store={store}>
        <App/>
    </Provider>
)

export default Root;