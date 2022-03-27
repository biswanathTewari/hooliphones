import { v4 as uuid } from 'uuid'

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    title: 'hooli classX',
    subtitle: 'The best camera in the industry',
    price: '1,00,000',
    cost: 100000,
    prevPrice: '1,11,111',
    img: 'https://res.cloudinary.com/iambizan/image/upload/v1648316235/images/classX_htwnvz.jpg',
    onSale: false,
  },
  {
    _id: uuid(),
    title: 'hooli 11',
    subtitle: 'practically magic',
    price: '70,000',
    cost: 70000,
    prevPrice: '77,777',
    img: 'https://res.cloudinary.com/iambizan/image/upload/v1648316235/images/iphone11_zujv6i.jpg',
    onSale: false,
  },
  {
    _id: uuid(),
    title: 'hooli X',
    subtitle: 'classic edition',
    price: '80,000',
    cost: 80000,
    prevPrice: '88,888',
    img: 'https://res.cloudinary.com/iambizan/image/upload/v1648316236/images/iphone11white_rdrdck.jpg',
    onSale: true,
  },
  {
    _id: uuid(),
    title: 'hooli code',
    subtitle: 'gilfoyle edition',
    price: '65,000',
    cost: 65000,
    prevPrice: '72,222',
    img: 'https://res.cloudinary.com/iambizan/image/upload/v1648316235/images/coderspecial_hg5l5x.jpg',
    onSale: true,
  },
  {
    _id: uuid(),
    title: 'hooli ice',
    subtitle: 'make the world stare',
    price: '78,000',
    cost: 78000,
    prevPrice: '85,555',
    img: 'https://res.cloudinary.com/iambizan/image/upload/v1648316235/images/iceblue_o0sn7f.jpg',
    onSale: false,
  },
  {
    _id: uuid(),
    title: 'hooli sky',
    subtitle: 'cool as Erich Bachman',
    price: '90,000',
    cost: 90000,
    prevPrice: '1,00,000',
    img: 'https://res.cloudinary.com/iambizan/image/upload/v1648316236/images/skyblue_kepasu.jpg',
    onSale: true,
  },
  {
    _id: uuid(),
    title: 'hooli aviato edition',
    subtitle: 'takes you high',
    price: '50,000',
    cost: 50000,
    prevPrice: '57,777',
    img: 'https://res.cloudinary.com/iambizan/image/upload/v1648403140/images/hooliAviato_rrp1hq.jpg',
  },
  {
    _id: uuid(),
    title: 'pied piper edition',
    subtitle: 'only the worst device ever',
    price: '30,000',
    cost: 30000,
    prevPrice: '37,777',
    img: 'https://res.cloudinary.com/iambizan/image/upload/v1648403148/images/hoolipied_m3xwyu.jpg',
  },
  // {
  //   _id: uuid(),
  //   title: "",
  //   subtitle: "",
  //   price: "899",
  //   img:"",
  // },
]
