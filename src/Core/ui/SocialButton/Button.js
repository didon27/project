import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const systemButtonOpacity = 0.2;

export default class Button extends Component {
  static propTypes = {
    ...TouchableOpacity.propTypes,
    accessibilityLabel: PropTypes.string,
    allowFontScaling: Text.propTypes.allowFontScaling,
    containerStyle: ViewPropTypes.style,
    disabledContainerStyle: ViewPropTypes.style,
    disabled: PropTypes.bool,
    style: Text.propTypes.style,
    styleDisabled: Text.propTypes.style,
    childGroupStyle: ViewPropTypes.style,
  };

  render() {
    let touchableProps = {
      activeOpacity: this._computeActiveOpacity(),
    };
    let containerStyle = [
      styles.container,
      this.props.containerStyle,
      this.props.disabled ? this.props.disabledContainerStyle : null,
    ];

    if (!this.props.disabled) {
      touchableProps.onPress = this.props.onPress;
      touchableProps.onPressIn = this.props.onPressIn;
      touchableProps.onPressOut = this.props.onPressOut;
      touchableProps.onLongPress = this.props.onLongPress;
      touchableProps.delayPressIn = this.props.delayPressIn;
      touchableProps.delayPressOut = this.props.delayPressOut;
      touchableProps.delayLongPress = this.props.delayLongPress;
    }

    return (
      <TouchableOpacity
        {...touchableProps}
        testID={this.props.testID}
        style={containerStyle}
        accessibilityLabel={this.props.accessibilityLabel}
        accessibilityRole="button">
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={this.props.gradientColors}
          style={styles.gradient}>
          {this.props.children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  _computeActiveOpacity() {
    if (this.props.disabled) {
      return 1;
    }
    return this.props.activeOpacity != null
      ? this.props.activeOpacity
      : systemButtonOpacity;
  }
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
});
