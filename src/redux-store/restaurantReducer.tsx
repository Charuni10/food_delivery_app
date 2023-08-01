import { Restaurant } from '../components/cuisinesearch';
import { RestaurantActionTypes, FETCH_RESTAURANTS } from './restaurantAction';

interface RestaurantState {
  restaurantArray: Restaurant[];
}

const initialState: RestaurantState = {
  restaurantArray: [],
};

const restaurantReducer = (state = initialState, action: RestaurantActionTypes): RestaurantState => {
  switch (action.type) {
    case FETCH_RESTAURANTS:
      return {
        ...state,
        restaurantArray: action.payload,
      };
    default:
      return state;
  }
};

export default restaurantReducer;
