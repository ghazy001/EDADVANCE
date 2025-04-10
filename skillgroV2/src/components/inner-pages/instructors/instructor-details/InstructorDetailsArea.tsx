import { Link } from "react-router-dom";
import InstructorSlider from "./InstructorSlider"
import InstructorForm from "../../../../forms/InstructorForm";

interface DataType {
  id: number;
  title: string;
  count: number
}

const progress_data: DataType[] = [
  {
    id: 1,
    title: "PHP",
    count: 88
  },
  {
    id: 2,
    title: "React",
    count: 65
  },
  {
    id: 3,
    title: "Java",
    count: 55
  },
  {
    id: 4,
    title: "Angular",
    count: 40
  },
];

const InstructorDetailsArea = () => {
  return (
    <section className="instructor__details-area section-pt-120 section-pb-90">
      <div className="container">
        <div className="row">
          <div className="col-xl-9">
            <div className="instructor__details-wrap">
              <div className="instructor__details-info">
                <div className="instructor__details-thumb">
                  <img src="/assets/img/instructor/instructor_details_thumb.png" alt="img" />
                </div>
                <div className="instructor__details-content">
                  <h2 className="title">Robert Fox</h2>
                  <span className="designation">Expert Laravel Pro</span>
                  <ul className="list-wrap">
                    <li className="avg-rating"><i className="fas fa-star"></i>(4.8 Reviews)</li>
                    <li><i className="far fa-envelope"></i><Link to="mailto:info@gmail.com">info@gmail.com</Link></li>
                    <li><i className="fas fa-phone-alt"></i><Link to="tel:0123456789">+123 9500 600</Link></li>
                  </ul>
                  <p>Grursus mal suada faci lisis Lorem ipsum dolarorit more ametion consectetur Vesity bulum a nec odio aea the dumm ipsumm ipsum that dolocons sus suada and farit consectetur elit.</p>
                  <div className="instructor__details-social">
                    <ul className="list-wrap">
                      <li>
                        <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                      </li>
                      <li>
                        <Link to="#"><i className="fab fa-twitter"></i></Link>
                      </li>
                      <li>
                        <Link to="#"><i className="fab fa-instagram"></i></Link>
                      </li>
                      <li>
                        <Link to="#"><i className="fab fa-whatsapp"></i></Link>
                      </li>
                      <li>
                        <Link to="#"><i className="fab fa-youtube"></i></Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="instructor__details-biography">
                <h4 className="title">Biography</h4>
                <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.dolor sit amet, consectetur adipiscing elited do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt utte labore et dolore magna aliquauis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan.</p>
              </div>
              <div className="instructor__details-Skill">
                <h4 className="title">Skills</h4>
                <p>Dorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsa.</p>
                <div className="instructor__progress-wrap">
                  <ul className="list-wrap">
                    {progress_data.map((item) => (
                      <li key={item.id}>
                        <div className="progress-item">
                          <h6 className="title">{item.title} <span>{item.count}%</span></h6>
                          <div className="progress" role="progressbar" aria-label="Example with label">
                            <div className="progress-bar" style={{ width: `${item.count}%` }}></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="instructor__details-courses">
                <div className="row align-items-center mb-30">
                  <div className="col-md-8">
                    <h2 className="main-title">My Courses</h2>
                    <p>when known printer took a galley of type scrambl edmake</p>
                  </div>
                  <div className="col-md-4">
                    <div className="instructor__details-nav">
                      <button className="courses-button-prev"><i className="flaticon-arrow-right"></i></button>
                      <button className="courses-button-next"><i className="flaticon-arrow-right"></i></button>
                    </div>
                  </div>
                </div>
                <InstructorSlider />
              </div>
            </div>
          </div>

          <div className="col-xl-3">
            <div className="instructor__sidebar">
              <h4 className="title">Quick Contact</h4>
              <p>Feel free to contact us through Twitter or Facebook if you prefer!</p>
              <InstructorForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default InstructorDetailsArea
