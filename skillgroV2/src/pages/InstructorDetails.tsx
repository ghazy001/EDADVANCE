import Wrapper from '../layouts/Wrapper';
import InstructorDetailsMain from '../components/inner-pages/instructors/instructor-details';
import SEO from '../components/SEO';

const InstructorDetails = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Instructor Details'} />
         <InstructorDetailsMain />
      </Wrapper>
   );
};

export default InstructorDetails;