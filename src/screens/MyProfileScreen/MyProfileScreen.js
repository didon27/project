import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import AppStyles from '../../DynamicAppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { logout, setUserData } from '../../Core/onboarding/redux/auth';
import ChatConfig from '../../config';
import { TNTouchableIcon } from '../../Core/truly-native';
import { IMUserProfileComponent } from '../../Core/profile';
import authManager from '../../Core/onboarding/utils/authManager';
import CustomHeader from '../../components/HeaderComponent/CustomHeader';
import Share from "react-native-share";
import amplitude from '../../../amplitude';


const MyProfileScreen = (props) => {
  const { navigation } = props;
  const onAccountDetailsPress = () => {
    navigation.navigate('AccountDetails', {
      appStyles: AppStyles,
      form: ChatConfig.editProfileFields,
      screenTitle: IMLocalized('Edit Profile'),
    });
  };

  const onSettingsPress = () => {
    navigation.navigate('Settings', {
      appStyles: AppStyles,
      form: ChatConfig.userSettingsFields,
      screenTitle: IMLocalized('Settings'),
    });
  };

  const onContactUsPress = () => {
    navigation.navigate('ContactUs', {
      appStyles: AppStyles,
      screenTitle: IMLocalized('Contact Us'),
      form: ChatConfig.contactUsFields,
      phone: ChatConfig.contactUsPhoneNumber,
    });
  };

  const onLanguagePress = () => {
    navigation.navigate('Language', {
      appStyles: AppStyles,
      screenTitle: IMLocalized('Language'),
      form: ChatConfig.editLanguageField,
    });
  };

  const onSharingPress = () => {
    amplitude.getInstance().logEvent("refer friend");
    const shareOptions = {
      title: 'Join Trice!',
      message: 'Hi! Check out Trice, it\'s a great messaging app with real-time translations. https://play.google.com/store/apps/details?id=io.trice.chat.rn&hl=en_US&gl=US'
    };
    Share.open(shareOptions);
  };

  const onUpdateUser = (newUser) => {
    props.setUserData({ user: newUser });
  };

  const onLogout = () => {
    authManager.logout(props.user);
    props.logout();
    props.navigation.navigate('LoadScreen', {
      appStyles: AppStyles,
      appConfig: ChatConfig,
    });
  };

  const menuItems = [
    {
      title: IMLocalized('Account Details'),
      icon: require('../../CoreAssets/account-details-icon.png'),
      tintColor: '#6b7be8',
      onPress: onAccountDetailsPress,
      theme: {
        light: ['#B57BE6', '#B57BE6'],
        dark: ['#FD63F0', '#FFBEC0'],
        'no-preference': ['#B57BE6', '#B57BE6'],
      },
    },
    {
      title: IMLocalized('Settings'),
      icon: require('../../CoreAssets/settings-icon.png'),
      tintColor: '#777777',
      onPress: onSettingsPress,
      theme: {
        light: ['#6385E6', '#6385E6'],
        dark: ['#DE85FF', '#6385E6'],
        'no-preference': ['#6385E6', '#6385E6'],
      },
    },
    {
      title: IMLocalized('Language'),
      icon: require('../../CoreAssets/language-icon.png'),
      tintColor: '#22B0DC',
      onPress: onLanguagePress,
      theme: {
        light: ['#9E9AFF', '#9E9AFF'],
        dark: ['#BDC7FF', '#8387FF'],
        'no-preference': ['#9E9AFF', '#9E9AFF'],
      },
    },
    {
      title: IMLocalized('Share'),
      icon: require('../../CoreAssets/share.png'),
      tintColor: '#22B0DC',
      onPress: onSharingPress,
      theme: {
        light: ['#67cfbd', '#67cfbd'],
        dark: ['#BDE7FF', '#5FB3FD'],
        'no-preference': ['#9E9AFF', '#9E9AFF'],
      },
    },
    {
      title: IMLocalized('Contact Us'),
      icon: require('../../CoreAssets/contact-us-icon.png'),
      tintColor: '#9ee19f',
      onPress: onContactUsPress,

      theme: {
        light: ['#7BB8E7', '#7BB8E7'],
        dark: ['#BDE7FF', '#5FB3FD'],
        'no-preference': ['#7BB8E7', '#7BB8E7'],
      },
    },
  ];

  return (
    <IMUserProfileComponent
      user={props.user}
      onUpdateUser={onUpdateUser}
      onLogout={onLogout}
      menuItems={menuItems}
      appStyles={AppStyles}
    />
  );
};

MyProfileScreen.navigationOptions = ({ screenProps, navigation }) => {
  const currentTheme = AppStyles.navThemeConstants[screenProps.theme];
  return {
    title: IMLocalized('My Profile'),
    headerStyle: {
      backgroundColor: currentTheme.backgroundColor,
    },
    headerTitleStyle: {
      color: currentTheme.fontColor,
    },
    headerLeft: (
      <TNTouchableIcon
        imageStyle={{ tintColor: currentTheme.fontColor }}
        iconSource={AppStyles.iconSet.menuHamburger}
        onPress={navigation.openDrawer}
        appStyles={AppStyles}
      />
    ),
    header: (
      <CustomHeader
        headerTitle={IMLocalized('Settings')}
        currentTheme={currentTheme}
        params={navigation}
      />
    ),
  };
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, { logout, setUserData })(
  MyProfileScreen,
);
