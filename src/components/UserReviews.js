import { useQuery } from "@apollo/client"
import { GET_CURRENT_USER } from './graphql/queries';
import { View, StyleSheet, FlatList } from "react-native"
import Text from "./Text";
import theme from "../theme";
import { format } from "date-fns";
import { Alert } from 'react-native'
import { useNavigate } from "react-router-native";
import Button from "./Button";
import RedButton from "./RedButton";
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "./graphql/mutations";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  contentContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  nameText: {
    marginBottom: 5,
  },
  descriptionText: {
    flexGrow: 1,
  },
  reviewContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    margin: 15
  },
  reviewScore: {
    textAlign: 'center',
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold
  },
});

const UserReview = ({ review, navigate, refetch }) => {
  console.log(review)
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async id => {
    console.log('deleting', id)
    const payload = await mutate({ variables: { deleteReviewId: id } });
    const { data } = payload;

    console.log('data', data)
    if (data?.deleteReview) {
      console.log('deletion complete')
      refetch()
    } else {
      console.log('deletion failed')
    }
  }

  const handleDelete = () => {
    console.log('deleting')

    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review? This can't be undone.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteReview(review.id) }
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewScore}>{review.rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {review.repository.fullName}
          </Text>
          <Text style={styles.descriptionText} color="textSecondary">
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>
            {review.text}
          </Text>
        </View>
      </View>
      <Button style={styles.contentContainer} onPress={() => navigate(`/repo/${review.repository.id}`)}>View repository</Button>
      <RedButton style={styles.contentContainer} onPress={() => handleDelete()}>Delete review</RedButton>
    </View>
  )
}



const UserReviews = () => {
  const navigate = useNavigate()

  const { data, refetch } = useQuery(GET_CURRENT_USER, {
      variables: {includeReviews: true}
  })
  
  if (!data) {
    return <Text>Loading...</Text>
  }

  const reviews = data.me.reviews.edges
  return (
  <FlatList
    data={reviews}
    renderItem={({ item }) => <UserReview review={item.node} navigate={navigate} refetch={refetch} />}
    keyExtractor={({ node }) => node.repository.fullName}
  />
)

}

export default UserReviews