import Wrapper from '../layouts/Wrapper';
import StudentWishlistMain from '../dashboard/student-dashboard/student-wishlist';
import SEO from '../components/SEO';

const StudentWishlist = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Student Wishlist'} />
         <StudentWishlistMain />
      </Wrapper>
   );
};

export default StudentWishlist;