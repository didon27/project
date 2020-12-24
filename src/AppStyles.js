import { Dimensions, Platform, StatusBar } from 'react-native';
import TNColor from './Core/truly-native/TNColor';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios' ? getStatusBarHeight() : StatusBar.currentHeight;
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const lightColorSet = {
  mainThemeBackgroundColor: '#F9FAFD',
  mainThemeForegroundColor: '#4395f8',
  mainTextColor: '#000000',
  mainSubtextColor: '#7e7e7e',
  hairlineColor: '#d6d6d6',
  grayBgColor: '#F5F5F5',
  lightGrey: '#e6e6ff',
  onlineMarkColor: '#41C61B',
  inputBgColor: '#E8E8E8',
  main: '#5ea23a',
  text: '#696969',
  title: '#464646',
  subtitle: '#545454',
  categoryTitle: '#161616',
  tint: '#4395f8',
  description: '#bbbbbb',
  filterTitle: '#8a8a8a',
  starRating: '#2bdf85',
  location: '#a9a9a9',
  white: 'white',
  facebook: '#44339C',
  grey: 'grey',
  greenBlue: '#00aea8',
  placeholder: '#a0a0a0',
  background: '#f2f2f2',
  blue: '#3293fe',
  black: '#000000',
  shadeBlack: '#1D1D1D',
  shadeLightGrey: '#CCCCCC',
};

const darkColorSet = {
  mainThemeBackgroundColor: '#21223D',
  mainThemeForegroundColor: TNColor('#4395f8'),
  mainTextColor: TNColor('#000000'),
  mainSubtextColor: TNColor('#7e7e7e'),
  hairlineColor: TNColor('#d6d6d6'),
  grayBgColor: TNColor('#F5F5F5'),
  lightGrey: TNColor('#e6e6ff'),
  onlineMarkColor: TNColor('#41C61B'),
  inputBgColor: TNColor('#E8E8E8'),
  main: TNColor('#5ea23a'),
  text: TNColor('#696969'),
  title: TNColor('#464646'),
  subtitle: TNColor('#545454'),
  categoryTitle: TNColor('#161616'),
  tint: TNColor('#4395f8'),
  description: TNColor('#bbbbbb'),
  filterTitle: TNColor('#8a8a8a'),
  starRating: TNColor('#2bdf85'),
  location: TNColor('#a9a9a9'),
  white: TNColor('#ffffff'),
  facebook: TNColor('#44339C'),
  grey: TNColor('#808080'),
  greenBlue: TNColor('#00aea8'),
  placeholder: TNColor('#a0a0a0'),
  background: TNColor('#f2f2f2'),
  blue: TNColor('#3293fe'),
  black: TNColor('#000000'),
  shadeBlack: TNColor('#1D1D1D'),
  shadeLightGrey: TNColor('#CCCCCC'),
};

const _colorSet = {
  light: lightColorSet,
  dark: darkColorSet,
  'no-preference': lightColorSet,
};

const _fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
  title: 30,
  content: 20,
  normal: 16,
};

const fontFamily = {
  Gilroy_Gallery: 'Gilroy Gallery',
  Gilroy_Regular: 'Gilroy-Regular',
  GilroyBlack: 'Gilroy-Black',
  GilroyLight: 'Gilroy-Light',
  GilroySemibold: 'Gilroy-Semibold',
  Gilroybold: 'Gilroy-Bold',
  GilroyExtrabold: 'Gilroy-Extrabold',
  GilroyMediumItalic: 'Gilroy-MediumItalic',
  GilroyMedium: 'Gilroy-Medium',
  avenir: 'avenir-Roman',
  ShadowsLight: 'ShadowsIntoLight',
  boldFont: 'Oswald-Bold',
  semiBoldFont: 'Oswald-SemiBold',
  regularFont: 'Oswald-Regular',
  mediumFont: 'Oswald-Medium',
  lightFont: 'Oswald-Light',
  extraLightFont: 'Oswald-ExtraLight',
};
const _sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 25,
};

const _iconSet = {
  logo: require('../assets/icons/chat-logo.png'),
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
  logout: require('../assets/icons/shutdown.png'),
  userAvatar: require('../assets/icons/default-avatar.jpg'),
  addCamera: require('../assets/icons/add-camera.png'),
};

const _styleSet = {
  menuBtn: {
    container: {
      backgroundColor: _colorSet.grayBgColor,
      borderRadius: 22.5,
      padding: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    icon: {
      tintColor: 'black',
      width: 15,
      height: 15,
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
      backgroundColor: _colorSet.inputBgColor,
      borderRadius: 10,
      color: 'black',
    },
  },
  rightNavButton: {
    marginRight: 10,
  },
  borderRadius: {
    main: 25,
    small: 5,
  },
};

const StyleDict = {
  colorSet: _colorSet,
  iconSet: _iconSet,
  sizeSet: _sizeSet,
  fontSet: _fontSet,
  styleSet: _styleSet,
  windowW: WINDOW_WIDTH,
  windowH: WINDOW_HEIGHT,
  statusBarHeight: STATUSBAR_HEIGHT,
  fontFamily,
};

export default StyleDict;
