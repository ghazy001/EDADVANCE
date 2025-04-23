import { useState } from "react";
import { Link } from "react-router-dom";

interface Lesson {
  _id: string;
  title: string;
  videoUrl: string;
  duration: string;
  isLocked: boolean;
  order: number;
}

interface LessonFaqProps {
  lessons: Lesson[];
}

const LessonFaq = ({ lessons }: LessonFaqProps) => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  // Group lessons by section (e.g., Introduction, Capacitance) - for now, assume all under one section
  const groupedLessons = [
    {
      id: 1,
      title: "Lessons",
      count: `${lessons.length}/${lessons.length}`,
      faq_details: lessons.map((lesson) => ({
        lock: lesson.isLocked,
        title: lesson.title,
        duration: lesson.duration,
      })),
    },
  ];

  return (
    <div className="accordion" id="accordionExample">
      {groupedLessons.map((item) => (
        <div key={item.id} className="accordion-item">
          <h2 className="accordion-header">
            <button
              className={`accordion-button ${activeAccordion !== item.id ? "collapsed" : ""}`}
              type="button"
              onClick={() => toggleAccordion(item.id)}
            >
              {item.title}
              <span>{item.count}</span>
            </button>
          </h2>
          <div
            id={`collapseOne${item.id}`}
            className={`accordion-collapse collapse ${activeAccordion === item.id ? "show" : ""}`}
            data-bs-parent="#accordionExample"
          >
            <div className="accordion-body">
              <ul className="list-wrap">
                {item.faq_details.map((list, i) => (
                  <li
                    key={i}
                    className={`course-item ${!list.lock ? "open-item" : ""}`}
                  >
                    <Link to="#" className="course-item-link popup-video">
                      <span className="item-name">{list.title}</span>
                      <div className="course-item-meta">
                        <span className="item-meta duration">{list.duration}</span>
                        {list.lock && (
                          <span className="item-meta course-item-status">
                            <img src="/assets/img/icons/lock.svg" alt="icon" />
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LessonFaq;