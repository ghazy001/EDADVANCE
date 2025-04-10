import Wrapper from '../layouts/Wrapper';
import StudentEnrollCourseMain from '../dashboard/student-dashboard/student-enrolled-courses';
import SEO from '../components/SEO';

const StudentEnrollCourse = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Student EnrollCourse'} />
         <StudentEnrollCourseMain />
      </Wrapper>
   );
};

export default StudentEnrollCourse;