import { Link } from "react-router-dom";

interface DataType {
   id: number;
   thumb: string;
   date: string;
   title: string;
};

const latest_podt_data: DataType[] = [
   {
      id: 1,
      thumb: "/assets/img/blog/latest_post04.jpg",
      date: "April 13, 2024",
      title: "the Right Learning Path for your",
   },
   {
      id: 2,
      thumb: "/assets/img/blog/latest_post02.jpg",
      date: "April 13, 2024",
      title: "The Growing Need Management",
   },
   {
      id: 3,
      thumb: "/assets/img/blog/latest_post03.jpg",
      date: "April 13, 2024",
      title: "the Right Learning Path for your",
   },
   {
      id: 4,
      thumb: "/assets/img/blog/latest_post04.jpg",
      date: "April 13, 2024",
      title: "The Growing Need Management",
   },
];

const LatestPost = () => {
   return (
      <div className="blog-widget">
         <h4 className="widget-title">Latest Post</h4>
         {latest_podt_data.map((item) => (
            <div key={item.id} className="rc-post-item">
               <div className="rc-post-thumb">
                  <Link to="/blog-details">
                     <img src={item.thumb} alt="img" />
                  </Link>
               </div>
               <div className="rc-post-content">
                  <span className="date"><i className="flaticon-calendar"></i> {item.date}</span>
                  <h4 className="title"><Link to="/blog-details">{item.title}</Link></h4>
               </div>
            </div>
         ))}
      </div>
   )
}

export default LatestPost
