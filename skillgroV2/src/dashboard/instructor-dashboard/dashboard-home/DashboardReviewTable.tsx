import { Link } from "react-router-dom";

interface DataType {
   id: number;
   name: string;
   enroll: number
}[];

const table_data: DataType[] = [
   {
      id: 1,
      name: "Accounting",
      enroll: 50,
   },
   {
      id: 2,
      name: "Marketing",
      enroll: 43,
   },
   {
      id: 3,
      name: "Web Design",
      enroll: 36,
   },
   {
      id: 4,
      name: "Graphic",
      enroll: 22,
   },
];

const DashboardReviewTable = () => {
   return (
      <table className="table table-borderless">
         <thead>
            <tr>
               <th>Course Name</th>
               <th>Enrolled</th>
               <th>Rating</th>
            </tr>
         </thead>
         <tbody>
            {table_data.map((list) => (
               <tr key={list.id}>
                  <td>
                     <Link to="/course-details">{list.name}</Link>
                  </td>
                  <td>
                     <p className="color-black">{list.enroll}</p>
                  </td>
                  <td>
                     <div className="review__wrap">
                        <div className="rating">
                           <i className="fas fa-star"></i>
                           <i className="fas fa-star"></i>
                           <i className="fas fa-star"></i>
                           <i className="fas fa-star"></i>
                           <i className="fas fa-star"></i>
                        </div>
                     </div>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}

export default DashboardReviewTable
