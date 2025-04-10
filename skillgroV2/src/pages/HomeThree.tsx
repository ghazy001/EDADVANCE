import Wrapper from '../layouts/Wrapper';
import HomeThreeMain from '../components/homes/home-three';
import SEO from '../components/SEO';

const HomeThree = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'SkillGro Home Three'} />
      <HomeThreeMain />
    </Wrapper>
  );
};

export default HomeThree;