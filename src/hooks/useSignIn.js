import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../components/graphql/mutations';
import { useContext } from 'react';
import useAuthStorage from './useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  
  const signIn = async ({ username, password }) => {
    console.log('signin', username, password)
    const data = await mutate(
      {
        variables:
        {
          credentials:
          {
            username: username,
            password: password
          }
        }
      });
    return data
  };
  
  return [signIn, result];
};

export default useSignIn;