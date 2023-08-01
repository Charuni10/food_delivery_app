import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import "../static/card.css";

export type Restaurant = {
  name: string;
  area: string;
  rating: number;
  distance: number;
  imageUrl: string;
};
type CardProps = {
  details: Restaurant[];
};

export function Card({ details }: CardProps) {
  return (
    <div>
      {details.map((restaurant) => (
        <div className="card" key={restaurant.name}>   

          <div className="card-image">
            <img src={restaurant.imageUrl} alt={restaurant.name} />
          </div>
          <div>
            <p className="card-title">{restaurant.name}</p>
            <p className="description">{restaurant.area}</p>
            <p className="description">{restaurant.rating}</p>
            <p className="description">{restaurant.distance}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

type CardHomeProps = {
  details:bestCity[];
};

 

interface bestCity {
  text: string;
  link: string;
}

export function CardHome() {
  const targetURL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.54049434254868&lng=73.94665578842162&page_type=DESKTOP_WEB_LISTING';
  const proxyURL = 'https://api.allorigins.win/raw?url=';
  const finalURL = proxyURL + encodeURIComponent(targetURL);

  const [bestcities, setBestCities] = useState<bestCity[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(finalURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Data",data);
        const seventhCard = data.data.cards[7].card;
        const cities = seventhCard.card.brands;
        const shuffledCities = cities.sort(() => 0.5 - Math.random());
        const randomCities = shuffledCities.slice(0, 20);

        setBestCities(randomCities.map((citi: { text: string; link: string; }) => ({
          text: citi.text,
          link: citi.link,
        })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="restp">
      <h5>Cities to look for</h5>
      </div>
      <div className="card-container-city">
      {bestcities.map((city, index) => (
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
