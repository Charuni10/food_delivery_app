import React, { Dispatch, useEffect, useState } from 'react';
import { Restaurant } from './cuisinesearch';
import '../static/restaurant.css';
import { Link, useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../redux-store/restaurantAction';
import { useLocation } from 'react-router-dom';
import { RestaurantActionTypes } from '../redux-store/restaurantAction';



export function RestaurantList() {
 const location=useLocation();
  const { cuisineStr } = useParams();
  const [cuisine, setCuisine] = useState('');

  useEffect(() => {
    if(cuisineStr){
    const decodedCuisineStr = decodeURIComponent(cuisineStr);
    setCuisine(decodedCuisineStr);
    }
  }, [cuisineStr]);

  const queryParams = new URLSearchParams(location.search);
  const latitude = queryParams.get('latitude') || 0;
  const longitude = queryParams.get('longitude') || 0;


console.log("Cuisine",cuisine)
const targetURL = `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${latitude}&lng=${longitude}&str=${cuisine}&trackingId=0bea61db-fb94-0ff9-10cb-c9d9248fcac2&submitAction=ENTER&queryUniqueId=5815ddb6-7394-1e06-7743-fa4e0d107816`;
const proxyURL = 'https://api.allorigins.win/raw?url=';
const finalURL = proxyURL + encodeURIComponent(targetURL);
  const [restaurantArray, setRestaurantArray] = useState<Restaurant[]>([]);
console.log(targetURL)
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(finalURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        const restaurantCards = data?.data?.cards[1]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards;
        console.log(restaurantCards);

        if (Array.isArray(restaurantCards) && restaurantCards.length > 0) {
          const restaurantData: Restaurant[] = restaurantCards.map((restaurant: any) => ({
            id: restaurant.card.card.info.id,
            name: restaurant.card.card.info.name,
            avgRatingString: restaurant.card.card.info.avgRatingString,
            costForTwo: restaurant.card.card.info.costForTwo,
            locality: restaurant.card.card.info.locality,
            areaName: restaurant.card.card.info.areaName,
            cuisines: restaurant.card.card.info.cuisines,
            totalRatingsString: restaurant.card.card.info.totalRatingsString,
          }));
          setRestaurantArray(restaurantData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRestaurants();
  }, [cuisine]);
  const handleSearch = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();

    const filteredRestaurants = restaurantArray.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(lowerCaseQuery)
    );
  
    setRestaurantArray(filteredRestaurants);
  };
  

  return (
    <div>
      <div className='cuisine-title'>
<p>Restaurants with {cuisine} foods</p>
<input className='input-rest'
  type="text"
  onChange={(e) => handleSearch(e.target.value)}
  placeholder="Search for restaurants"
/>

      </div>
      <div className="grid-container">
        {restaurantArray.map((restaurant, index) => (
            <Link to={`/menu/${encodeURIComponent(restaurant.id)}?latitude=${latitude}&longitude=${longitude}`}  className='card-c' key={index}>
            <h3>{restaurant.name}</h3>
            <p>Avg. Rating: {restaurant.avgRatingString}</p>
            <p>Cost for Two: {restaurant.costForTwo}</p>
            <p>Locality: {restaurant.locality}</p>
            <p>Area: {restaurant.areaName}</p>
            <p>Cuisines: {restaurant.cuisines.join(', ')}</p>
            <p>Total Ratings: {restaurant.totalRatingsString}</p>
        
          </Link>
        ))}
       
      </div>

     
    </div>
  );
}

interface RootState {
  filteredRestaurants: any;
  restaurant: {
    restaurantArray: Restaurant[];
    filteredRestaurants: Restaurant[];
  };
}



const mapStateToProps = (state: RootState) => {
  return {
    restaurantArray: state.restaurant.restaurantArray,
  };
};


const mapDispatchToProps = (dispatch: Dispatch<RestaurantActionTypes>) => {
  return {
    fetchRestaurants: (restaurants: Restaurant[]) => dispatch(fetchRestaurants(restaurants)),
  };
};


const connector = connect(mapStateToProps, mapDispatchToProps);


export default connector(RestaurantList);

