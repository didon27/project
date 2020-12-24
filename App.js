import React, { useEffect, useState } from 'react';

// import { AppRegistry } from "react-native";
import { Provider } from 'react-redux';
import * as RNLocalize from 'expo-localization';
import { Appearance, AppearanceProvider } from 'react-native-appearance';
import SplashScreen from 'react-native-splash-screen';
import { setI18nConfig } from './src/Core/localization/IMLocalization';
import { AppNavigator } from './src/navigations/AppNavigation';
import reduxStore from './src/redux/store';

import Amplify from 'aws-amplify';
import Predictions, {
  AmazonAIPredictionsProvider,
} from '@aws-amplify/predictions';

// import config from './src/aws-exports';
// Amplify.configure(config);
Amplify.addPluggable(new AmazonAIPredictionsProvider());

const useForceUpdate = () => useState()[1];

const App = (props) => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    SplashScreen.hide();
    console.disableYellowBox = true;
    setI18nConfig();
    //RNLocalize.addEventListener("change", handleLocalizationChange);
    Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });
    return () => {
      //RNLocalize.removeEventListener("change", handleLocalizationChange);
    };
  }, []);

  const handleLocalizationChange = () => {
    setI18nConfig();
    useForceUpdate();
  };

  return (
    <Provider store={reduxStore}>
      <AppearanceProvider>
        <AppNavigator screenProps={{ theme: colorScheme }} />
      </AppearanceProvider>
    </Provider>
  );
};

// AppRegistry.registerComponent("App", () => App);

export default App;
