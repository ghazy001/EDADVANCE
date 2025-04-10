import Wrapper from '../layouts/Wrapper';
import BlogMain from '../components/blogs/blog';
import SEO from '../components/SEO';

const Blog = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Blog'} />
         <BlogMain />
      </Wrapper>
   );
};

export default Blog;