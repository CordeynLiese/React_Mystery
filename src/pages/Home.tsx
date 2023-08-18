import { FC, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useTranslation } from '../hooks/useTranslation';
import { User } from '../services/userApiClient';
import Alert from '../components/Alert';
import Button from '../components/Button';

export const HomePageDataTestId = 'home-page';

const Home: FC = () => {
  const t = useTranslation('en');
  const [url, setUrl] = useState('http://localhost:8080/users/1');
  const [id, setId] = useState(0);

  const { isLoading, data, error } = useFetch<User>(url);
  console.log(error, data);

  function changeUrl() {
    setUrl(url.substring(0, url.length - id.toString().length) + (id + 1).toString());
    setId((id) => id + 1);
  }

  function refreshUrl() {
    setUrl('http://localhost:8080/users/1');
  }

  return (
    <div data-testid={HomePageDataTestId}>
      <h1>Home</h1>
      {data && <p data-testid="data">{JSON.stringify(data)}</p>}
      {isLoading && <p>loading</p>}
      {error && <Alert variant="warning">Oops something went wrong!!</Alert>}
      <h2>{t('home.title')}</h2>
      <Button type="button" onClick={changeUrl}>
        next
      </Button>
      <Button type="button" onClick={refreshUrl}>
        refresh
      </Button>
    </div>
  );
};

export default Home;
