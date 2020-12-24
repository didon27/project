import { Platform, Dimensions, StatusBar } from 'react-native';
import invert from 'invert-color';
import TNColor from './Core/truly-native/TNColor';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const lightColorSet = {
  mainThemeBackgroundColor: '#F9FAFD',
  screenHeader: '#B4BBC9',
  mainTextColor: '#333333',
  mainSubtextColor: '#929292',
  mainThemeForegroundColor: '#ffffff',
  hairlineColor: '#e0e0e0',
  grey0: '#eaeaea',
  grey3: '#e6e6f2',
  grey6: '#d6d6d6',
  grey9: '#939393',
  grey10: '#6D6E71',
  whiteSmoke: '#f5f5f5',
  grey: 'grey',
  logoColor: '#ffffff',
  border: '#B4BBC9',
  inputOutline: '#6385E6',
};

const darkColorSet = {
  mainThemeBackgroundColor: '#21223D',
  screenHeader: '#B4BBC9',
  mainTextColor: '#EAEAEE',
  mainSubtextColor: '#6E6F86',
  mainThemeForegroundColor: '#2D2E45',
  hairlineColor: TNColor('#e0e0e0'),
  grey0: TNColor('#eaeaea'),
  grey3: TNColor('#e6e6f2'),
  grey6: TNColor('#d6d6d6'),
  grey9: TNColor('#939393'),
  grey10: TNColor('#6D6E71'),
  whiteSmoke: TNColor('#f5f5f5'),
  grey: 'grey',
  logoColor: '#707070',
  border: '#4B5063',
  inputOutline: '#707070',
};

const colorSet = {
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
};

const navLight = {
  backgroundColor: '#21223D',
  gradientColors: ['#B36AE8', '#6385E6'],
  fontColor: '#fff',
  mainTextColor: '#fff',
  mainSubtextColor: '#fff',
  headerStyleColor: '#E8E8E8',
  iconBackground: '#F4F4F4',
  headerIconBackground: '#FFFFFF',
};

const navThemeConstants = {
  light: navLight,
  dark: {
    backgroundColor: '#21223D',
    gradientColors: ['#46476A', '#46476A'],
    fontColor: '#EAEAEE',
    mainTextColor: '#fff',
    mainSubtextColor: '#A3A4B3',
    headerStyleColor: '21223D',
    iconBackground: '#21223D',
    headerIconBackground: '#FFFFFF',
  },
  'no-preference': navLight,
};

const fontFamily = {
  system: Platform.OS === 'ios' ? 'SFProDisplay-Semibold' : '0',
};

const iconSet = {
  logo: require('../assets/icons/chat-logo.png'),
  menuHamburger: require('./CoreAssets/hamburger-menu-icon.png'),
  playButton: require('./CoreAssets/play-button.png'),
  home: require('../assets/icons/home-icon.png'),
  add_user: require('../assets/icons/add-user-icon.png'),
  add_user_filled: require('../assets/icons/add-user-icon-filled.png'),
  camera_filled: require('../assets/icons/camera-filled-icon.png'),
  camera: require('../assets/icons/camera-icon.png'),
  chat: require('../assets/icons/chat-icon.png'),
  close: require('../assets/icons/close-x-icon.png'),
  checked: require('../assets/icons/checked-icon.png'),
  delete: require('../assets/icons/delete.png'),
  friends: require('../assets/icons/friends-icon.png'),
  inscription: require('../assets/icons/inscription-icon.png'),
  menu: require('../assets/icons/menu.png'),
  private_chat: require('../assets/icons/private-chat-icon.png'),
  search: require('../assets/icons/search-icon.png'),
  profile: require('../assets/icons/profile.png'),
  users: require('../assets/icons/users.png'),
  user: require('../assets/icons/user.png'),
  share: require('../assets/icons/share-icon.png'),
  mail: require('../assets/icons/mail.png'),
  lock: require('../assets/icons/lock.png'),
  edit: require('../assets/icons/edit.png'),
  // defaultUser: require('../assets/icons/default_user.jpg'),
  accountDetail: require('../assets/icons/account-detail.png'),
  settings: require('../assets/icons/settings.png'),
  language: require('../assets/icons/language.png'),
  contactUs: require('../assets/icons/contact-us.png'),
  logout: require('../assets/icons/shutdown.png'),
  userAvatar: require('../assets/icons/default-avatar.jpg'),
  addCamera: require('../assets/icons/add-camera.png'),
  backArrow: require('../assets/icons/backArrow.png'),
  logout: require('../assets/icons/shutdown.png'),
};

