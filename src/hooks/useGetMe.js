import { useQuery } from '@apollo/client';
import { GET_ME } from '../components/graphql/queries';

const useGetMe = () => {
  const { data, error, loading } = useQuery(GET_ME, {
    fetchPolicy: 'cache-and-network'
  });
  
  const me = data ? data : null
  return { me, loading, } //refetch: fetchRepositories };
};

export default useGetMe;