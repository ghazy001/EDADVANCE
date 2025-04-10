import Wrapper from '../layouts/Wrapper';
import BlogDetailsMain from '../components/blogs/blog-details';
import SEO from '../components/SEO';

const BlogDetails = () => {
   return (
      <Wrapper>
         <SEO pageTitle={'SkillGro Blog Details'} />
         <BlogDetailsMain />
      </Wrapper>
   );
};

export default BlogDetails;