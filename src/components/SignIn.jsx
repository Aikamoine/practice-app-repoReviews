import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import theme from "../theme";
import * as yup from 'yup';

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry/>
      <Pressable onPress={onSubmit}>
        <Text style={{
          width: 300,
          height: 40,
          backgroundColor: theme.colors.primary,
          paddingVertical: 10,
          paddingHorizontal: 15,
          fontSize: 16,
          margin: 10,
          color: 'white',
          textAlign: 'center',
          fontWeight: theme.fontWeights.bold,
          borderRadius: 5
        }}>Sign in</Text>
      </Pressable>
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