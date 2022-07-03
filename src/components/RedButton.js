import { Pressable, View, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 64,
    margin: 10,
    width: 300,
    height: 40,
    textAlign: 'center',
    backgroundColor: theme.colors.error,
    borderRadius: theme.roundness,
  },
  text: {
    color: 'white',
  }
});

const RedButton = ({ children, style, ...props }) => {
  const buttonStyle = [styles.container, style];

  return (
    <Pressable {...props}>
      <View style={buttonStyle}>
        <Text style={styles.text} fontWeight="bold">
          {children}
        </Text>
      </View>
    </Pressable>
  );
};



export default RedButton