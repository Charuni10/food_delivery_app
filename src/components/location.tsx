// imports
import  { useState,useEffect } from "react";
import axios from "axios";

//declare types
export type Coordinates = {
  latitude: number;
  longitude: number;
};

export type Address = {
  label: string;
  country: string;
  city: string;
  postalCode: string;
};

type LocationProps = {
  onLocationSelect: (location: Coordinates, address: Address) => void;
};


function Location({ onLocationSelect }: LocationProps) {
  // declare states
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);
// use HERE Maps API to get longitude and latitude of the user
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        setError("Error getting location: " + error.message);
      }
    );
  };
// Using the API to get the total address of the user when they click current location
  const getAddress = async () => {
    if (location) {
      try {
        const response = await axios.get(
          `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${location.latitude},${location.longitude}&apiKey=HmAcUkhHQ8icq1_0Za9y_AzZgy5-_DlWf7NDa3fofvs`
        );
  
        console.log("Response:", response.data);
  // getting the city,country, postal code and address using the latitude and longitude
        const { items } = response.data;
        if (items && items.length > 0) {
          const { title, address,country } = items[0];
          setAddress({
            label: title|| "",
            country: country || "",
            city: address.city || "",
            postalCode: address.postalCode || "",
          });
        } else {
          setError("No address found");
        }
      } catch (error) {
        console.error("Error fetching address:", error);
        setError("Error fetching address");
      }
    }
  };
  
useEffect(()=>{
  getAddress()
},[location]);

// sends the location to the page
const handleLocationSelect = () => {
  if (location && address) {
    onLocationSelect(location, address);
  }
};

  return (
    <div>
       <button onClick={() => {
          getCurrentLocation();
          getAddress();
          handleLocationSelect();
          }} >
        Get Current Location 
      </button>
      </div>
      ) 
}

export default Location;
