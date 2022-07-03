import { View, StyleSheet } from 'react-native';
import Button from './Button';
import { Formik } from "formik";
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useReview from "../hooks/useReview";
import { useNavigate } from 'react-router-native';

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
  repositoryName: '',
  ownerName: '',
  rating: '',
  review: ''
};

const validationSchema = yup.object().shape({
  repositoryName: yup.string().required('Repository name is required'),
  ownerName: yup.string().required('Repository owner name is required'),
  rating: yup.number().required('rating must be between 0 and 100').min(0).max(100)
})

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="repositoryName" placeholder="Repository name" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput name="rating" placeholder="Rating 0 - 100" />
      </View>
      <View style={styles.fieldContainer}>
        <FormikTextInput multiline={true} name="text" placeholder="Review" />
      </View>
      <Button onPress={onSubmit}>Create a review</Button>
    </View>
  );
};

const ReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
}

const Review = () => {
  const [newReview] = useReview();
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text} = values;
    
    try {
      const id = await newReview( {ownerName, repositoryName, rating, text} );
      navigate(`/repo/${id}`)
    } catch (error) {
      console.log(error)
    } 
  };

  return <ReviewContainer onSubmit={onSubmit} />
}

export default Review