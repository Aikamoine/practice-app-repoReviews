import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15, 
    fontSize: 16,
    margin: 10
  },
  inputError: {
    borderColor: theme.colors.error
  },
});

const TextInput = ({ style, multiline, error, ...props }) => {
  const textInputStyle = [
    styles.input,
    error && styles.inputError,
    style,
  ];
  
  return <NativeTextInput multiline={multiline} style={textInputStyle} {...props} />;
};

export default TextInput;