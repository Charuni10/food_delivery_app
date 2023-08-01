import React, { useEffect,useState } from 'react';
import Location, { Coordinates, Address } from "./location";
import { Link } from 'react-router-dom';
import "../static/citysearch.css";

export type City ={
  text: string;
  link: string;
}

const CitySearch = () => {
  const targetURL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.54049434254868&lng=73.94665578842162&page_type=DESKTOP_WEB_LISTING';
  const proxyURL = 'https://api.allorigins.win/raw?url=';
  const finalURL = proxyURL + encodeURIComponent(targetURL);

  const [cities, setCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(finalURL);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        // console.log(data);
        const eleventhCard = data.data.cards[11].card;
        // console.log("Card",eleventhCard);
        const cities=eleventhCard.card.cities;
        setCities(cities);
        // console.log("cities",cities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleLocationSelect = (location: Coordinates, address: Address) => {
    setSearchQuery(address.city);
  };

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);

  return (
    <div className='citysearch'>
      <div className='cityp'>
      <p >Search for a City</p>
      </div>
      <div className="containerforcity">

      <input
        type="text"
        list="cities"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a city..."
      />
      {cities && cities.length > 0 && (
        <datalist id="cities">
          {cities.map((city, index) => (
            <option key={index} value={city.text} />
          ))}
        </datalist>
      )}

      <Location onLocationSelect={handleLocationSelect} />
</div>
      <Link to={`/city/${encodeURIComponent(searchQuery)}`} className='link-style'> Go to restaurants</Link>
    </div>
  );
};

export default CitySearch;


