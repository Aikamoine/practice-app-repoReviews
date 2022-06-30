import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text'
import theme from '../theme';
import { Link } from "react-router-native";

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

const handlePress = () => {
  console.log('pressed this')
}

const AppBarTab = ({ text, handlePress, link }) => {
  return (
    <Pressable onPress={handlePress}><Link to={link}><Text style={styles.tab}>{text}</Text></Link></Pressable>
  )
};

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" link="/" handlePress={handlePress} />
      <AppBarTab text="Sign in" link="/signin" handlePress={handlePress} />
    </ScrollView>
  </View>;
};

export default AppBar;