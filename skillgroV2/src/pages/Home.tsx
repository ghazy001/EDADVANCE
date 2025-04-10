import Wrapper from '../layouts/Wrapper';
import HomeOneMain from '../components/homes/home-one';
import SEO from '../components/SEO';

const Home = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'SkillGro'} />
      <HomeOneMain />
    </Wrapper>
  );
};

export default Home;