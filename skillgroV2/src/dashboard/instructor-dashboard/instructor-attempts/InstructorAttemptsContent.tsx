import { Link } from "react-router-dom"
import instructor_attempts_data from "../../../data/dashboard-data/InstructorAttemptsData"

const InstructorAttemptsContent = () => {
   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">My Quiz Attempts</h4>
            </div>
            <div className="row">
               <div className="col-12">
                  <div className="dashboard__review-table">
                     <table className="table table-borderless">
                        <thead>
                           <tr>
                              <th>Quiz</th>
                              <th>Qus</th>
                              <th>TM</th>
                              <th>CA</th>
                              <th>Result</th>
                              <th>&nbsp;</th>
                           </tr>
                        </thead>
                        <tbody>
                           {instructor_attempts_data.map((item) => (
                              <tr key={item.id}>
                                 <td>
                                    <div className="dashboard__quiz-info">
                                       <p>{item.date}</p>
                                       <h6 className="title">{item.title}</h6>
                                       <span>Student: <Link to="#">{item.name}</Link></span>
                                    </div>
                                 </td>
                                 <td>
                                    <p className="color-black">{item.qus}</p>
                                 </td>
                                 <td>
                                    <p className="color-black">{item.tm}</p>
                                 </td>
                                 <td>
                                    <p className="color-black">{item.ca}</p>
                                 </td>
                                 <td>
                                    <span className={`dashboard__quiz-result ${item.result_class}`}>{item.result}</span>
                                 </td>
                                 <td>
                                    <div className="dashboard__review-action">
                                       <Link to="#" title="Edit"><i className="skillgro-edit"></i></Link>
                                       <Link to="#" title="Delete"><i className="skillgro-bin"></i></Link>
                                    </div>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstructorAttemptsContent
