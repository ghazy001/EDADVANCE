import Wrapper from '../layouts/Wrapper';
import AboutMain from '../components/inner-pages/about-us';
import SEO from '../components/SEO';

const About = () => {
  return (
    <Wrapper>
      <SEO pageTitle={'EdAdvance About'} />
      <AboutMain />
    </Wrapper>
  );
};

export default About;