import {createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './swapi.co/reducers';

let store = createStore(rootReducer, composeWithDevTools());

export default store;
