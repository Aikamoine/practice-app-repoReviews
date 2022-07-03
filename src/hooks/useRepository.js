import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../components/graphql/queries';

const useRepository =  id  => {
  const { data } = useQuery(GET_REPOSITORY, {
      fetchPolicy: 'cache-and-network',
      variables: {
          "repositoryId": id
      }
  });
  
  const repository = data ? data.repository : undefined
  return { repository };
};

export default useRepository;

