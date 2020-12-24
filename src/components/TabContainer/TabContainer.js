import React from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import DynamicAppStyles from '../../DynamicAppStyles';
import Tab from './Tab';
import dynamicStyles from './styles';

const TabContainer = (props) => {
  const colorScheme = useColorScheme();

  const styles = dynamicStyles(colorScheme);
  const { navigation } = props;

  return (
    <View style={[styles.container]}>
      {navigation.state.routes.map((route, index) => {
        return (
          <Tab
            key={index}
            route={route}
            tabIcons={DynamicAppStyles.tabIcons}
            focus={navigation.state.index === index}
            onPress={() => navigation.navigate(route.routeName)}
          />
        );
      })}
    </View>
  );
};
export default TabContainer;
