import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text'
import theme from '../theme';
import { Link } from "react-router-native";
import useGetMe from '../hooks/useGetMe';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.textPrimary,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  tab: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    color: 'white',
    padding: 20
 }
});

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link}><Text style={styles.tab}>{text}</Text></Link>
  )
};

const LogOutTab = () => {
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const onPress = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return <Link to={'/'} onPress={onPress}><Text style={styles.tab}>Log out</Text></Link>
}

const AppBar = () => {
  const { me } = useGetMe()
  
  if (me && me.me && me.me.id) {
    return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" link="/"/>
      <LogOutTab></LogOutTab>
    </ScrollView>
  </View>;
  }
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" link="/"/>
      <AppBarTab text="Sign in" link="/signin" />
    </ScrollView>
  </View>;
};

export default AppBar;