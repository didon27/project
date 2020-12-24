import React, { useState,useEffect} from 'react';
import {
  Text,
  TextInput,
  View,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
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
import SentIMG from '../../../CoreAssets/sent.png'
import RNPickerSelect from 'react-native-picker-select';
import amplitude from '../../../../amplitude';

const Verification = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [languages,setLanguages] = useState([])
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



  const VerificationText = () => {
    return (
      <>



        <View style={{paddingTop:50}}>
          <View style={{height:200,alignItems:'center'}}>
            <Image style={{flex:1}} resizeMode={"contain"} source={SentIMG}/>
          </View>
          <View style={{alignItems:'center',marginTop:50}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#25314B'}}>Check your email</Text>
            <Text style={{fontSize:16,textAlign:'center',width:'70%',lineHeight:30,marginTop:15,color:"#	CDD0D9"}}>To confirm your email address, click the link in the email we sent you.</Text>
          </View>
        </View>
        <Button
          containerStyle={styles.signUpButtonContainer}
          style={styles.signUpText}
          gradientColors={appStyles.buttonSet[colorScheme].colors}
          onPress={() => props.navigation.navigate('Login', { appStyles, appConfig })}>
          {IMLocalized('Login')}
        </Button>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <View style={{ marginTop: 10 }}>
        </View>

        {VerificationText()}

      </KeyboardAwareScrollView>
      {loading && <TNActivityIndicator appStyles={appStyles} />}
    </View>
  );
};

export default connect(null, {
})(Verification);
