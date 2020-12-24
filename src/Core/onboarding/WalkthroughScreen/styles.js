import { StyleSheet } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingBottom: 25,
      color: appStyles.colorSet[colorScheme].purple,
    },
    text: {
      fontSize: 18,
      textAlign: 'center',
      color: appStyles.colorSet[colorScheme].grey10,
      paddingLeft: 10,
      paddingRight: 10,
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 60,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: appStyles.colorSet[colorScheme].mainThemeBackgroundColor,
    },
    button: {
      fontSize: 18,
      color: appStyles.colorSet[colorScheme].black,
      marginTop: 10,
    },
  });
};

export default dynamicStyles;
