import { View, Image, StyleSheet, Pressable, FlatList } from "react-native"
import Text from './Text'
import theme from "../theme"
import formatInThousands from "../utils/formatInThousands";
import { useNavigate, useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import * as Linking from 'expo-linking'
import Button from './Button'
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatarContainer: {
    flexGrow: 0,
    marginRight: 20,
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
  avatar: {
    width: 45,
    height: 45,
    borderRadius: theme.roundness,
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
  countItem: {
    flexGrow: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  countItemCount: {
    marginBottom: 5,
  },
  languageContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  languageText: {
    color: 'white',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness,
    flexGrow: 0,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});

const CountItem = ({ label, count }) => {
  return (
    <View style={styles.countItem}>
      <Text style={styles.countItemCount} fontWeight="bold">
        {formatInThousands(count)}
      </Text>
      <Text color="textSecondary">{label}</Text>
    </View>
  );
};

const RepositoryDetails = ({ repository }) => {
  
  
  const openUrl = url => {
    Linking.openURL(url)
  }

  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepoContent repository={repository}/>
      <View style={styles.languageContainer}>
        <Button style={styles.contentContainer} onPress={() => openUrl(repository.url)}>Open in GitHub</Button>
      </View>
    </View>
  );
}

const RepoContent = ({ repository }) => {
  const {
    fullName,
    description,
    language,
    forksCount,
    stargazersCount,
    ratingAverage,
    reviewCount,
    ownerAvatarUrl
  } = repository;

  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            style={styles.nameText}
            fontWeight="bold"
            fontSize="subheading"
            numberOfLines={1}
          >
            {fullName}
          </Text>
          <Text style={styles.descriptionText} color="textSecondary">
            {description}
          </Text>
          {language ? (
            <View style={styles.languageContainer}>
              <Text style={styles.languageText}>{language}</Text>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <CountItem count={stargazersCount} label="Stars" />
        <CountItem count={forksCount} label="Forks" />
        <CountItem count={reviewCount} label="Reviews" />
        <CountItem count={ratingAverage} label="Rating" />
      </View>
    </View>
  )  
}

const ReviewItem = ({ review }) => {
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
            {review.user.username}
          </Text>
          <Text style={styles.descriptionText} color="textSecondary">
            {format(new Date(review.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>
            {review.text}
          </Text>
        </View>
        
      </View>
    </View>
    )
}

const SingleRepository = () => {
  const id = useParams().id
  const { repository } = useRepository(id)
  
  if (!repository) {
    return <Text>loading...</Text>
  }
  
  console.log('repository', repository)
  const reviews = repository.reviews.edges

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item.node} />}
      keyExtractor={({ node }) => node.id}
      ListHeaderComponent={() => <RepositoryDetails repository={repository} />}
    />
  )
}
const RepositoryItem = ({ repo, gitLink }) => {
  const navigate = useNavigate()
  
  if (gitLink) {
    return <SingleRepository />
  }

  return (
    <Pressable onPress={() => navigate(`/repo/${repo.id}`)}>
      <RepoContent repository={repo} />
    </Pressable>
  )
};

export default RepositoryItem;