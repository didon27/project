import React from 'react';
import { Text, View, Image } from 'react-native';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';
import LinearGradient from 'react-native-linear-gradient';

const Logo = (props) => {
  const appStyles = props.appStyles;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);
  const appConfig = props.appConfig;
  const colors = getGradientColors(colorScheme);
  return (
    <View style={styles.logoContainer}>
      <View style={styles.logo}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={colors}
          style={styles.gradient}>
          <Image style={styles.logoImage} source={appStyles.iconSet.logo} />
        </LinearGradient>
      </View>
      <Text style={styles.title}>
        {appConfig.onboardingConfig.welcomeTitle}
      </Text>
    </View>
  );
};

// Logo.defaultProps = {
//   gradient: true,
// };

export default Logo;

const getGradientColors = (colorScheme) => {
  let colors = ['#B36AE8', '#6385E6'];
  if (colorScheme === 'dark') {
    colors = ['#21223D', '#464765'];
  }
  return colors;
};
