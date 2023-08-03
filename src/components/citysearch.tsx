//imports
import React, { useEffect,useState } from 'react';
import Location, { Coordinates, Address } from "./location";
import { Link } from 'react-router-dom';
import "../static/citysearch.css";

//defined types
export type City ={
  text: string;
  link: string;
}
function CitySearch  () {
    //defining the API link
  const targetURL = 'https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.54049434254868&lng=73.94665578842162&page_type=DESKTOP_WEB_LISTING';
  const proxyURL = 'https://api.allorigins.win/raw?url=';
  const finalURL = proxyURL + encodeURIComponent(targetURL);

  // define state
  const [cities, setCities] = useState<City[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  //fetching the city names from the API using useEffect
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
        //save all the cities in the state

        setCities(cities);
        // console.log("cities",cities);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [finalURL]);

  //search query for city name
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  //to fetch the current location of the user
  const handleLocationSelect = (location: Coordinates, address: Address) => {
    setSearchQuery(address.city);
  };

  // saving the search query in local storage
  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
  }, [searchQuery]);


  return (
    <div className='citysearch'>
      <div className='cityp'>
      <p >Search for a City</p>
      </div>
      <div className="containerforcity">
 {/* get the city list from fetching the data and shown as a selectbox, we can also type the names of cities */}
      <input
        type="text"
        list="cities"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a city..."
      />
      {/* List of cities */}
      {cities && cities.length > 0 && (
        <datalist id="cities">
          {cities.map((city, index) => (
            <option key={index} value={city.text} />
          ))}
        </datalist>
      )}
{/* get current location */}
      <Location onLocationSelect={handleLocationSelect} />
</div>
{/* route the page to the next page(restaurant and cuisine page) */}
      <Link to={`/city/${encodeURIComponent(searchQuery)}`} className='link-style'> Go to restaurants</Link>
    </div>
  );
};

export default CitySearch;


