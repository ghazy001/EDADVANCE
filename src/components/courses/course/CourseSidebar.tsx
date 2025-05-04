import { useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from 'react-simple-star-rating';
import { selectCourses } from "../../../redux/features/courseSlice";

interface FilterCriteria {
    category: string;
    language: string;
    price: string;
    rating: number | null;
    skill: string;
    instructor: string;
}

interface CourseSidebarProps {
    setFilters: (filters: FilterCriteria) => void;
}

const CourseSidebar = ({ setFilters }: CourseSidebarProps) => {
    const [showMoreCategory, setShowMoreCategory] = useState(false);
    const [showMoreLanguage, setShowMoreLanguage] = useState(false);
    const [showMoreInstructor, setShowMoreInstructor] = useState(false);

    const [categorySelected, setCategorySelected] = useState('');
    const [languageSelected, setLanguageSelected] = useState('');
    const [priceSelected, setPriceSelected] = useState('');
    const [skillSelected, setSkillSelected] = useState('');
    const [instructorSelected, setInstructorSelected] = useState('');
    const [ratingSelected, setRatingSelected] = useState<number | null>(null);

    const allCourses = useSelector(selectCourses);
    const categoryFilter = allCourses.map(course => course.category);
    const languageFilter = allCourses.map(course => course.language);
    const skillFilter = allCourses.map(course => course.skill_level);
    const instructorFilter = allCourses.map(course => course.instructors);

    const allCategory = ['All Category', ...new Set(categoryFilter)];
    const allLanguage = ['All Language', ...new Set(languageFilter)];
    const allSkill = ['All Skill', ...new Set(skillFilter)];
    const allInstructor = ['All Instructors', ...new Set(instructorFilter)];

    // Define specific price options
    const priceOptions = [
        'All Prices',
        'Free',
        '$0 - $50',
        '$50 - $100',
        '$100 - $200',
        '$200+'
    ];

    const updateFilters = (newFilter: Partial<FilterCriteria>) => {
        setFilters(prev => ({
            ...prev,
            ...newFilter,
            ...(newFilter.category !== undefined ? { category: newFilter.category === 'All Category' ? '' : newFilter.category } : {}),
            ...(newFilter.language !== undefined ? { language: newFilter.language === 'All Language' ? '' : newFilter.language } : {}),
            ...(newFilter.price !== undefined ? { price: newFilter.price === 'All Prices' ? '' : newFilter.price } : {}),
            ...(newFilter.skill !== undefined ? { skill: newFilter.skill === 'All Skill' ? '' : newFilter.skill } : {}),
            ...(newFilter.instructor !== undefined ? { instructor: newFilter.instructor === 'All Instructors' ? '' : newFilter.instructor } : {})
        }));
    };

    const handleCategory = (category: string) => {
        const newCategory = categorySelected === category ? '' : category;
        setCategorySelected(newCategory);
        updateFilters({ category: newCategory });
    };

    const handleLanguage = (language: string) => {
        const newLanguage = languageSelected === language ? '' : language;
        setLanguageSelected(newLanguage);
        updateFilters({ language: newLanguage });
    };

    const handlePrice = (price: string) => {
        const newPrice = priceSelected === price ? '' : price;
        setPriceSelected(newPrice);
        updateFilters({ price: newPrice });
    };

    const handleSkill = (skill: string) => {
        const newSkill = skillSelected === skill ? '' : skill;
        setSkillSelected(newSkill);
        updateFilters({ skill: newSkill });
    };

    const handleInstructor = (instructor: string) => {
        const newInstructor = instructorSelected === instructor ? '' : instructor;
        setInstructorSelected(newInstructor);
        updateFilters({ instructor: newInstructor });
    };

    const handleRating = (rating: number) => {
        const newRating = ratingSelected === rating ? null : rating;
        setRatingSelected(newRating);
        updateFilters({ rating: newRating });
    };

    const categoriesToShow = showMoreCategory ? allCategory : allCategory.slice(0, 8);
    const languageToShow = showMoreLanguage ? allLanguage : allLanguage.slice(0, 4);
    const instructorToShow = showMoreInstructor ? allInstructor : allInstructor.slice(0, 4);

    return (
        <div className="col-xl-3 col-lg-4">
            <aside className="courses__sidebar">
                <div className="courses-widget">
                    <h4 className="widget-title">Categories</h4>
                    <div className="courses-cat-list">
                        <ul className="list-wrap">
                            {categoriesToShow.map((category, i) => (
                                <li key={i}>
                                    <div onClick={() => handleCategory(category)} className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={category === categorySelected} readOnly id={`cat_${i}`} />
                                        <label className="form-check-label" htmlFor={`cat_${i}`}>{category}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="show-more">
                            <a className={`show-more-btn ${showMoreCategory ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreCategory(!showMoreCategory)}>
                                {showMoreCategory ? "Show Less -" : "Show More +"}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="courses-widget">
                    <h4 className="widget-title">Languages</h4>
                    <div className="courses-cat-list">
                        <ul className="list-wrap">
                            {languageToShow.map((language, i) => (
                                <li key={i}>
                                    <div onClick={() => handleLanguage(language)} className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={language === languageSelected} readOnly id={`lang_${i}`} />
                                        <label className="form-check-label" htmlFor={`lang_${i}`}>{language}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="show-more">
                            <a className={`show-more-btn ${showMoreLanguage ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreLanguage(!showMoreLanguage)}>
                                {showMoreLanguage ? "Show Less -" : "Show More +"}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="courses-widget">
                    <h4 className="widget-title">Price</h4>
                    <div className="courses-cat-list">
                        <ul className="list-wrap">
                            {priceOptions.map((price, i) => (
                                <li key={i}>
                                    <div onClick={() => handlePrice(price)} className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={price === priceSelected} readOnly id={`price_${i}`} />
                                        <label className="form-check-label" htmlFor={`price_${i}`}>{price}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="courses-widget">
                    <h4 className="widget-title">Skill level</h4>
                    <div className="courses-cat-list">
                        <ul className="list-wrap">
                            {allSkill.map((skill, i) => (
                                <li key={i}>
                                    <div onClick={() => handleSkill(skill)} className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={skill === skillSelected} readOnly id={`skill_${i}`} />
                                        <label className="form-check-label" htmlFor={`skill_${i}`}>{skill}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="courses-widget">
                    <h4 className="widget-title">Instructors</h4>
                    <div className="courses-cat-list">
                        <ul className="list-wrap">
                            {instructorToShow.map((instructor, i) => (
                                <li key={i}>
                                    <div onClick={() => handleInstructor(instructor)} className="form-check">
                                        <input className="form-check-input" type="checkbox" checked={instructor === instructorSelected} readOnly id={`instructor_${i}`} />
                                        <label className="form-check-label" htmlFor={`instructor_${i}`}>{instructor}</label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="show-more">
                            <a className={`show-more-btn ${showMoreInstructor ? 'active' : ''}`} style={{ cursor: "pointer" }} onClick={() => setShowMoreInstructor(!showMoreInstructor)}>
                                {showMoreInstructor ? "Show Less -" : "Show More +"}
                            </a>
                        </div>
                    </div>
                </div>
                <div className="courses-widget">
                    <h4 className="widget-title">Ratings</h4>
                    <div className="courses-rating-list">
                        <ul className="list-wrap">
                            {[4.5, 4, 3.5, 3, 2.5].map((rating, i) => (
                                <li key={i}>
                                    <div onClick={() => handleRating(rating)} className="form-check">
                                        <input 
                                            className="form-check-input" 
                                            type="checkbox" 
                                            checked={ratingSelected === rating} 
                                            readOnly 
                                            id={`rating_${i}`} 
                                        />
                                        <label className="form-check-label" htmlFor={`rating_${i}`}>
                                            <div className="rating">
                                                <Rating 
                                                    initialValue={rating} 
                                                    size={20} 
                                                    readonly 
                                                    allowFraction 
                                                />
                                                <span className="rating-text">{rating}+</span>
                                            </div>
                                        </label>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default CourseSidebar;