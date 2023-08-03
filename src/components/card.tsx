// imports
import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../static/card.css";

//defined types
export type Restaurant = {
  name: string;
  area: string;
  rating: number;
  distance: number;
  imageUrl: string;
};

interface bestCity {
  text: string;
  link: string;
}


export function CardHome() {
  //defining the API link
  const targetURL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.54049434254868&lng=73.94665578842162&page_type=DESKTOP_WEB_LISTING';
  const proxyURL = 'https://api.allorigins.win/raw?url=';
  const finalURL = proxyURL + encodeURIComponent(targetURL);

// define state
  const [bestcities, setBestCities] = useState<bestCity[]>([]);

  //fetching the city names from the API using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(finalURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log("Data",data);
        const seventhCard = data.data.cards[7].card;
        const cities = seventhCard.card.brands;
        //get random 20 cities and show it in the home page
        const shuffledCities = cities.sort(() => 0.5 - Math.random());
        const randomCities = shuffledCities.slice(0, 20);
        //save the cities in the state
        setBestCities(randomCities.map((citi: { text: string; link: string; }) => ({
          text: citi.text,
          link: citi.link,
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [finalURL]);
//return the cities fetched as cards
  return (
    <div>
      <div className="restp">
      <h5>Cities to look for</h5>
      </div>
      <div className="card-container-city">
      {bestcities.map((city, index) => (
        //route the link to next component(restaurant and cuisines list) with cityname
         <Link to={`/city/${encodeURIComponent(city.text)}`}  className="card-city">
        <div   key={index} >
          <p className="card-title">{city.text}</p>

        </div>
        </Link>
      ))}
      
      </div>

    </div>
  );
}
