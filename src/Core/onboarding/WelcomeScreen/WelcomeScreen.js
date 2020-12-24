import React, { useState, useEffect } from 'react';
import firebase from 'react-native-firebase';
import { Text, View, Image } from 'react-native';
// import Button from 'react-native-button';
import StatusBar from '../../ui/StatusBar/StatusBar';
import Button from '../../ui/Button/Button';
import Logo from '../../ui/Logo/Logo';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import { IMLocalized } from '../../localization/IMLocalization';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import { setUserData } from '../redux/auth';
import { connect } from 'react-redux';
import authManager from '../utils/authManager';

const WelcomeScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam('appConfig');

  useEffect(() => {
    tryToLoginFirst();
  }, []);

  const tryToLoginFirst = async () => {
    setIsLoading(true);
    authManager.retrievePersistedAuthUser().then((response) => {
      setIsLoading(false);
      if (response) {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user && user.emailVerified) {
            const user = response.user;
            props.setUserData(user);
            props.navigation.navigate('MainStack', { user: user });
          }
          else {
            console.log('Not verified');
          }
        });
      }
    });
  };

  if (isLoading == true) {
    return <TNActivityIndicator appStyles={appStyles} />;
  }

  return (
    <View style={styles.root}>
      <StatusBar appStyles={appStyles} />
      <View style={styles.container}>
        <Logo appStyles={appStyles} appConfig={appConfig} />
        <Text style={styles.caption}>
          {appConfig.onboardingConfig.welcomeCaption}
        </Text>
        <Button
          containerStyle={styles.loginContainer}
          style={styles.loginText}
          gradientColors={appStyles.buttonSet[colorScheme].colors}
          onPress={() => {
            appConfig.isSMSAuthEnabled
              ? props.navigation.navigate('Sms', {
                  isSigningUp: false,
                  appStyles,
                  appConfig,
                })
              : props.navigation.navigate('Login', { appStyles, appConfig });
          }}>
          {IMLocalized('Log In')}
        </Button>
        <Button
          containerStyle={styles.signupContainer}
          style={styles.signupText}
          gradientColors={appStyles.buttonSet[colorScheme].colors}
          gradient={false}
          onPress={() => {
            appConfig.isSMSAuthEnabled
              ? props.navigation.navigate('Sms', {
                  isSigningUp: true,
                  appStyles,
                  appConfig,
                })
              : props.navigation.navigate('Signup', { appStyles, appConfig });
          }}>
          {IMLocalized('Sign Up')}
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, {
  setUserData,
})(WelcomeScreen);
