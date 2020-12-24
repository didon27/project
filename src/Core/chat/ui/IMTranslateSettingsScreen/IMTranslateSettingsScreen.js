import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  BackHandler,
  Text,
  StyleSheet,
  TouchableHighlight,
  View,
  Picker,
 } from 'react-native';
import { connect } from 'react-redux';
import TextButton from 'react-native-button';
import { firebaseUser } from '../../../firebase';
import { setUserData } from '../../../onboarding/redux/auth';
import { channelManager } from '../../firebase';
import { IMLocalized } from '../../../localization/IMLocalization';
import CustomHeader from '../../../profile/ui/components/SettingsCustomHeader';

class IMTranslateSettingsScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let appStyles = navigation.state.params.appStyles;
    let screenTitle = navigation.state.params.screenTitle || IMLocalized('Translate Settings');
    let currentTheme = appStyles.navThemeConstants[screenProps.theme];
    const { params = {} } = navigation.state;

    return {
      headerTitle: screenTitle,
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTintColor: currentTheme.fontColor,
      header: (
        <CustomHeader
          headerTitle={IMLocalized(screenTitle)}
          currentTheme={currentTheme}
          navigation={navigation}
          shouldFormSubmit={false}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.appStyles = props.navigation.getParam('appStyles') || props.appStyles;
    this.form = props.navigation.getParam('form') || props.form;
    this.channelId = props.navigation.getParam('channelId');
    this.userId = props.navigation.getParam('userId');
    this.languageOptions = props.navigation.getParam('languageOptions');
    this.updateLanguages = props.navigation.getParam('updateLanguages');

    this.state = {
      form: props.form,
      alteredFormDict: {},
      languageTo: 'En',
      languageFrom: 'En',
      translate: false,
    };


    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      payload =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentDidMount() {
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      payload =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onFormSubmit = () => {
    var newUser = this.props.user;
    const form = this.form;
    const alteredFormDict = this.state.alteredFormDict;
    var allFieldsAreValid = true;

    form.sections.forEach(section => {
      section.fields.forEach(field => {
        const newValue = alteredFormDict[field.key];
        if (newValue != null) {
          newUser[field.key] = alteredFormDict[field.key];
        }
      });
    });

    firebaseUser.updateUserData(this.props.user.id, newUser);
    this.props.setUserData({ user: newUser });
    this.props.navigation.goBack();
    if (this.onComplete) {
      this.onComplete();
    }
  };

  onFormChange = alteredFormDict => {
    this.setState({ alteredFormDict });
  };

  onFormButtonPress = buttonField => {
    this.onFormSubmit();
  }

  onSetLanguages = () => {
    const translate = this.state.translate;
    var languageTo = this.state.languageTo;
    var languageFrom = this.state.languageFrom;
    channelManager.updateChannelLanguages(
      this.channelId,
      this.userId,
      languageFrom,
      languageTo,
    );
    var languages = { from: languageFrom, to: languageTo };
    this.setState({
      selectedLanguages: languages,
      modalVisible: false,
    });
    this.setState({ translate: !translate });
    this.props.navigation.setParams({ translate: !translate });
    this.updateLanguages(languageFrom, languageTo);
  };

  render() {
    return (
      <View style={this.appStyles.container}>
        <Text style={styles.langText}>Translate From:</Text>
        <Picker
          selectedValue={this.state.languageTo}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => this.setState({languageTo: itemValue})}
        >
          {this.languageOptions && this.languageOptions.map((item, index) => {
            return (<Picker.Item label={item} value={item} key={index}/>)
          })}
        </Picker>
        <Text style={styles.langText}>Translate To:</Text>
        <Picker
          selectedValue={this.state.languageFrom}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) => this.setState({languageFrom: itemValue})}
        >
          {this.languageOptions && this.languageOptions.map((item, index) => {
            return (<Picker.Item label={item} value={item} key={index}/>)
          })}
        </Picker>
        <TouchableHighlight
          style={{ ...styles.openButton, backgroundColor: "#44339C" }}
          onPress={() => this.onSetLanguages()}
        >
          <Text style={styles.textStyle}>Set Languages</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  langText: {
    marginBottom: 15,
    textAlign: "center"
  },
});

IMTranslateSettingsScreen.propTypes = {
  user: PropTypes.object,
  setUserData: PropTypes.func,
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, { setUserData })(IMTranslateSettingsScreen);
