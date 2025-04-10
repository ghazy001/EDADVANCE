import Wrapper from '../layouts/Wrapper';
import InstructorMain from '../components/inner-pages/instructors/instructor';
import SEO from '../components/SEO';

const Instructor = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Instructor'} />
         <InstructorMain />
      </Wrapper>
   );
};

export default Instructor;