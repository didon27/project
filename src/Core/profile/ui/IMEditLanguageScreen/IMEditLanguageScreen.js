import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { IMLocalized } from '../../../localization/IMLocalization';
import { setUserData } from '../../../onboarding/redux/auth';
import { firebaseUser } from '../../../firebase';
import IMFormComponent from '../IMFormComponent/IMFormComponent';
import CustomHeader from '../components/SettingsCustomHeader';

class IMEditLanguageScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    let appStyles = navigation.state.params.appStyles;
    let screenTitle = navigation.state.params.screenTitle || IMLocalized('Language');
    let currentTheme = appStyles.navThemeConstants[screenProps.theme];
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

    this.state = {
      form: props.form,
      alteredFormDict: {}
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
          amplitude.getInstance().logEvent("user language", {
            [field.key]: alteredFormDict[field.key],
          });
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

  render() {
    return (
      <IMFormComponent
        form={this.form}
        initialValuesDict={this.props.user}
        onFormChange={this.onFormChange}
        navigation={this.props.navigation}
        appStyles={this.appStyles}
        onFormButtonPress={this.onFormButtonPress}
      />
    );
  }
}

IMEditLanguageScreen.propTypes = {
  user: PropTypes.object,
  setUserData: PropTypes.func,
};

const mapStateToProps = ({ auth }) => {
  return {
    user: auth.user,
  };
};

export default connect(mapStateToProps, { setUserData })(IMEditLanguageScreen);
