import Wrapper from '../layouts/Wrapper';
import CheckOutMain from '../components/inner-shop/check-out';
import SEO from '../components/SEO';

const CheckOut = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro CheckOut'} />
         <CheckOutMain />
      </Wrapper>
   );
};

export default CheckOut;