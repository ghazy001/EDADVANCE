import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Wrapper from '../layouts/Wrapper';
import LoginMain from '../components/inner-pages/login';
import SEO from '../components/SEO';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const { user, loading } = useContext(AuthContext);

  if (!loading && user) {
    return <Navigate to={user.role === 'instructor' || user.role === 'admin' ? '/instructor-dashboard' : '/courses'} replace />;
  }

  return (
    <Wrapper>
      <SEO pageTitle={'SkillGro Login'} />
      <LoginMain />
    </Wrapper>
  );
};

export default Login;