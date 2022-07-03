import {  useMutation } from '@apollo/client';

import { REVIEW } from '../components/graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(REVIEW);

  const newReview = async ( {ownerName, repositoryName, rating, text}) => {
    const values = { ownerName, repositoryName, rating: Number(rating), text }
      
    console.log('usereview values', values)

    const payload = await mutate({ variables: { "review": values } });
    console.log('payload', payload)
    const { data } = payload;
    console.log('data', data)

    if (data?.createReview.repositoryId) {
      return data?.createReview.repositoryId
    }
    return undefined;
  };

  return [newReview, result];
};

export default useReview;