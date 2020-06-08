import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
    form: formReducer
});

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;