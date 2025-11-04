import { useNavigate } from 'react-router-dom';
import LandingPage from './LandingPage';
import SEO from './SEO';

export default function LandingPageWithRouter() {
  const navigate = useNavigate();

  return (
    <>
      <SEO />
      <LandingPage
        onLoginClick={() => navigate('/login')}
        onSignUpClick={() => navigate('/login')}
      />
    </>
  );
}
