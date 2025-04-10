import Count from "../../../components/common/Count";
import dashboard_count_data from "../../../data/dashboard-data/DashboardCounterData";

const DashboardCounter = () => {
   return (
      <>
         {dashboard_count_data.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-4 col-sm-6">
               <div className="dashboard__counter-item">
                  <div className="icon">
                     <i className={item.icon}></i>
                  </div>
                  <div className="content">
                     <span className="count"><Count number={item.count} /></span>
                     <p style={{marginTop:"5px"}}>{item.title}</p>
                  </div>
               </div>
            </div>
         ))}
      </>
   )
}

export default DashboardCounter;
