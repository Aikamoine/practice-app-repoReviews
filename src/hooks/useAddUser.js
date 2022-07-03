import { useMutation } from '@apollo/client';

import { CREATE_USER } from '../components/graphql/mutations';

const useAddUser = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  
  const addUser = async ({ username, password }) => {
    const credentials = { username, password };
    console.log('credientials', credentials)
    
    try {
      const payload = await mutate({ variables: { user: credentials } });
      const { data } = payload;
      
      return data.createUser.id;
    } catch (error) {
      console.log(error)
    }
    return undefined
  };

  return [addUser, result];
};

export default useAddUser;