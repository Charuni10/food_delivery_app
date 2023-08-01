import { createStore, combineReducers } from 'redux';
import restaurantReducer from './restaurantReducer';

const rootReducer = combineReducers({
  restaurant: restaurantReducer,
});

const store = createStore(rootReducer);

export default store;
