import { Restaurant } from "../components/cuisinesearch";

export const FETCH_RESTAURANTS = 'FETCH_RESTAURANTS';

interface FetchRestaurantsAction {
  type: typeof FETCH_RESTAURANTS;
  payload: Restaurant[];
}

export type RestaurantActionTypes = FetchRestaurantsAction;


export const fetchRestaurants = (restaurants: Restaurant[]): RestaurantActionTypes => {
  return {
    type: FETCH_RESTAURANTS,
    payload: restaurants,
  };
};




