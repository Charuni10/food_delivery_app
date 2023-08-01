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
  
  function getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const categories = [
    "Appetizers",
    "Main Course",
    "Desserts",
    "Beverages",
    "Salads",
    "Soups",
  ];
  
  function generateRandomFoodItem(): ItemCard {
    const category = categories[getRandomNumber(0, categories.length - 1)];
    const description = `Delicious ${category} Item`;
    const rate = getRandomNumber(100, 200); 
    return {
      card: {
        info: {
          category,
          description,
          rate,
        },
      },
    };
  }
  
  export function generateRandomMenuData(numItems: number): MenuItem[] {
    const menuData: MenuItem[] = [];
  
    for (let i = 0; i < numItems; i++) {
      const itemCards: ItemCard[] = [];
      const title = `Menu ${i + 1}`;
  
      for (let j = 0; j < 5; j++) {
        
        itemCards.push(generateRandomFoodItem());
      }
  
      menuData.push({
        title,
        itemCards,
      });
    }
  
    return menuData;
  }
  