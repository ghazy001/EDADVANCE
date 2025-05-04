interface DataType {
   id: number,
   order_id: string;
   course_name: string;
   date: string;
   price: number;
   status: string;
   status_class?: string;
};

const instructor_history_data: DataType[] = [
   {
      id: 1,
      order_id: "#5478",
      course_name: "App Development",
      date: "January 31, 2024",
      price: 99,
      status: "Success"
   },
   {
      id: 2,
      order_id: "#4585",
      course_name: "Graphic",
      date: "February 03, 2024",
      price: 199,
      status: "Processing",
      status_class: "processing",
   },
   {
      id: 3,
      order_id: "#7869",
      course_name: "Digital Marketing",
      date: "March 25, 2024",
      price: 49,
      status: "On Hold",
      status_class: "hold",
   },
   {
      id: 4,
      order_id: "#4586",
      course_name: "JavaScript",
      date: "May 15, 2024",
      price: 129,
      status: "Canceled",
      status_class: "fail",
   },
   {
      id: 5,
      order_id: "#5478",
      course_name: "App Development",
      date: "January 31, 2024",
      price: 99,
      status: "Success"
   },
   {
      id: 6,
      order_id: "#4585",
      course_name: "Graphic",
      date: "February 03, 2024",
      price: 199,
      status: "Processing",
      status_class: "processing",
   },
   {
      id: 7,
      order_id: "#7869",
      course_name: "Digital Marketing",
      date: "March 25, 2024",
      price: 49,
      status: "On Hold",
      status_class: "hold",
   },
   {
      id: 8,
      order_id: "#4586",
      course_name: "JavaScript",
      date: "May 15, 2024",
      price: 129,
      status: "Canceled",
      status_class: "fail",
   },
   {
      id: 9,
      order_id: "#5478",
      course_name: "App Development",
      date: "January 31, 2024",
      price: 99,
      status: "Success"
   },
   {
      id: 10,
      order_id: "#4585",
      course_name: "Graphic",
      date: "February 03, 2024",
      price: 199,
      status: "Processing",
      status_class: "processing",
   },
   {
      id: 11,
      order_id: "#7869",
      course_name: "Digital Marketing",
      date: "March 25, 2024",
      price: 49,
      status: "On Hold",
      status_class: "hold",
   },
   {
      id: 12,
      order_id: "#4586",
      course_name: "JavaScript",
      date: "May 15, 2024",
      price: 129,
      status: "Canceled",
      status_class: "fail",
   },
   {
      id: 13,
      order_id: "#5478",
      course_name: "App Development",
      date: "January 31, 2024",
      price: 99,
      status: "Success"
   },
   {
      id: 14,
      order_id: "#4585",
      course_name: "Graphic",
      date: "February 03, 2024",
      price: 199,
      status: "Processing",
      status_class: "processing",
   },
   {
      id: 15,
      order_id: "#7869",
      course_name: "Digital Marketing",
      date: "March 25, 2024",
      price: 49,
      status: "On Hold",
      status_class: "hold",
   },
   {
      id: 16,
      order_id: "#4586",
      course_name: "JavaScript",
      date: "May 15, 2024",
      price: 129,
      status: "Canceled",
      status_class: "fail",
   },
];

export default instructor_history_data;