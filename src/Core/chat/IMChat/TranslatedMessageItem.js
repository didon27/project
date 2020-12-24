import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import Predictions, {
  AmazonAIPredictionsProvider,
} from '@aws-amplify/predictions';

function TranslatedMessageItem(props) {
  const { text, translateTo, translateFrom, appStyles } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [translatedMessage, setTranslatedMessage] = useState('');
  const [loading, setLoading] = useState('false');

  useEffect(() => {
    translateMessage(text, translateTo, translateFrom);
  }, []);

  const translateMessage = async (text, to, from) => {
    const result = await Predictions.convert({
      translateText: {
        source: {
          text: text,
          language: from,
          // defaults configured on aws-exports.js
          // supported languages https://docs.aws.amazon.com/translate/latest/dg/how-it-works.html#how-it-works-language-codes
        },
        targetLanguage: to,
      },
    });
    console.log('result', result);
    if (result) {
      setTranslatedMessage(result.text);
      setLoading(false);
    }
  };
  if (loading) {
    return (
      <View>
        <ActivityIndicator size="small" color="#44339C" />
      </View>
    );
  } else {
    return (
      <View>
        <Text style={{ ...styles.receiveTextMessage, fontStyle: 'italic' }}>
          {translatedMessage}
        </Text>
      </View>
    );
  }
}

TranslatedMessageItem.propTypes = {};

export default TranslatedMessageItem;
