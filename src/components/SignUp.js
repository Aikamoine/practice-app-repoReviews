import { View, StyleSheet } from 'react-native';
import Button from './Button';
import { Formik } from "formik";
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import useAddUser from '../hooks/useAddUser';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  fieldContainer: {
    marginBottom: 15,
  },
});

const initialValues = {
  username: '',
  password: '',
  passwordCheck: ''
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username name is required').min(1).max(30),
  password: yup.string().required('Password is required').min(5).max(50),
  passwordCheck: yup.string()
     .oneOf([yup.ref('password'), null], 'Passwords do not match')
     .required('Password confirm is required')
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="username" placeholder="Username, length 1 - 30" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="password"
          placeholder="Password, length 1 - 50"
          secureTextEntry
        />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput
          name="passwordCheck"
          placeholder="Repeat password"
          secureTextEntry
        />
      </View>
      <Button onPress={onSubmit}>Sign me up!</Button>
    </View>
  );
};

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const SignUp = () => {
  const [signIn] = useSignIn();
  const [addUser] = useAddUser();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;
    
    const id = await addUser({ username, password })
    
    if (id) {
      await signIn({ username, password });
      navigate('/', { replace: true });
    }
    return null
  };

  return <SignUpContainer onSubmit={onSubmit} />
}

export default SignUp