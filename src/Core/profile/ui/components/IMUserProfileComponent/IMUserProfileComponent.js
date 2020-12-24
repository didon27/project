import React, { useEffect } from 'react';
import { Text, View, StatusBar, Image, ScrollView } from 'react-native';
import firebase from 'react-native-firebase';

import firebaseConfig from '../../../../firebase/config';

// if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
import LinearGradient from 'react-native-linear-gradient';
import dynamicStyles from './styles';

import { IMLocalized } from '../../../../localization/IMLocalization';
import IMProfileItemView from '../IMProfileItemView/IMProfileItemView';
import IMImage from '../IMImage/TNProfilePictureSelector';
import { firebaseStorage } from '../../../../firebase/storage';
import { firebaseAuth } from '../../../../firebase';
import { useColorScheme } from 'react-native-appearance';

const rightArrowIcon = require('../../../../../CoreAssets/right-arrow.png');
const IMUserProfileComponent = (props) => {
  const { appStyles, menuItems, onUpdateUser, onLogout } = props;

  const {
    profilePictureURL,
    firstName,
    lastName,
    fullname,
    userID,
  } = props.user;

  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const userRef = firebase.firestore().collection('users').doc(props.user.id);

  const onUserProfileUpdate = (querySnapshot) => {
    const data = querySnapshot.data();
    if (data) {
      onUpdateUser(data);
    }
  };

  const displayName = () => {
    let fullname = '';
    if (firstName && firstName.length) {
      fullname += firstName + ' ';
    }
    if (lastName && lastName.length) {
      fullname += lastName;
    }

    return fullname || '';
  };

  useEffect(() => {
    const unsubscribeUserFunction = userRef.onSnapshot(onUserProfileUpdate);
    return () => {
      unsubscribeUserFunction();
    };
  }, []);

  const updateProfilePictureURL = (photoURI) => {
    if (photoURI == null) {
      // Remove profile photo action
      firebaseAuth.updateProfilePhoto(userID, null).then((finalRes) => {
        if (finalRes.success == true) {
          onUpdateUser({ ...props.user, profilePictureURL: null });
        }
      });
      return;
    }
    // If we have a photo, we upload it to Firebase, and then update the user
    firebaseStorage.uploadImage(photoURI).then((response) => {
      if (response.error) {
        // there was an error, fail silently
      } else {
        firebaseAuth
          .updateProfilePhoto(userID, response.downloadURL)
          .then((finalRes) => {
            if (finalRes.success == true) {
              onUpdateUser({
                ...props.user,
                profilePictureURL: response.downloadURL,
              });
            }
          });
      }
    });
  };

  const renderMenuItem = (menuItem) => {
    const { title, icon, onPress, tintColor, theme } = menuItem;
    return (
      <IMProfileItemView
        title={title}
        icon={icon}
        onPress={onPress}
        appStyles={appStyles}
        colors={theme[colorScheme]}
      />
    );
  };

  const myProfileScreenContent = () => {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <StatusBar
            // backgroundColor={useDynamicValue('#ffffff', '#121212')}
            // barStyle={useDynamicValue('dark-content', 'light-content')}
            />
            <View style={styles.imageContainer}>
              <View style={styles.image}>
                <IMImage
                  setProfilePictureURL={updateProfilePictureURL}
                  appStyles={appStyles}
                  profilePictureURL={profilePictureURL}
                />
              </View>
              <Text style={styles.userName}>{displayName()}</Text>
            </View>
            <View style={styles.menuItemContainer}>
              {menuItems.map((menuItem) => {
                return renderMenuItem(menuItem);
              })}

              <View style={styles.logoutContainer}>
                <View style={styles.logout}>
                  <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={
                      colorScheme === 'dark'
                        ? ['#FFB4B4', '#F46060']
                        : ['#FF6E6E', '#FF6E6E']
                    }
                    style={styles.gradient}>
                    <Image
                      style={[styles.icon]}
                      source={appStyles.iconSet.logout}
                    />
                  </LinearGradient>
                  <Text onPress={onLogout} style={styles.logoutText}>
                    {IMLocalized('Logout')}
                  </Text>
                </View>
                <Image
                  style={styles.itemNavigationIcon}
                  source={rightArrowIcon}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    );
  };

  return <>{myProfileScreenContent()}</>;
};

export default IMUserProfileComponent;
