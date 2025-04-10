import { useState } from "react";
import ReactPaginate from "react-paginate";
import inner_blog_data from "../../../data/inner-data/BlogData";
import { Link } from "react-router-dom";

const BlogThreeArea = () => {

  const blog = inner_blog_data;

  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blog.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blog.length / itemsPerPage);
  // click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % blog.length;
    setItemOffset(newOffset);
  };

  return (
    <section className="blog-area section-py-120">
      <div className="container">
        <div className="row gutter-20">
          {currentItems.map((item) => (
            <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
              <div className="blog__post-item shine__animate-item">
                <div className="blog__post-thumb">
                  <Link to="/blog-details" className="shine__animate-link"><img src={item.thumb} alt="img" /></Link>
                  <Link to="/blog" className="post-tag">{item.tag}</Link>
                </div>
                <div className="blog__post-content">
                  <div className="blog__post-meta">
                    <ul className="list-wrap">
                      <li><i className="flaticon-calendar"></i>{item.date}</li>
                      <li><i className="flaticon-user-1"></i>by <Link to="/blog-details">Admin</Link></li>
                    </ul>
                  </div>
                  <h4 className="title"><Link to="/blog-details">{item.title}</Link></h4>
                </div>
              </div>
            </div>
          ))}
          <nav className="pagination__wrap mt-25">
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
      </div>
    </section>
  )
}

export default BlogThreeArea
