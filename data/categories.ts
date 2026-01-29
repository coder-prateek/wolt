export interface Category {
  id: string;
  name: string;
  placesCount: number;
  image: any;
  price?: string;
}

export const categories: Category[] = [

  {
    id: 'cat_burger',
    name: 'Burger',
    placesCount: 26,
    image: require('@/assets/images/dummy/categories/burger.png'),
    price: "₹200",


  },
  {
    id: 'Pizza_1',
    name: 'Pizza',
    placesCount: 26,
    image: require('@/assets/images/dummy/categories/pizza.png'),
    price: "₹400",

  },
  {
    id: 'nuddles_1',
    name: 'Nuddles',
    placesCount: 26,
    image: require('@/assets/images/dummy/categories/nuddles.png'),
    price: "₹300",
  },
  {
    id: 'pasta_1',
    name: 'Pasta',
    placesCount: 26,
    image: require('@/assets/images/dummy/categories/pasta.png'),
    price: "₹250",
  },

];
