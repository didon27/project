import React from 'react';
import { Text, Linking, View } from 'react-native';
import { IMLocalized } from '../../localization/IMLocalization';

const TermsOfUseView = (props) => {
  const { tosLink, style, textStyle, linkStyle } = props;
  return (
    <View style={style}>
      <Text style={[textStyle]}>
        {IMLocalized('By creating an account you agree with our')}
      </Text>
      <Text style={[linkStyle]} onPress={() => Linking.openURL(tosLink)}>
        {IMLocalized('Terms of Use')}
      </Text>
    </View>
  );
};

export default TermsOfUseView;
