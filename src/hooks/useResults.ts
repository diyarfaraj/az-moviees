import {useState, useEffect} from 'react';
import showService from '../api/showService';
import {Show} from '../types/Show';

export default (): [
  (searchTerm: string) => Promise<void>,
  Show[],
  string,
  boolean,
] => {
  const [results, setResults] = useState([]);
  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const searchApi = async (searchTerm: string) => {
    try {
      setLoading(true);
      const response = await showService.get(`/search/shows?q=${searchTerm}`);
      setResults(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErrors('Something went wrong when calling api');
    }
  };

  useEffect(() => {
    searchApi('robot');
  }, []);

  return [searchApi, results, errors, loading];
};
