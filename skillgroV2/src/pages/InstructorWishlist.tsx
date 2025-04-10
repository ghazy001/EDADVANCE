import Wrapper from '../layouts/Wrapper';
import InstructorWishlistMain from '../dashboard/instructor-dashboard/instructor-wishlist';
import SEO from '../components/SEO';

const InstructorWishlist = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Instructor Wishlist'} />
         <InstructorWishlistMain />
      </Wrapper>
   );
};

export default InstructorWishlist;