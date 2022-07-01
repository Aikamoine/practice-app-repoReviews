import FormikTextInput from './FormikTextInput';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './Button';
import useSignIn from '../hooks/useSignIn';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router'

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
      <Button onPress={onSubmit}>Sign in</Button>
    </View>  
  );
};

const validationSchema = yup.object().shape({
  username: yup.string().required('username is required'),
  password: yup.string().required('password is required')
})

const SignIn = () => {
  const [signIn] = useSignIn();
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    console.log('onsubmit values', values);
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      await authStorage.setAccessToken(data.authenticate.accessToken);
      apolloClient.resetStore();
      console.log('token from storage', await authStorage.getAccessToken());
      navigate('/')
    } catch (e) {
      console.log('error')
      console.log(e);
    }
  };
  
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn;