import { View, StyleSheet, ScrollView } from 'react-native';
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

const AppBarTab = ({ text, link }) => {
  return (
    <Link to={link}><Text style={styles.tab}>{text}</Text></Link>
  )
};

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <AppBarTab text="Repositories" link="/"/>
      <AppBarTab text="Sign in" link="/signin"/>
    </ScrollView>
  </View>;
};

export default AppBar;