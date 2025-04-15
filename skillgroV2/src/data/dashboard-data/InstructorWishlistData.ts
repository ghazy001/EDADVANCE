interface DataType {
   id: number;
   thumb: string;
   title: string;
   tag: string;
   avatar_thumb: string;
   avatar_name: string;
   review: string;
   skill: number;
   book: string;
   time: string;
   mortarboard: string;
   old_price: number;
   price: number;
}

const wishlist_data: DataType[] = [
   {
      id: 1,
      thumb: "/assets/img/courses/course_thumb01.jpg",
      title: "Financial Analyst Training & Investing Course",
      tag: "Business",
      avatar_thumb: "/assets/img/courses/course_author001.png",
      avatar_name: "Robert Fox",
      review: "(4.5 Reviews)",
      skill: 80,
      book: "05",
      time: "11h 20m",
      mortarboard: "22",
      old_price: 20,
      price: 10,
   },
   {
      id: 2,
      thumb: "/assets/img/courses/course_thumb02.jpg",
      title: "Learning JavaScript With Imagination",
      tag: "Mathematic",
      avatar_thumb: "/assets/img/courses/course_author002.png",
      avatar_name: "Hawkins",
      review: "(4.5 Reviews)",
      skill: 60,
      book: "10",
      time: "13h 10m",
      mortarboard: "99",
      old_price: 29,
      price: 9,
   },
   {
      id: 3,
      thumb: "/assets/img/courses/course_thumb03.jpg",
      title: "Learning JavaScript With Imagination",
      tag: "Development",
      avatar_thumb: "/assets/img/courses/course_author003.png",
      avatar_name: "David Millar",
      review: "(4.5 Reviews)",
      skill: 88,
      book: "05",
      time: "11h 20m",
      mortarboard: "22",
      old_price: 29,
      price: 20,
   },
   {
      id: 4,
      thumb: "/assets/img/courses/course_thumb04.jpg",
      title: "The Complete Graphic Design for Beginners",
      tag: "Design",
      avatar_thumb: "/assets/img/courses/course_author004.png",
      avatar_name: "Wilson",
      review: "(4.5 Reviews)",
      skill: 70,
      book: "60",
      time: "70h 45m",
      mortarboard: "202",
      old_price: 20,
      price: 15,
   },
   {
      id: 5,
      thumb: "/assets/img/courses/course_thumb05.jpg",
      title: "Learning JavaScript With Imagination",
      tag: "Data Science",
      avatar_thumb: "/assets/img/courses/course_author004.png",
      avatar_name: "Warren",
      review: "(4.5 Reviews)",
      skill: 95,
      book: "08",
      time: "18h 20m",
      mortarboard: "66",
      old_price: 29,
      price: 9,
   },
   {
      id: 6,
      thumb: "/assets/img/courses/course_thumb01.jpg",
      title: "Financial Analyst Training & Investing Course",
      tag: "Business",
      avatar_thumb: "/assets/img/courses/course_author001.png",
      avatar_name: "Robert Fox",
      review: "(4.5 Reviews)",
      skill: 80,
      book: "05",
      time: "11h 20m",
      mortarboard: "22",
      old_price: 20,
      price: 10,
   },

];

export default wishlist_data;