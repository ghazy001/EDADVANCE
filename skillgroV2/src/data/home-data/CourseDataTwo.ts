interface DataType {
   id: number;
   page: string;
   thumb: string;
   tag?: string;
   review: string;
   title: string;
   desc?: string;
   price: number;
   lesson: string;
   student: number;
   language?: string;
   country?: string;
};

const course_data_two: DataType[] = [
   {
      id: 1,
      page: "home_3",
      thumb: "/assets/img/courses/h3_course_thumb01.jpg",
      tag: "Finance",
      review: "(4.8 Reviews)",
      title: "Web Development Master class & Certifications",
      price: 25,
      lesson: "Lessons 05",
      student: 22
   },
   {
      id: 2,
      page: "home_3",
      thumb: "/assets/img/courses/h3_course_thumb02.jpg",
      tag: "Marketing",
      review: "(4.8 Reviews)",
      title: "Learning Digital Marketing on Facebook",
      price: 44,
      lesson: "Lessons 05",
      student: 22
   },
   {
      id: 3,
      page: "home_3",
      thumb: "/assets/img/courses/h3_course_thumb03.jpg",
      tag: "Business",
      review: "(4.8 Reviews)",
      title: "Financial Analyst Training & Investing Course",
      price: 20,
      lesson: "Lessons 05",
      student: 22
   },
   {
      id: 4,
      page: "home_3",
      thumb: "/assets/img/courses/h3_course_thumb04.jpg",
      tag: "Economics",
      review: "(4.8 Reviews)",
      title: "Master The Fundamentals Of Math",
      price: 32,
      lesson: "Lessons 05",
      student: 22
   },

   // home_4

   {
      id: 1,
      page: "home_4",
      thumb: "/assets/img/courses/h4_course_thumb01.jpg",
      tag: "Advanced Yoga",
      review: "(4.8 Reviews)",
      title: "Yoga For Beginners",
      price: 25,
      lesson: "Lessons 0",
      student: 22
   },
   {
      id: 2,
      page: "home_4",
      thumb: "/assets/img/courses/h4_course_thumb02.jpg",
      tag: "Vinyasa",
      review: "(4.8 Reviews)",
      title: "Increased Flexibility",
      price: 20,
      lesson: "Lessons 09",
      student: 22
   },
   {
      id: 3,
      page: "home_4",
      thumb: "/assets/img/courses/h4_course_thumb03.jpg",
      tag: "Ashtanga",
      review: "(4.8 Reviews)",
      title: "Balance Body & Mind",
      price: 35,
      lesson: "Lessons 5",
      student: 22
   },
   {
      id: 4,
      page: "home_4",
      thumb: "/assets/img/courses/h4_course_thumb04.jpg",
      tag: "Kundalini",
      review: "(4.8 Reviews)",
      title: "Hatha Yoga Class",
      price: 22,
      lesson: "Lessons 08",
      student: 22
   },

   // home_5
   {
      id: 1,
      page: "home_5",
      thumb: "/assets/img/courses/h5_course_thumb01.jpg",
      review: "(4.8 Reviews)",
      title: "Mathematics Class",
      desc: "The foundation of the Monte areay ssori philosophy",
      price: 75,
      lesson: "08 - 10am",
      student: 1 - 5,
   },
   {
      id: 2,
      page: "home_5",
      thumb: "/assets/img/courses/h5_course_thumb02.jpg",
      review: "(4.8 Reviews)",
      title: "Pre-Nursery Class",
      desc: "The foundation of the Monte areay ssori philosophy",
      price: 62,
      lesson: "08 - 10am",
      student: 1 - 5,
   },
   {
      id: 3,
      page: "home_5",
      thumb: "/assets/img/courses/h5_course_thumb03.jpg",
      review: "(4.8 Reviews)",
      title: "Art & Creativity Class",
      desc: "The foundation of the Monte areay ssori philosophy",
      price: 84,
      lesson: "08 - 10am",
      student: 1 - 5,
   },
   {
      id: 4,
      page: "home_5",
      thumb: "/assets/img/courses/h5_course_thumb04.jpg",
      review: "(4.8 Reviews)",
      title: "Drawing Class",
      desc: "The foundation of the Monte areay ssori philosophy",
      price: 32,
      lesson: "08 - 10am",
      student: 1 - 5,
   },

   // home_six

   {
      id: 1,
      page: "home_6",
      thumb: "/assets/img/courses/h6_course_thumb01.jpg",
      review: "(4.8)",
      title: "Professional Tutor",
      desc: "The foundation of the Monte areay ssori philosophy",
      price: 75,
      lesson: "05",
      student: 22,
      language: "Russian",
      country: "English",
      tag: "Martiniza",
   },
   {
      id: 2,
      page: "home_6",
      thumb: "/assets/img/courses/h6_course_thumb02.jpg",
      review: "(4.8)",
      title: "Professional Tutor",
      desc: "The foundation of the Monte areay ssori philosophy",
      price: 99,
      lesson: "08",
      student: 15,
      language: "English",
      country: "German",
      tag: "Martiniza",
   },
   {
      id: 3,
      page: "home_6",
      thumb: "/assets/img/courses/h6_course_thumb03.jpg",
      review: "(4.8)",
      title: "Professional Tutor",
      desc: "The foundation of the Monte areay ssori philosophy",
      price: 80,
      lesson: "08",
      student: 29,
      language: "English",
      country: "Japan",
      tag: "Martiniza",
   },
   {
      id: 4,
      page: "home_6",
      thumb: "/assets/img/courses/h6_course_thumb04.jpg",
      review: "(4.8)",
      title: "Professional Tutor",
      desc: "The foundation of the Monte areay ssori philosophy",
      price: 65,
      lesson: "07",
      student: 30,
      language: "Russian",
      country: "Italy",
      tag: "Martiniza",
   },

   // home_7

   {
      id: 1,
      page: "home_7",
      thumb: "/assets/img/courses/h7_course_thumb01.jpg",
      review: "(4.8 Reviews)",
      title: "It Statistics Data Science And Business Analysis",
      price: 55,
      lesson: "05",
      student: 22,
      tag: "Finance",
   },
   {
      id: 2,
      page: "home_7",
      thumb: "/assets/img/courses/h7_course_thumb02.jpg",
      review: "(4.8 Reviews)",
      title: "It Statistics Data Science And Business Analysis",
      price: 70,
      lesson: "12",
      student: 200,
      tag: "Law",
   },
   {
      id: 3,
      page: "home_7",
      thumb: "/assets/img/courses/h7_course_thumb03.jpg",
      review: "(4.8 Reviews)",
      title: "It Statistics Data Science And Business Analysis",
      price: 50,
      lesson: "05",
      student: 102,
      tag: "Tax",
   },
   {
      id: 4,
      page: "home_7",
      thumb: "/assets/img/courses/h7_course_thumb04.jpg",
      review: "(4.8 Reviews)",
      title: "It Statistics Data Science And Business Analysis",
      price: 62,
      lesson: "05",
      student: 22,
      tag: "Investment",
   },
   {
      id: 5,
      page: "home_7",
      thumb: "/assets/img/courses/h7_course_thumb05.jpg",
      review: "(4.8 Reviews)",
      title: "It Statistics Data Science And Business Analysis",
      price: 15,
      lesson: "05",
      student: 22,
      tag: "HR Professional",
   },
   {
      id: 6,
      page: "home_7",
      thumb: "/assets/img/courses/h7_course_thumb06.jpg",
      review: "(4.8 Reviews)",
      title: "It Statistics Data Science And Business Analysis",
      price: 29,
      lesson: "05",
      student: 22,
      tag: "Tax",
   },
   {
      id: 7,
      page: "home_7",
      thumb: "/assets/img/courses/h7_course_thumb07.jpg",
      review: "(4.8 Reviews)",
      title: "It Statistics Data Science And Business Analysis",
      price: 40,
      lesson: "11",
      student: 500,
      tag: "Environment",
   },
   {
      id: 8,
      page: "home_7",
      thumb: "/assets/img/courses/h7_course_thumb08.jpg",
      review: "(4.8 Reviews)",
      title: "It Statistics Data Science And Business Analysis",
      price: 20,
      lesson: "60",
      student: 600,
      tag: "Business",
   },
];

export default course_data_two;
