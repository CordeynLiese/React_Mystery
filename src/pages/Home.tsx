import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { IdentityContext } from '../contexts/IdentityContext';
import { useTranslation } from '../hooks/useTranslation';

export const HomePageDataTestId = 'home-page';

const Home = () => {
  const { currentIdentity } = useContext(IdentityContext);
  const t = useTranslation('en');

  return (
    <div data-testid={HomePageDataTestId}>
      <h1>Home</h1>
      <h2>{t('home.title')}</h2>
      <p>
        {currentIdentity ? (
          <>Welcome, {currentIdentity}</>
        ) : (
          <>
            Please <Link to="/login">login</Link>
          </>
        )}
      </p>
    </div>
  );
};

export default Home;
