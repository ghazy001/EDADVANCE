import Wrapper from '../layouts/Wrapper';
import HomeFourMain from '../components/homes/home-four';
import SEO from '../components/SEO';

const HomeFour = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'SkillGro Home Four'} />
      <HomeFourMain />
    </Wrapper>
  );
};

export default HomeFour;