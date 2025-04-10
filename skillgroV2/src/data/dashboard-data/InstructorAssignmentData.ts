interface DataType {
   id: number;
   title: string;
   course: string;
   total_mark: number;
   total_submit: number;
};

const instructor_assignment_data: DataType[] = [
   {
      id: 1,
      title: "Write a short essay on yourself using the 5",
      course: "Song Writing",
      total_mark: 80,
      total_submit: 2,
   },
   {
      id: 2,
      title: "Write a short essay on yourself using the 5",
      course: "Song Writing",
      total_mark: 75,
      total_submit: 5,
   },
   {
      id: 3,
      title: "Write a short essay on yourself using the 5",
      course: "Song Writing",
      total_mark: 60,
      total_submit: 3,
   },
   {
      id: 4,
      title: "Write a short essay on yourself using the 5",
      course: "Song Writing",
      total_mark: 20,
      total_submit: 2,
   },
   {
      id: 5,
      title: "Write a short essay on yourself using the 5",
      course: "Song Writing",
      total_mark: 20,
      total_submit: 4,
   },
   {
      id: 6,
      title: "Write a short essay on yourself using the 5",
      course: "Song Writing",
      total_mark: 50,
      total_submit: 6,
   },
];

export default instructor_assignment_data;