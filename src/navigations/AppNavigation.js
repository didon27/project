import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createReduxContainer } from 'react-navigation-redux-helpers';
import { createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import DynamicAppStyles from '../DynamicAppStyles';
import DrawerContainer from '../components/DrawerContainer/DrawerContainer';
import TabContainer from '../components/TabContainer/TabContainer';

import { IMChatScreen } from '../Core/chat';
import TranslateSettings from '../Core/chat/TranslateSettings';
import { IMFriendsScreen, IMCreateGroupScreen } from '../Core';
import {
  IMEditProfileScreen,
  IMUserSettingsScreen,
  IMContactUsScreen,
  IMEditLanguageScreen,
} from '../Core/profile';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import LoginScreen from '../Core/onboarding/LoginScreen/LoginScreen';
import Verification from '../Core/onboarding/SignupScreen/Verification';
import SignupScreen from '../Core/onboarding/SignupScreen/SignupScreen';
import ResetPasswordScreen from '../Core/onboarding/ResetPasswordScreen';
import WelcomeScreen from '../Core/onboarding/WelcomeScreen/WelcomeScreen';
import WalkthroughScreen from '../Core/onboarding/WalkthroughScreen/WalkthroughScreen';
import LoadScreen from '../Core/onboarding/LoadScreen/LoadScreen';
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen';
import SmsAuthenticationScreen from '../Core/onboarding/SmsAuthenticationScreen/SmsAuthenticationScreen';
import ChatConfig from '../config';
import styles from './styles';

const LoginStack = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Verification: { screen: Verification },
    Signup: { screen: SignupScreen },
    ResetPassword: { screen: ResetPasswordScreen },
    Welcome: { screen: WelcomeScreen },
    Sms: { screen: SmsAuthenticationScreen },
  },
  {
    initialRouteName: 'Welcome',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      appConfig: ChatConfig,
    },
    headerMode: 'none',
  },
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    PersonalChat: { screen: IMChatScreen },
    CreateGroup: { screen: IMCreateGroupScreen },
    TranslateSettings: { screen: TranslateSettings },
  },
  {
    initialRouteName: 'Home',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
    },
    headerMode: 'float',
    headerLayoutPreset: 'center',
    navigationOptions: ({ navigation }) => ({
      // headerTintColor:
      //   DynamicAppStyles.navThemeConstants[colorScheme].mainThemeForegroundColor,
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: { backgroundColor: '#FFFFFF' },
  },
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const FriendsStack = createStackNavigator(
  {
    Friends: { screen: IMFriendsScreen },
  },
  {
    initialRouteName: 'Friends',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      showDrawerMenuButton: true,
    },
    headerMode: 'float',
    headerStyle: { backgroundColor: 'red' },
    // backgroundColor:
    //   DynamicAppStyles.navThemeConstants[colorScheme].mainThemeBackgroundColor,
  },
);

FriendsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const MyProfileStack = createStackNavigator(
  {
    MyProfile: { screen: MyProfileScreen },
    AccountDetails: { screen: IMEditProfileScreen },
    Settings: { screen: IMUserSettingsScreen },
    ContactUs: { screen: IMContactUsScreen },
    Language: { screen: IMEditLanguageScreen },
  },
  {
    initialRouteName: 'MyProfile',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      showDrawerMenuButton: true,
    },
    headerMode: 'float',
    headerLayoutPreset: 'center',
    navigationOptions: ({ navigation }) => ({
      // headerTintColor:
      //   DynamicAppStyles.navThemeConstants[colorScheme].mainThemeForegroundColor,
      headerTitleStyle: styles.headerTitleStyle,
    }),
    cardStyle: {
      // backgroundColor:
      //   DynamicAppStyles.navThemeConstants[colorScheme].mainThemeForegroundColor,
    },
  },
);

MyProfileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

// drawer stack
// const DrawerStack = createDrawerNavigator(
//   {
//     HomeStack,
//     FriendsStack,
//     MyProfileStack,
//   },
//   {
//     drawerPosition: 'left',
//     initialRouteName: 'HomeStack',
//     drawerWidth: 270,
//     contentComponent: DrawerContainer,
//   },
// );

// drawer stack
const TabStack = createBottomTabNavigator(
  {
    HomeStack,
    // CallStack: HomeStack,
    // StoryStack: HomeStack,
    FriendsStack,
    MyProfileStack,
  },
  {
    tabBarComponent: TabContainer,
  },
);

const DrawerStack = createDrawerNavigator(
  {
    HomeStack: TabStack,
    FriendsStack,
    MyProfileStack,
  },
  {
    drawerPosition: 'left',
    initialRouteName: 'HomeStack',
    drawerWidth: 270,
    contentComponent: DrawerContainer,
  },
);
// Manifest of possible screens
const RootNavigator = createSwitchNavigator(
  {
    LoadScreen: { screen: LoadScreen },
    Walkthrough: { screen: WalkthroughScreen },
    LoginStack: { screen: LoginStack },
    MainStack: { screen: TabStack },
  },
  {
    initialRouteName: 'LoginStack',
    initialRouteParams: {
      appStyles: DynamicAppStyles,
      appConfig: ChatConfig,
    },
    cardStyle: {
      // backgroundColor:
      //   DynamicAppStyles.navThemeConstants[colorScheme].mainThemeBackgroundColor,
    },
  },
);

const AppContainer = createReduxContainer(RootNavigator);

const mapStateToProps = (state) => ({
  state: state.nav,
});

const AppNavigator = connect(mapStateToProps)(AppContainer);

export { RootNavigator, AppNavigator };
