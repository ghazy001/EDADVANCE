import Wrapper from '../layouts/Wrapper';
import CourseDetailsMain from '../components/courses/course-details';
import SEO from '../components/SEO';

const CourseDetails = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Course Details'} />
         <CourseDetailsMain />
      </Wrapper>
   );
};

export default CourseDetails;