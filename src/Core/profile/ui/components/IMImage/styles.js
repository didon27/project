import { Dimensions } from 'react-native';
import { StyleSheet } from 'react-native';

const { height } = Dimensions.get('window');
const imageSize = height * 0.14;
const photoIconSize = imageSize * 0.27;

const dynamicStyles = (appStyles, colorScheme) => {
  return StyleSheet.create({
    imageBlock: {
      flexDirection: 'row',
      justifyContent: 'center',
    },

    imageContainer: {
      height: 50,
      width: 50,
      borderRadius: 40,
      shadowColor: '#006',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      overflow: 'hidden',
      backgroundColor: 'black',
    },
    image: {
      height: 50,
      width: 50,
    },

    addButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#d6d6d6',
      opacity: 0.8,
      zIndex: 2,
      marginTop: 30,
      marginLeft: -50 * 0.29,
      width: 25,
      height: 25,
      borderRadius: 25,
    },

    closeButton: {
      alignSelf: 'flex-end',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginRight: 15,
      backgroundColor: appStyles.colorSet[colorScheme].grey6,
      width: 28,
      height: 28,
      borderRadius: 20,
      overflow: 'hidden',
    },
    closeIcon: {
      width: 27,
      height: 27,
    },
  });
};

export default dynamicStyles;
