import Wrapper from '../layouts/Wrapper';
import WishlistMain from '../components/inner-shop/wishlist';
import SEO from '../components/SEO';

const Wishlist = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Wishlist'} />
         <WishlistMain />
      </Wrapper>
   );
};

export default Wishlist;