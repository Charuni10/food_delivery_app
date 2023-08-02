import { useEffect, useState } from "react";
import "../static/menu.css";
import Modal from "react-modal";
import { Header } from "../components/header";
import { useLocation, useParams } from "react-router";
import { Restaurant } from "../components/cuisinesearch";

export interface MenuItem {
  title: string;
  itemCards: ItemCard[];
}

export interface ItemCard {
  card: {
    info: {
      category: string;
      description: string;
      rate: number;
    };
  };
}


export function Menu() {
  const {  latitude, longitude,rest_id } = useParams();
  const [restId, setRestId] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const latParam = queryParams.get('latitude');
  const longParam = queryParams.get('longitude');
console.log(latParam,longParam)
  useEffect(() => {
    if (rest_id) {
      const decodedCuisineStr = decodeURIComponent(rest_id);
      setRestId(decodedCuisineStr);
    }
  }, [restId]);


console.log(restId,"YEs")
const [totalCost, setTotalCost] = useState<number>(0);
const [restaurants, setRestaurants] = useState<Restaurant | undefined>(undefined);

  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cartItems, setCartItems] = useState<MenuItem[]>([]);
  const [showCart, setShowCart] = useState(false);    
  const targetURL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${latParam}&lng=${longParam}&restaurantId=${restId}&catalog_qa=undefined&submitAction=ENTER`;

  const proxyURL = 'https://api.allorigins.win/raw?url=';
  const finalURL = proxyURL + encodeURIComponent(targetURL);
  console.log(targetURL)
  
  const fetchData = async () => {
    try {
      const response = await fetch(finalURL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
      const rest_details=data.data.cards[0].card.card.info;
      console.log(rest_details);
      const data_rest: Restaurant = {
        id: rest_details.id,
        name: rest_details.name,
        avgRatingString: rest_details.avgRatingString,
        costForTwo: rest_details.costForTwo,
        locality: rest_details.locality,
        areaName: rest_details.areaName,
        cuisines: rest_details.cuisines,
        totalRatingsString: rest_details.totalRatingsString,
      };
            setRestaurants(data_rest);

    
      const menuItems: MenuItem[] = [];
      const datares = data.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards;
      // console.log(datares);
      for(let i=1;i<datares.length;i++){
        const title=datares[i].card.card?.title;
        console.log(title);
        const itemCards: ItemCard[] = [];
        const menulist=datares[i].card.card.itemCards;
        // console.log(menulist)
        if (menulist?.length>0){
        for(let j=0;j<menulist.length;j++){
          const itemname=menulist[j].card.info.name;
          const itemprice=(menulist[j].card.info.price)/100;
          const itemdescription=menulist[j].card.info.description;
          // console.log(itemname,itemprice,itemdescription)
          const itemCard: ItemCard = {
            card: {
              info: {
                category: itemname,
               rate: itemprice,
                description: itemdescription,
              },
            },
          };

          itemCards.push(itemCard);
        }
        const menuItem: MenuItem = {
          title: title || 'Menu', 
          itemCards: itemCards,
        };
        
        menuItems.push(menuItem);

      }
      setMenu(menuItems);
     
      
    }
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  }; useEffect(() => {
    fetchData();
  }, [restId,latParam,longParam]);



  const handleAddToCart = (menuItem: MenuItem, itemIndex: number) => {
    const selectedItem: MenuItem = {
      title: menuItem.title,
      itemCards: [menuItem.itemCards[itemIndex]],
    };
    setCartItems((prevCartItems) => [...prevCartItems, selectedItem]);
    setTotalCost((prevTotal) => prevTotal + menuItem.itemCards[itemIndex].card.info.rate);

  };
  const handleRemoveFromCart = (itemIndex: number) => {
    setCartItems((prevCartItems) => {
      const updatedCart = [...prevCartItems];
      const removedItemRate = updatedCart[itemIndex].itemCards[0].card.info.rate;
      updatedCart.splice(itemIndex, 1);
      setTotalCost((prevTotal) => prevTotal - removedItemRate);
      return updatedCart;
    });
  };
  
  const handleToggleCart = () => {
    setShowCart(!showCart);
  };
  const handleToggleClose = () => {
    setShowCart(false);
  };
  return (
    <div >
      <Header/>
    <div className="menu-scroll">
      <p  className="menu-title">Menu</p>
      <button className="btn" onClick={handleToggleCart}>View Cart</button>
      </div>
      <div className="rest-details">
      {restaurants && (
          <>
            <h3>{restaurants.name}</h3>
            <p>Avg. Rating: {restaurants.avgRatingString}</p>
            <p>Cost for Two: {restaurants.costForTwo}</p>
            <p>Locality: {restaurants.locality}</p>
            <p>Area: {restaurants.areaName}</p>
            <p>Cuisines: {restaurants.cuisines.join(', ')}</p>
            <p>Total Ratings: {restaurants.totalRatingsString}</p>
          </>
        )}
      </div>
      <div className="menu-container">

    {menu.map((menuItem, index) => (
        <div className="menu-item" key={index}>
          <h3 className="menu-item-title">{menuItem.title}</h3>
          {menuItem.itemCards.map((itemCard, itemIndex) => (
            <div className="item-card" key={itemIndex}>
              <h4 className="item-category">{itemCard.card.info.category}</h4>
              <p className="item-description">{itemCard.card.info.description}</p>
              <p className="item-rate">Rate: {itemCard.card.info.rate}</p>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(menuItem, itemIndex)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ))}
      
      
      {showCart && (
         <Modal isOpen={showCart}>
        <div >
          <h2 className="cart-title">Cart</h2>
          <h3>Total Cost: {totalCost}</h3>
          {cartItems.map((item, index) => (
            <div className="cart-box"key={index}>
              <h3>{item.title}</h3>
              {item.itemCards.map((itemCard, cardIndex) => (
                <div key={cardIndex}>
                  <p>{itemCard.card.info.category}</p>
                  <p>{itemCard.card.info.description}</p>
                  <p>Rate: {itemCard.card.info.rate}</p>
                </div>
                
              ))}
               <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
            </div>
          ))}
           <button className="btn" onClick={handleToggleClose}>Close</button>
        </div>
       
        </Modal>
      )}
      </div>
      
    </div>

  );
}

