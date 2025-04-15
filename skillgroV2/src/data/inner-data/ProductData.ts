interface DataType {
   id: number;
   thumb: string;
   tag?: string;
   hot_product?: string;
   title: string;
   rating: number;
   old_price?: number;
   price: number;
   category: string;
   language: string;
   price_type: string;
   quantity?: number;
};

const product_data: DataType[] = [
   {
      id: 1,
      thumb: "/assets/img/shop/shop_img01.jpg",
      tag: "Sale",
      title: "Garden Adeline Life",
      rating: 5,
      old_price: 19,
      price: 13,
      category: "Art & Design",
      language: "Arabic",
      price_type: "Paid",
      quantity: 1,
   },
   {
      id: 2,
      thumb: "/assets/img/shop/shop_img02.jpg",
      title: "Time to Explore",
      rating: 4.5,
      price: 19,
      category: "Business",
      language: "Spanish",
      price_type: "Free"
   },
   {
      id: 3,
      thumb: "/assets/img/shop/shop_img03.jpg",
      tag: "Sale",
      title: "Wildlife Adventure",
      rating: 4.3,
      old_price: 39,
      price: 29,
      category: "Data Science",
      language: "English",
      price_type: "Paid"
   },
   {
      id: 4,
      thumb: "/assets/img/shop/shop_img04.jpg",
      hot_product: "Hot!",
      title: "Ketut Susilo Sky",
      rating: 5,
      price: 16,
      category: "Development",
      language: "Bangla",
      price_type: "Paid"
   },
   {
      id: 5,
      thumb: "/assets/img/shop/shop_img05.jpg",
      tag: "Sale",
      title: "The Illusion Design",
      rating: 3,
      old_price: 39,
      price: 29,
      category: "Finance",
      language: "Arabic",
      price_type: "Free"
   },
   {
      id: 6,
      thumb: "/assets/img/shop/shop_img06.jpg",
      tag: "Sale",
      title: "The Fashion Edits",
      rating: 5,
      price: 39,
      category: "Health & Fitness",
      language: "English",
      price_type: "Paid"
   },
   {
      id: 7,
      thumb: "/assets/img/shop/shop_img07.jpg",
      tag: "Sale",
      title: "The Business Women",
      rating: 3,
      old_price: 32,
      price: 19,
      category: "Lifestyle",
      language: "Bangla",
      price_type: "Free"
   },
   {
      id: 8,
      thumb: "/assets/img/shop/shop_img08.jpg",
      title: "Online Makeup Tutorial",
      rating: 4,
      price: 49,
      category: "Business",
      language: "Spanish",
      price_type: "Paid"
   },
   {
      id: 9,
      thumb: "/assets/img/shop/shop_img09.jpg",
      hot_product: "Hot!",
      title: "The Bad Feelings",
      rating: 4.8,
      old_price: 69,
      price: 49,
      category: "Design",
      language: "English",
      price_type: "Free"
   },
   {
      id: 10,
      thumb: "/assets/img/shop/shop_img06.jpg",
      tag: "Sale",
      title: "The Illusion Design",
      rating: 3,
      old_price: 39,
      price: 29,
      category: "Finance",
      language: "Arabic",
      price_type: "Free"
   },
   {
      id: 11,
      thumb: "/assets/img/shop/shop_img07.jpg",
      tag: "Sale",
      title: "The Fashion Edits",
      rating: 5,
      price: 39,
      category: "Health & Fitness",
      language: "English",
      price_type: "Paid"
   },
   {
      id: 12,
      thumb: "/assets/img/shop/shop_img08.jpg",
      tag: "Sale",
      title: "The Business Women",
      rating: 3,
      old_price: 32,
      price: 19,
      category: "Lifestyle",
      language: "Bangla",
      price_type: "Free"
   },
   {
      id: 13,
      thumb: "/assets/img/shop/shop_img09.jpg",
      title: "Online Makeup Tutorial",
      rating: 4,
      price: 49,
      category: "Business",
      language: "Spanish",
      price_type: "Paid"
   },
   {
      id: 14,
      thumb: "/assets/img/shop/shop_img01.jpg",
      hot_product: "Hot!",
      title: "The Bad Feelings",
      rating: 2,
      old_price: 69,
      price: 49,
      category: "Design",
      language: "English",
      price_type: "Free"
   },
   {
      id: 15,
      thumb: "/assets/img/shop/shop_img02.jpg",
      tag: "Sale",
      title: "Garden Adeline Life",
      rating: 4,
      old_price: 19,
      price: 13,
      category: "Art & Design",
      language: "Arabic",
      price_type: "Paid"
   },
   {
      id: 16,
      thumb: "/assets/img/shop/shop_img03.jpg",
      title: "Time to Explore",
      rating: 4.5,
      price: 19,
      category: "Business",
      language: "Spanish",
      price_type: "Free"
   },
   {
      id: 17,
      thumb: "/assets/img/shop/shop_img04.jpg",
      tag: "Sale",
      title: "Wildlife Adventure",
      rating: 4.3,
      old_price: 39,
      price: 29,
      category: "Data Science",
      language: "English",
      price_type: "Paid"
   },
   {
      id: 18,
      thumb: "/assets/img/shop/shop_img05.jpg",
      hot_product: "Hot!",
      title: "Ketut Susilo Sky",
      rating: 5,
      price: 16,
      category: "Development",
      language: "Bangla",
      price_type: "Paid"
   },
   {
      id: 19,
      thumb: "/assets/img/shop/shop_img05.jpg",
      tag: "Sale",
      title: "Garden Adeline Life",
      rating: 4,
      old_price: 19,
      price: 13,
      category: "Art & Design",
      language: "Arabic",
      price_type: "Paid"
   },
   {
      id: 20,
      thumb: "/assets/img/shop/shop_img03.jpg",
      title: "Time to Explore",
      rating: 4.5,
      price: 19,
      category: "Business",
      language: "Spanish",
      price_type: "Free"
   },
   {
      id: 21,
      thumb: "/assets/img/shop/shop_img06.jpg",
      tag: "Sale",
      title: "Wildlife Adventure",
      rating: 1,
      old_price: 39,
      price: 29,
      category: "Data Science",
      language: "English",
      price_type: "Paid"
   },
   {
      id: 22,
      thumb: "/assets/img/shop/shop_img09.jpg",
      hot_product: "Hot!",
      title: "Ketut Susilo Sky",
      rating: 2,
      price: 16,
      category: "Development",
      language: "Bangla",
      price_type: "Paid"
   },
];

export default product_data;