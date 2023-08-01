import { useParams } from "react-router";
import { Header } from "../components/header";
import RestaurantSearch, { Cuisine } from "../components/cuisinesearch";
import { useEffect, useState } from "react";
import axios from "axios";
import { Footer } from "../components/footer";

export function City() {
  const { searchQuery } = useParams();
  const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    console.log('Search Query in Next Page:', searchQuery);

    const getCityCoordinates = async (query: string) => {
      const apiKey = "HmAcUkhHQ8icq1_0Za9y_AzZgy5-_DlWf7NDa3fofvs";
      const geocodingApiUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(query)}&apiKey=${apiKey}`;

      try {
        const response = await axios.get(geocodingApiUrl);
        const { items } = response.data;

        if (items.length > 0) {
          const { position } = items[0];
          console.log(position);
          return {
            latitude: position.lat,
            longitude: position.lng,
          };
        } else {
          throw new Error('City not found');
        }
      } catch (error) {
        console.error('Error fetching city coordinates:', error);
        return null;
      }
    };

    if (searchQuery) {
      getCityCoordinates(searchQuery).then((coords) => {
        if (coords) {
          console.log('City Coordinates:', coords);
          setCoordinates(coords);
        }
      });
    }
  }, [searchQuery]);

  return (
    <div>
      <Header />
      <RestaurantSearch  coordinates={coordinates}/>
      <Cuisine coordinates={coordinates}/>
      <Footer/>
    </div>
  );
}
