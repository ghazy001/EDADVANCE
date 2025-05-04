import Wrapper from '../layouts/Wrapper';
import CourseMain from '../components/courses/course';
import SEO from '../components/SEO';

const Course = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'SkillGro Course'} />
      <CourseMain />
    </Wrapper>
  );
};

export default Course;