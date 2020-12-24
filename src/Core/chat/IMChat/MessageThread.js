import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator, View } from 'react-native';

import ThreadItem from './ThreadItem';
import dynamicStyles from './styles';
import { useColorScheme } from 'react-native-appearance';

function MessageThread(props) {
  const {
    thread,
    user,
    onChatMediaPress,
    appStyles,
    onSenderProfilePicturePress,
    translate,
    translateTo,
    translateFrom,
    _handleLoadMore,
    isLoading,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const renderChatItem = ({ item }) => (
    <ThreadItem
      item={item}
      user={{ ...user, userID: user.id }}
      appStyles={appStyles}
      onChatMediaPress={onChatMediaPress}
      onSenderProfilePicturePress={onSenderProfilePicturePress}
      translate={translate}
      translateTo={translateTo}
      translateFrom={translateFrom}
    />
  );

  const renderFooter = () => {
    if (isLoading)
      return (
        <View style={{ marginTop: 10, alignItems: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      );

    return null;
  };

  return (
    <FlatList
      inverted={true}
      vertical={true}
      showsVerticalScrollIndicator={false}
      data={thread}
      renderItem={renderChatItem}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={styles.messageThreadContainer}
      onEndReached={_handleLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

MessageThread.propTypes = {
  thread: PropTypes.array,
  user: PropTypes.object,
  onChatMediaPress: PropTypes.func,
};

export default MessageThread;
