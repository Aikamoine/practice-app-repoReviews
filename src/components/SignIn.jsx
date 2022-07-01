import FormikTextInput from './FormikTextInput';
import { View } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Button from './Button';

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
  const onSubmit = (values) => {
    console.log(values);
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