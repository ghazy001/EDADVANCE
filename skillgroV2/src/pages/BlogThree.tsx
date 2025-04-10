import Wrapper from '../layouts/Wrapper';
import BlogThreeMain from '../components/blogs/blog-three';
import SEO from '../components/SEO';

const BlogThree = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Blog Three'} />
         <BlogThreeMain />
      </Wrapper>
   );
};

export default BlogThree;