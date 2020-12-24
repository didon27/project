'use strict';

import React, { Component } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'react-native-firebase';
import { IMLocalized } from '../../localization/IMLocalization';

import CustomHeader from '../../profile/ui/components/SettingsCustomHeader';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: this.props.modalVisible || false,
      languageOptions: this.props.navigation.state.params.languageOptions || [],
      channelId: this.props.channelId || '',
      userId: this.props.navigation.state.params.userId || '',
      languageTo: 'En',
      languageFrom: 'En',
      langs: [],
      userId: '',
    };
  }
  static navigationOptions = ({ screenProps, navigation }) => {
    let appStyles = navigation.state.params.appStyles;
    let screenTitle =
      navigation.state.params.screenTitle || IMLocalized('Translate Settings');
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
  componentDidMount() {
    if (this.props.navigation.state.params.userId) {
      this.setState({ userId: this.props.navigation.state.params.userId });
      const db = firebase.database();
      var ref = db.ref('users/' + this.props.navigation.state.params.userId);
      ref.on(
        'value',
        (data) => {
          this.setState({
            languageTo: data.val().to,
            languageFrom: data.val().from,
          });
        },
        function (error) {
          // /alert(error);
        },
      );
    }
    let arr = [];
    this.state.languageOptions.map((item) => {
      arr.push({ label: item.text, value: item.value });
    });
    this.setState({ langs: arr });
  }
  render() {
    return (
      <View style={{ flex: 1, padding: 15 }}>
        <Text style={{ fontSize: 17, fontWeight: '500' }}>
          Choose languages
        </Text>
        <Text style={{ opacity: 0.4, marginTop: 15, fontWeight: '300' }}>
          Choose the language of the friend you want to translate
        </Text>
        <Text style={{ color: '#BFBFBF', marginTop: 20 }}>From</Text>
        <View style={{ borderBottomWidth: 1, padding: 15 }}>
          <RNPickerSelect
            value={this.state.languageFrom}
            placeholder={{ label: 'Select language from' }}
            onValueChange={(value) => {
              this.setState({ languageFrom: value }, () => {
                const db = firebase.database();
                var ref = db.ref('users/' + this.state.userId);
                ref.set(
                  { from: this.state.languageFrom, to: this.state.languageTo },
                  () => {
                    this.props.navigation.state.params.translate({
                      from: this.state.languageFrom,
                      to: this.state.languageTo,
                    });
                  },
                );
              });
              // console.log(value)
            }}
            items={this.state.langs}
          />
        </View>
        <Text style={{ color: '#BFBFBF', marginTop: 20 }}>To</Text>
        <View style={{ borderBottomWidth: 1, padding: 15 }}>
          <RNPickerSelect
            value={this.state.languageTo}
            onValueChange={(value) => {
              this.setState(
                {
                  languageTo: value,
                },
                () => {
                  const db = firebase.database();
                  var ref = db.ref('users/' + this.state.userId);
                  ref.set(
                    {
                      from: this.state.languageFrom,
                      to: this.state.languageTo,
                    },
                    () => {
                      this.props.navigation.state.params.translate({
                        from: this.state.languageFrom,
                        to: this.state.languageTo,
                      });
                    },
                  );
                },
              );
            }}
            items={this.state.langs}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});

export default index;
