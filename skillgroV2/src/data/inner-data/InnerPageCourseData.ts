interface DataType {
   id: number;
   page: string;
   thumb: string;
   tag: string;
   review: string;
   title: string;
   author: string;
   price: number;
};

const inner_page_course_data: DataType[] = [
   {
      id: 1,
      page: "inner_1",
      thumb: "/assets/img/courses/course_thumb01.jpg",
      tag: "Development",
      review: "(4.8 Reviews)",
      title: "Learning JavaScript With Imagination",
      author: "David Millar",
      price: 15,
   },
   {
      id: 2,
      page: "inner_1",
      thumb: "/assets/img/courses/course_thumb02.jpg",
      tag: "Design",
      review: "(4.5 Reviews)",
      title: "The Complete Graphic Design for Beginners",
      author: "David Millar",
      price: 19,
   },
   {
      id: 3,
      page: "inner_1",
      thumb: "/assets/img/courses/course_thumb03.jpg",
      tag: "Marketing",
      review: "(4.3 Reviews)",
      title: "Learning Digital Marketing on Facebook",
      author: "David Millar",
      price: 24,
   },
   {
      id: 4,
      page: "inner_1",
      thumb: "/assets/img/courses/course_thumb04.jpg",
      tag: "Business",
      review: "(4.8 Reviews)",
      title: "Financial Analyst Training & Investing Course",
      author: "David Millar",
      price: 12,
   },
   {
      id: 5,
      page: "inner_1",
      thumb: "/assets/img/courses/course_thumb05.jpg",
      tag: "Data Science",
      review: "(4.5 Reviews)",
      title: "Data Analysis & Visualization Masterclass",
      author: "David Millar",
      price: 27,
   },
];

export default inner_page_course_data