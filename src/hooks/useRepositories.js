import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../components/graphql/queries';

const setFilter = order => {
  switch (order) {
    case 'latest':
      return {orderBy: 'CREATED_AT'}
    case 'best':
      return { orderBy: 'RATING_AVERAGE' }
    case 'worst':
      return {
        orderBy: 'RATING_AVERAGE',
        orderDirection: 'ASC'
      }
    default:
      return {};
  }
}

const useRepositories = (order, filter) => {
  const filterObject = setFilter(order)

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: {...filterObject, searchKeyword: filter}
  });
  
  const repositories = data ? data.repositories : undefined

  return { repositories, loading, } //refetch: fetchRepositories };
};

export default useRepositories;