import React, { useState,useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
// import Button from 'react-native-button';
import SocialIcon from '../../ui/SocialButton/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import StatusBar from '../../ui/StatusBar/StatusBar';
import Button from '../../ui/Button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import TNActivityIndicator from '../../truly-native/TNActivityIndicator';
import TNProfilePictureSelector from '../../truly-native/TNProfilePictureSelector/TNProfilePictureSelector';
import { IMLocalized } from '../../localization/IMLocalization';
import { setUserData } from '../redux/auth';
import { connect } from 'react-redux';
import authManager from '../utils/authManager';
import { localizedErrorMessage } from '../utils/ErrorCode';
import TermsOfUseView from '../components/TermsOfUseView';
import ChatConfig from '../../../config.js';
import RNPickerSelect from 'react-native-picker-select';
import amplitude from '../../../../amplitude';

const SignupScreen = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [languages,setLanguages] = useState([]);
  const [language,setLanguage] = useState("");
  const [languageError,setLanguageError] = useState(false)

  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const appConfig =
    props.navigation.state.params.appConfig ||
    props.navigation.getParam('appConfig');
  const appStyles =
    props.navigation.state.params.appStyles ||
    props.navigation.getParam('appStyles');
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  useEffect(() => {
    let nwArr = [];
    ChatConfig.languageOptions.map(lan => {
        nwArr.push({label:lan.text,value:lan.value})
    })
    setLanguages(nwArr)
  },[])

  const onRegister = () => {
    if(language) {
    setLoading(true);

    const userDetails = {
      firstName,
      lastName,
      email,
      password,
      photoURI: profilePictureURL,
      appIdentifier: appConfig.appIdentifier,
    };
    authManager
      .createAccountWithEmailAndPassword(userDetails, appConfig.appIdentifier)
      .then((response) => {
        const user = response.user;
        if (user) {
          props.setUserData({ user: user });
          const db = firebase.database();
          var ref = db.ref("users/" + user.id);

          ref.set({from:"",to:language});
          // props.navigation.navigate('MainStack', { user: user });
          // props.navigation.popToTop()
          props.navigation.navigate('Verification', { appStyles, appConfig });
        } else {
          Alert.alert(
            '',
            localizedErrorMessage(response.error),
            [{ text: IMLocalized('OK') }],
            {
              cancelable: false,
            },
          );
        }
        setLoading(false);
      });
      amplitude.getInstance().logEvent("signup");
    } else {
      setLanguageError(true);
    }
  };

  const renderSocialIcons = () => {
    return (
      <React.Fragment>
        <View style={styles.separator}>
          <View style={[styles.separatorLine]} />
          <Text style={styles.separatorText}>{IMLocalized('OR')}</Text>
          <View style={[styles.separatorLine]} />
        </View>
        <View style={styles.socialIcons}>
          <SocialIcon
            onPress={() => onFBButtonPress()}
            containerStyle={styles.socialIconContainer}
            gradientColors={appStyles.socialIconSet[colorScheme]['facebook']}>
            <Icon name="facebook" color="#fff" size={25}></Icon>
          </SocialIcon>
          <SocialIcon
            onPress={() => onFBButtonPress()}
            containerStyle={styles.socialIconContainer}
            gradientColors={appStyles.socialIconSet[colorScheme]['twitter']}>
            <Icon name="twitter" color="#fff" size={25}></Icon>
          </SocialIcon>
          <SocialIcon
            onPress={() => onFBButtonPress()}
            gradientColors={appStyles.socialIconSet[colorScheme]['google-plus']}
            containerStyle={styles.socialIconContainer}>
            <Icon name="google-plus" color="#fff" size={20}></Icon>
          </SocialIcon>
        </View>
      </React.Fragment>
    );
  };

  const renderSignupWithEmail = () => {
    return (
      <>
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('First Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('Last Name')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
          underlineColorAndroid="transparent"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('E-mail Address')}
          placeholderTextColor="#aaaaaa"
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.InputContainer}
          placeholder={IMLocalized('Password')}
          placeholderTextColor="#aaaaaa"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          />
        {
           languageError && (<View style={{paddingHorizontal:45,top:18}}>
            <Text style={{color:'#ED4337'}}>this field is required*</Text>
           </View>)
        }
             <View  style={[styles.InputContainer,{justifyContent:'center',alignItems:'center',borderWidth:languageError?1:0,borderColor:'#ED4337'}]}>

             <RNPickerSelect
               value={language}
                onValueChange={(value) => setLanguage(value)}
                items={languages}
                placeholder={{label:"select a language"}}
            />
        </View>
        <View style={[styles.goToLinkContainer,{alignItems:'center'}]}>

          <Text style={styles.goToLinkText}>
            {IMLocalized('Already have an account? ')}
          </Text>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login', { appStyles, appConfig })}>
            <Text
              style={[
                styles.goToLinkText,
                { color: appStyles.colorSet[colorScheme].mainTextColor, marginBottom: 20},
              ]}>
              {IMLocalized('Sign In')}
            </Text>
          </TouchableOpacity>
        </View>
        <Button
          containerStyle={styles.signUpButtonContainer}
          style={styles.signUpText}
          gradientColors={appStyles.buttonSet[colorScheme].colors}
          onPress={() => onRegister()}>
          {IMLocalized('Sign Up')}
        </Button>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={appStyles.styleSet[colorScheme].backArrowStyle}
            source={appStyles.iconSet.backArrow}
          />
        </TouchableOpacity>
        {/* <Text style={styles.title}>{IMLocalized('Create new account')}</Text> */}
        <View style={{ marginTop: 10 }}>
          <TNProfilePictureSelector
            setProfilePictureURL={setProfilePictureURL}
            appStyles={appStyles}
          />
        </View>

        {renderSignupWithEmail()}
        {/*{renderSocialIcons()}*/}
    { /*   {appConfig.isSMSAuthEnabled && (
          <>
            <View style={[styles.goToLinkContainer]}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Sms', {
                    isSigningUp: true,
                    appStyles,
                    appConfig,
                  })
                }>
                <Text
                  style={[
                    styles.goToLinkText,
                    { color: appStyles.colorSet[colorScheme].mainTextColor },
                  ]}>
                  {IMLocalized('Sign Up')}
                </Text>
              </TouchableOpacity>
              <Text style={styles.goToLinkText}>
                {IMLocalized(' with phone number')}
              </Text>
            </View>
            <Button
              containerStyle={styles.PhoneNumberContainer}
              onPress={() =>
                props.navigation.navigate('Sms', {
                  isSigningUp: true,
                  appStyles,
                  appConfig,
                })
              }>
              {IMLocalized('Sign up with phone number')}
            </Button>
          </>
        )}  */}
        <TermsOfUseView
          tosLink={appConfig.tosLink}
          style={styles.tos}
          textStyle={styles.tosText}
          linkStyle={styles.tosLink}
        />
      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
};

export default connect(null, {
  setUserData,
})(SignupScreen);
