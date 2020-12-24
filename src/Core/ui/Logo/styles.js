import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    logoContainer: {
      height: 164,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      marginTop: 60,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gradient: {
      flex: 1,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 60,
      borderWidth: 0,
    },
    logoImage: {
      width: 70,
      height: 70,
      resizeMode: 'contain',
      tintColor: appStyles.colorSet[colorScheme].logoColor,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      lineHeight: 29,
      textTransform: 'uppercase',
      letterSpacing: 7,
      color: appStyles.colorSet[colorScheme].screenHeader,
      marginTop: 10,
      textAlign: 'center',
    },
  });
};

export default dynamicStyles;
