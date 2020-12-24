import React from 'react';
import { StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { TNTouchableIcon } from '../../Core/truly-native';
import AppStyles from '../../DynamicAppStyles';
import LinearGradient from 'react-native-linear-gradient';

const CustomHeader = (props) => {
  const {
    currentTheme,
    headerTitle,
    params,
    showSearchBar,
    showDrawer,
  } = props;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: currentTheme.backgroundColor,
        },
      ]}>
      <LinearGradient
        colors={currentTheme.gradientColors}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
        style={styles.gradient}>
        <View
          style={[
            styles.leftBar,
            { justifyContent: showDrawer ? 'space-between' : 'flex-end' },
          ]}>
          {showDrawer ? (
            <View
              appStyles={AppStyles}
            />
          ) : null}
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {headerTitle}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          {showSearchBar ? (
            <>
              <TNTouchableIcon
                imageStyle={{
                  tintColor: currentTheme.fontColor,
                }}
                iconSource={AppStyles.iconSet.search}
                onPress={params.onSearchBar}
                appStyles={AppStyles}
              />
            </>
          ) : null}
        </View>
      </LinearGradient>
    </View>
  );
};

CustomHeader.defaultProps = {
  showSearchBar: false,
  showDrawer: true,
};
export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === 'ios' ? 88 : 64,
  },
  gradient: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  leftBar: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
    alignItems: 'center',
  },
});
