import React from 'react';
import { View } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import MenuButton from '../MenuButton/MenuButton';
import AppStyles from '../../AppStyles';
import DynamicAppStyles from '../../DynamicAppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import dynamicStyles from './styles';

const DrawerContainer = props => {
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(colorScheme);
  const { navigation } = props;
  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <MenuButton
          title={IMLocalized('Home')}
          source={AppStyles.iconSet.home}
          onPress={() => {
            navigation.navigate('HomeStack');
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title={IMLocalized('Friends')}
          source={AppStyles.iconSet.users}
          onPress={() => {
            navigation.navigate('FriendsStack');
            navigation.closeDrawer();
          }}
        />
        <MenuButton
          title={IMLocalized('Profile')}
          source={AppStyles.iconSet.user}
          onPress={() => {
            navigation.navigate('MyProfile', { appStyles: DynamicAppStyles });
            navigation.closeDrawer();
          }}
        />
      </View>
    </View>
  );
};
export default DrawerContainer;
