import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CourseSidebar from './CourseSidebar';
import CourseTop from './CourseTop';
import UseCourses from '../../../hooks/UseCourses';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCourses, selectCart, addToCart, clearCart, Course } from '../../../redux/features/courseSlice';

const BASE_URL = 'http://localhost:3000';

interface FilterCriteria {
    category: string;
    language: string;
    price: string;
    rating: number | null;
    skill: string;
    instructor: string;
}

const CourseArea = () => {
    UseCourses();
    const allCourses = useSelector(selectCourses);
    const cart = useSelector(selectCart);
    const dispatch = useDispatch();

    const itemsPerPage = 12;
    const [itemOffset, setItemOffset] = useState(0);
    const [filteredCourses, setFilteredCourses] = useState<Course[]>(allCourses);
    const [filters, setFilters] = useState<FilterCriteria>({
        category: '',
        language: '',
        price: '',
        rating: null,
        skill: '',
        instructor: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [isListening, setIsListening] = useState(false);

    // Voice search setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognition) {
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';
    }

    useEffect(() => {
        let result = [...allCourses];
        
        // Apply search filter first
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(course => 
                course.title.toLowerCase().includes(query) ||
                course.category.toLowerCase().includes(query) ||
                course.instructors.toLowerCase().includes(query)
            );
        }

        // Apply other filters
        if (filters.category) {
            result = result.filter(course => course.category === filters.category);
        }
        if (filters.language) {
            result = result.filter(course => course.language === filters.language);
        }
        if (filters.price) {
            result = result.filter(course => {
                const price = course.price;
                switch(filters.price) {
                    case 'Free':
                        return price === 0;
                    case '$0 - $50':
                        return price > 0 && price <= 50;
                    case '$50 - $100':
                        return price > 50 && price <= 100;
                    case '$100 - $200':
                        return price > 100 && price <= 200;
                    case '$200+':
                        return price > 200;
                    default:
                        return true;
                }
            });
        }
        if (filters.rating !== null) {
            result = result.filter(course => course.rating >= filters.rating);
        }
        if (filters.skill) {
            result = result.filter(course => course.skill_level === filters.skill);
        }
        if (filters.instructor) {
            result = result.filter(course => course.instructors === filters.instructor);
        }

        setFilteredCourses(result);
        setItemOffset(0);
    }, [filters, allCourses, searchQuery]);

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = filteredCourses.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredCourses.length / itemsPerPage);
    const startOffset = itemOffset + 1;
    const totalItems = filteredCourses.length;

    const [activeTab, setActiveTab] = useState(0);

    const handlePageClick = (event: { selected: number }) => {
        const newOffset = (event.selected * itemsPerPage) % filteredCourses.length;
        setItemOffset(newOffset);
    };

    const handleTabClick = (index: number) => {
        setActiveTab(index);
    };

    const proceedToCheckout = async () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/course/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courses: cart }),
            });
            const result = await response.json();
            if (result.status === 'SUCCESS') {
                window.location.href = result.url;
                dispatch(clearCart());
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed!');
        }
    };

    const handleVoiceSearch = () => {
        if (!recognition) {
            alert('Speech recognition is not supported in your browser');
            return;
        }

        setIsListening(true);
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            setIsListening(false);
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
            alert('Error occurred in voice recognition. Please try again.');
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const handleTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <section className="all-courses-area section-py-120">
            <div className="container">
                <div className="row">
                    <CourseSidebar setFilters={setFilters} />
                    <div className="col-xl-9 col-lg-8">
                        <CourseTop
                            startOffset={startOffset}
                            endOffset={Math.min(endOffset, totalItems)}
                            totalItems={totalItems}
                            handleTabClick={handleTabClick}
                            activeTab={activeTab}
                            setCourses={setFilteredCourses}
                        />
                        <div className="search-container mb-3">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={handleTextSearch}
                                />
                                <button
                                    className={`btn ${isListening ? 'btn-danger' : 'btn-primary'}`}
                                    onClick={handleVoiceSearch}
                                    disabled={isListening}
                                >
                                    {isListening ? (
                                        <span>Listening...</span>
                                    ) : (
                                        <i className="fas fa-microphone"></i>
                                    )}
                                </button>
                            </div>
                        </div>
                        <div>
                            <button onClick={proceedToCheckout} className="btn">
                                Proceed to Checkout ({cart.length} items)
                            </button>
                        </div>
                        <div className="tab-content" id="myTabContent">
                            <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="grid" role="tabpanel" aria-labelledby="grid-tab">
                                <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                                    {currentItems.map((item) => (
                                        <div key={item.id} className="col">
                                            <div className="courses__item shine__animate-item">
                                                <div className="courses__item-thumb">
                                                    <Link to={`/course-details/${item.id}`} className="shine__animate-link">
                                                        <img
                                                            src={item.thumb?.startsWith('http') ? item.thumb : `${BASE_URL}${item.thumb}`}
                                                            alt={item.title}
                                                            onError={(e) => (e.currentTarget.src = `${BASE_URL}/uploads/default.jpg`)}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className="courses__item-content">
                                                    <ul className="courses__item-meta list-wrap">
                                                        <li className="courses__item-tag">
                                                            <Link to="/courses">{item.category}</Link>
                                                        </li>
                                                        <li className="avg-rating"><i className="fas fa-star"></i> ({item.rating} Reviews)</li>
                                                    </ul>
                                                    <h5 className="title"><Link to={`/course-details/${item.id}`}>{item.title}</Link></h5>
                                                    <p className="author">By <Link to="#">{item.instructors}</Link></p>
                                                    <div className="courses__item-bottom">
                                                        <div className="button">
                                                            <button onClick={() => dispatch(addToCart(item))} className="btn">
                                                                Add to Cart
                                                            </button>
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
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CourseArea;