interface DataType {
   id: number,
   date: string;
   title: string;
   name: string;
   qus: number;
   tm: number;
   ca: number;
   result: string;
   result_class?: string;
};

const instructor_attempts_data: DataType[] = [
   {
      id: 1,
      date: "January 20, 2024",
      title: "Write a short essay on yourself using the 5",
      name: "John Due",
      qus: 4,
      tm: 8,
      ca: 4,
      result: "Pass",
   },
   {
      id: 2,
      date: "January 20, 2024",
      title: "Write a short essay on yourself using the 5",
      name: "John Due",
      qus: 2,
      tm: 6,
      ca: 3,
      result: "Fail",
      result_class: "fail",
   },
   {
      id: 3,
      date: "January 20, 2024",
      title: "Write a short essay on yourself using the 5",
      name: "John Due",
      qus: 4,
      tm: 8,
      ca: 4,
      result: "Pass",
   },
   {
      id: 4,
      date: "January 20, 2024",
      title: "Write a short essay on yourself using the 5",
      name: "John Due",
      qus: 2,
      tm: 6,
      ca: 3,
      result: "Fail",
      result_class: "fail",
   },
   {
      id: 5,
      date: "January 20, 2024",
      title: "Write a short essay on yourself using the 5",
      name: "John Due",
      qus: 4,
      tm: 8,
      ca: 4,
      result: "Pass",
   },
   {
      id: 6,
      date: "January 20, 2024",
      title: "Write a short essay on yourself using the 5",
      name: "John Due",
      qus: 2,
      tm: 6,
      ca: 3,
      result: "Fail",
      result_class: "fail",
   },
   {
      id: 7,
      date: "January 20, 2024",
      title: "Write a short essay on yourself using the 5",
      name: "John Due",
      qus: 4,
      tm: 8,
      ca: 4,
      result: "Pass",
   },
   {
      id: 8,
      date: "January 20, 2024",
      title: "Write a short essay on yourself using the 5",
      name: "John Due",
      qus: 2,
      tm: 6,
      ca: 3,
      result: "Fail",
      result_class: "fail",
   },
];

export default instructor_attempts_data;