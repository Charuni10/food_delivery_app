// imports
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../static/restaurant.css";

// import images for cuisines
import pizza from "../images/pizza.jpg";
import chinese from "../images/chinese.jpg";
import northIndian from "../images/north.jpg";
import pureVeg from "../images/veg.jpg";
import cakes from "../images/cake.jpg";
import asian from "../images/asian.jpg";

// defined types
interface RestaurantSearchProps {
  coordinates: { latitude: number; longitude: number; };
}

export type Restaurant = {
  id: string;
  name: string;
  avgRatingString: string;
  costForTwo: string;
  locality: string;
  areaName: string;
  cuisines: string[];
  totalRatingsString: string;
};


// array for cuisine
const cuisineCollection = [
  { name: 'Chinese', str: 'Chinese' ,img:chinese},
  { name: 'North Indian', str: 'North%20Indian' ,img:northIndian},
  { name: 'South Indian', str: 'South%20Indian',img:pureVeg },
  {name:'Desserts',str:'Desserts',img:cakes},
  {name:'Fast Food',str:'Fast%20Food',img:pizza},
  {name:'Asian',str:'Asian',img:asian}
];

//function
const RestaurantSearch: React.FC<RestaurantSearchProps> = ({ coordinates }) => {
 //defining the API link with fetching the latitude and longitude for each cities
  const targetURL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${coordinates.latitude}&lng=${coordinates.longitude}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
  const proxyURL = 'https://api.allorigins.win/raw?url=';
  const finalURL = proxyURL + encodeURIComponent(targetURL);
  // console.log(targetURL)

  // defined state
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);


  useEffect(() => {
  //  fetching the data about famous restaurants
    
    const fetchData = async () => {
      try {
        const response = await fetch(finalURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log(data);
        const famousRestaurant = data.data.cards[5].card.card.gridElements.infoWithStyle.restaurants;
        // console.log(famousRestaurant );
        // add the restaurant list as an array
        setRestaurants(
            famousRestaurant.map((restaurant: any) => ({
            id: restaurant.info.id,
            name: restaurant.info.name,
            avgRatingString: restaurant.info.avgRatingString,
            costForTwo: restaurant.info.costForTwo,
            locality: restaurant.info.locality,
            areaName: restaurant.info.areaName,
            cuisines: restaurant.info.cuisines,
            totalRatingsString: restaurant.info.totalRatingsString,
          }))
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [finalURL,coordinates.latitude, coordinates.longitude]);

// this function is to scroll the cards of restaurant list and moves the cards forward and backwards
  const scroll = (step: number) => {
    const container = document.querySelector('.card-container');
    if (container) {
      const cardWidth = container.clientWidth;
      const scrollOffset = step * cardWidth;
      container.scrollLeft += scrollOffset;
      setCurrentIndex((prevIndex) => prevIndex + step);
    }
  };


  return (
    <div>
      <h2 className='text-fam'>Famous Restaurants</h2>
      <div className="scroll-container">
        <div className="scroll-button left" onClick={() => scroll(-1)}>
          &lt;
        </div>
        {/* restaurant list displayed as cards*/}
       <div  className="card-container">
          {restaurants.map((restaurant: Restaurant, index: number) => (
            <div className="card" key={index}>
              {/* renders the next page(menu) and also sends the restaurant id, latitude and longitude */}
               <Link to={`/menu/${encodeURIComponent(restaurant.id)}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`}  >
              <h3>{restaurant.name}</h3>
              <p>Avg. Rating: {restaurant.avgRatingString}</p>
              <p>Cost for Two: {restaurant.costForTwo}</p>
              <p>Locality: {restaurant.locality}</p>
              <p>Area: {restaurant.areaName}</p>
              <p>Cuisines: {restaurant.cuisines.join(', ')}</p>
              <p>Total Ratings: {restaurant.totalRatingsString}</p>
              </Link>
            </div>
          ))}
       </div>
        <div className="scroll-button right" onClick={() => scroll(1)}>
          &gt;
        </div>
      </div>
    </div>
  );
};

export default RestaurantSearch;

// get the list of cuisines
export const Cuisine : React.FC<RestaurantSearchProps> = ({ coordinates }) => {
  return (
    <div>
      <div className='cuisine-title'>
      <p>Cuisine</p>
      </div>
      <div className="grid-container">
        {/* view the list of cuisines and render the restaurant list page based on the cuisines */}
        {cuisineCollection.map((cuisine, index) => (
          <Link to={`/restaurantList/${encodeURIComponent(cuisine.str)}?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}`} key={index} className="card-c">
          <img src={cuisine.img} alt={cuisine.name} />
         <p>{cuisine.name}</p>
       </Link>
        ))}
    </div>
    </div>
  );
};