let iconData = {
  HomeStack: {
    icon: "chatbubble-ellipses-outline",
    name: 'Chat',
    type:'Ionicons'
  },
  // CallStack: {
  //   icon: require('../assets/icons/contact-us.png'),
  //   name: 'Call',
  // },
  // StoryStack: {
  //   icon: require('../assets/icons/camera-icon.png'),
  //   name: 'Story',
  // },
  FriendsStack: {
    icon: "contacts",
    name: 'Contacts',
    type:'AntDesign'
  },
  MyProfileStack: {
    icon:'user-o',
    name: 'profile',
    type:'FontAwesome'
  },
};

const tabIcons = {
  light: {
    focus: ['#6385E6', '#6385E6'],
    unFocus: ['#A4AFCF', '#A4AFCF'],
    ...iconData,
  },
  dark: {
    focus: ['#B36AE8', '#6385E6'],
    unFocus: ['#6E6F86', '#6E6F86'],
    ...iconData,
  },
  'no-preference': {
    focus: ['#6385E6', '#6385E6'],
    unFocus: ['#A4AFCF', '#A4AFCF'],
    ...iconData,
  },
};

const fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20,
};

const loadingModal = {
  color: '#FFFFFF',
  size: 20,
  overlayColor: 'rgba(0,0,0,0.5)',
  closeOnTouch: false,
  loadingType: 'Spinner', // 'Bubbles', 'DoubleBounce', 'Bars', 'Pulse', 'Spinner'
};

const sizeSet = {
  buttonWidth: '65%',
  inputWidth: WINDOW_WIDTH * 0.8,
  radius: 9,
};

const buttonSetLight = {
  colors: ['#6385E6', '#6385E6'],
  colorFilled: '#FFFFFF',
  colorOutlined: '#6385E6',
  butonBackGround: '#6385E6',
};

const buttonSetDark = {
  colors: ['#5E4FFC', '#857DDA'],
  colorFilled: '#EAEAEE',
  colorOutlined: '#857DDA',
  butonBackGround: '#5C4DF7',
};

const buttonSet = {
  width: WINDOW_WIDTH * 0.8,
  size: 15,
  lineHeight: 19,
  radius: 9,
  height: 52,
  light: buttonSetLight,
  dark: buttonSetDark,
  'no-preference': buttonSetLight,
};

const socialIconSet = {
  light: {
    facebook: ['#5B76AF', '#5B76AF'],
    twitter: ['#009FDA', '#009FDA'],
    'google-plus': ['#DB685A', '#DB685A'],
  },
  dark: {
    facebook: ['#578BDF', '#39589A'],
    twitter: ['#009FDA', '#00CDEF'],
    'google-plus': ['#F48476', '#D3483C'],
  },
  'no-preference': {
    facebook: ['#5B76AF', '#5B76AF'],
    twitter: ['#009FDA', '#009FDA'],
    'google-plus': ['#DB685A', '#DB685A'],
  },
};

const styleSet = {
  menuBtn: {
    container: {
      backgroundColor: colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    icon: {
      tintColor: 'black',
      width: 16,
      height: 16,
    },
  },
  searchBar: {
    container: {
      marginLeft: Platform.OS === 'ios' ? 30 : 0,
      backgroundColor: 'transparent',
      borderBottomColor: 'transparent',
      borderTopColor: 'transparent',
      flex: 1,
    },
    input: {
      backgroundColor: colorSet.inputBgColor,
      borderRadius: 10,
    },
  },
  rightNavButton: {
    marginRight: 10,
  },
  backArrowStyle: {
    resizeMode: 'center',
    tintColor: '#EAEAEE',
    width: 30,
    height: 30,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    marginLeft: 10,
  },
  light: {
    backArrowStyle: {
      resizeMode: 'center',
      tintColor: '#333333',
      width: 30,
      height: 30,
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
    },
  },
  dark: {
    backArrowStyle: {
      resizeMode: 'center',
      tintColor: '#EAEAEE',
      width: 30,
      height: 30,
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
    },
  },
  'no-preference': {
    backArrowStyle: {
      resizeMode: 'center',
      tintColor: '#333333',
      width: 30,
      height: 30,
      marginTop: Platform.OS === 'ios' ? 50 : 20,
      marginLeft: 10,
    },
  },
};

const StyleDict = {
  fontFamily,
  colorSet,
  navThemeConstants,
  fontSet,
  sizeSet,
  iconSet,
  tabIcons,
  buttonSet,
  styleSet,
  socialIconSet,
  loadingModal,
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  STATUSBAR_HEIGHT,
};

export default StyleDict;
