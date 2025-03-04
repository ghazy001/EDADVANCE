import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CourseSidebar from './CourseSidebar';
import CourseTop from './CourseTop';
import UseCourses from '../../../hooks/UseCourses';
import { Link } from 'react-router-dom';

const CourseArea = () => {

   const { courses, setCourses } = UseCourses();

   const itemsPerPage = 12;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = courses.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(courses.length / itemsPerPage);

   const startOffset = itemOffset + 1;
   const totalItems = courses.length;

   useEffect(() => {
   }, [courses]);

   const handlePageClick = (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % courses.length;
      setItemOffset(newOffset);
   };

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   return (
      <section className="all-courses-area section-py-120">
         <div className="container">
            <div className="row">
               <CourseSidebar setCourses={setCourses} />
               <div className="col-xl-9 col-lg-8">
                  <CourseTop
                     startOffset={startOffset}
                     endOffset={Math.min(endOffset, totalItems)}
                     totalItems={totalItems}
                     setCourses={setCourses}
                     handleTabClick={handleTabClick}
                     activeTab={activeTab}
                  />
                  <div className="tab-content" id="myTabContent">
                     <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="grid" role="tabpanel" aria-labelledby="grid-tab">
                        <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                           {currentItems.map((item) => (
                              <div key={item.id} className="col">
                                 <div className="courses__item shine__animate-item">
                                    <div className="courses__item-thumb">
                                       <Link to={`/course-details/${item.id}`} className="shine__animate-link">
                                          <img src={item.thumb} alt="img" />
                                       </Link>
                                    </div>
                                    <div className="courses__item-content">
                                       <ul className="courses__item-meta list-wrap">
                                          <li className="courses__item-tag">
                                             <Link to="/course">{item.category}</Link>
                                          </li>
                                          <li className="avg-rating"><i className="fas fa-star"></i> ({item.rating} Reviews)</li>
                                       </ul>
                                       <h5 className="title"><Link to={`/course-details/${item.id}`}>{item.title}</Link></h5>
                                       <p className="author">By <Link to="#">{item.instructors}</Link></p>
                                       <div className="courses__item-bottom">
                                          <div className="button">
                                             <Link to={`/course-details/${item.id}`}>
                                                <span className="text">Enroll Now</span>
                                                <i className="flaticon-arrow-right"></i>
                                             </Link>
                                          </div>
                                          <h5 className="price">${item.price}.00</h5>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <nav className="pagination__wrap mt-30">
                           <ReactPaginate
                              breakLabel="..."
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={3}
                              pageCount={pageCount}
                              renderOnZeroPageCount={null}
                              className="list-wrap"
                           />
                        </nav>
                     </div>

                     <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="list" role="tabpanel" aria-labelledby="list-tab">
                        <div className="row courses__list-wrap row-cols-1">
                           {currentItems.map((item) => (
                              <div key={item.id} className="col">
                                 <div className="courses__item courses__item-three shine__animate-item">
                                    <div className="courses__item-thumb">
                                       <Link to="/course-details" className="shine__animate-link">
                                          <img src={item.thumb} alt="img" />
                                       </Link>
                                    </div>
                                    <div className="courses__item-content">
                                       <ul className="courses__item-meta list-wrap">
                                          <li className="courses__item-tag">
                                             <Link to="/course">{item.category}</Link>
                                             <div className="avg-rating">
                                                <i className="fas fa-star"></i>  ({item.rating} Reviews)
                                             </div>
                                          </li>
                                          <li className="price">${item.price}.00</li>
                                       </ul>
                                       <h5 className="title"><a href="course-details.html">{item.title}</a></h5>
                                       <p className="author">By <a href="#">{item.instructors}</a></p>
                                       <p className="info">{item.desc}</p>
                                       <div className="courses__item-bottom">
                                          <div className="button">
                                             <a href="course-details.html">
                                                <span className="text">Enroll Now</span>
                                                <i className="flaticon-arrow-right"></i>
                                             </a>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                        <nav className="pagination__wrap mt-30">
                           <ul className="list-wrap">
                              <ReactPaginate
                                 breakLabel="..."
                                 onPageChange={handlePageClick}
                                 pageRangeDisplayed={3}
                                 pageCount={pageCount}
                                 renderOnZeroPageCount={null}
                                 className="list-wrap"
                              />
                           </ul>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CourseArea;
