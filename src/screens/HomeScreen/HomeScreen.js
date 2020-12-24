import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Appearance } from 'react-native-appearance';
import { View, Image } from 'react-native';

import { connect } from 'react-redux';
import { IMChatHomeComponent } from '../../Core/chat';
import { TNTouchableIcon } from '../../Core/truly-native';
import {
  FriendshipConstants,
  filteredNonFriendshipsFromUsers,
} from '../../Core/socialgraph/friendships';
import AppStyles from '../../DynamicAppStyles';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import {
  setFriends,
  setFriendships,
} from '../../Core/socialgraph/friendships/redux';
import { setUsers } from '../../Core/onboarding/redux/auth';
import FriendshipTracker from '../../Core/socialgraph/friendships/firebase/tracker';
import { ReactReduxContext } from 'react-redux';
import CustomHeader from '../../components/HeaderComponent/CustomHeader';

class HomeScreen extends Component {
  static contextType = ReactReduxContext;

  static navigationOptions = ({ screenProps, navigation }) => {
    let currentTheme = AppStyles.navThemeConstants[screenProps.theme];
    const { params = {} } = navigation.state;
    return {
      headerTitle: IMLocalized('Message'),
      headerRight: (
        <TNTouchableIcon
          imageStyle={{ tintColor: currentTheme.fontColor }}
          iconSource={AppStyles.iconSet.inscription}
          onPress={() =>
            navigation.navigate('CreateGroup', { appStyles: AppStyles })
          }
          appStyles={AppStyles}
        />
      ),
      headerStyle: {
        backgroundColor: currentTheme.backgroundColor,
      },
      headerTitleStyle: {
        color: currentTheme.fontColor,
      },
      header: (
        <CustomHeader
          headerTitle={IMLocalized('Messages')}
          currentTheme={currentTheme}
          params={params}
          showSearchBar={true}
        />
      ),
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      isSearchModalOpen: false,
      filteredFriendships: [],
      loading: true,
    };
    this.searchBarRef = React.createRef();
  }

  componentDidMount() {
    const user = this.props.user;

    this.friendshipTracker = new FriendshipTracker(
      this.context.store,
      user.id || user.userID,
    );

    const self = this;
    self.props.navigation.setParams({
      toggleCamera: self.toggleCamera,
      openDrawer: self.openDrawer,
      onSearchBar: self.onSearchBar
    });

    this.friendshipTracker.subscribeIfNeeded();
  }

  componentWillUnmount() {
    this.friendshipTracker.unsubscribe();
  }

  updateFilteredFriendships = (keyword) => {
    this.setState({ keyword: keyword });
    //const users = this.props.users.filter(!this.props.user.userID.includes(this.props.user.userID));

    const filteredFriendships = filteredNonFriendshipsFromUsers(
      keyword,
      this.props.users,
      this.props.friendships,
    );
    this.setState({ filteredFriendships });
  };

  onSearchTextChange = (text) => {
    this.updateFilteredFriendships(text);
  };

  openDrawer = () => {
    this.props.navigation.openDrawer();
  };

  onFriendItemPress = (friend) => {
    this.setState({ isSearchModalOpen: false });
    const id1 = this.props.user.id || this.props.user.userID;
    const id2 = friend.id || friend.userID;
    const channel = {
      id: id1 < id2 ? id1 + id2 : id2 + id1,
      participants: [friend],
    };
    this.props.navigation.navigate('PersonalChat', {
      channel,
      appStyles: AppStyles,
    });
  };

  onFriendAction = (item, index) => {
    if (item.type == FriendshipConstants.FriendshipType.none) {
      const oldFilteredFriendships = this.state.filteredFriendships;
      this.removeFriendshipAt(index);
      this.friendshipTracker.addFriendRequest(
        this.props.user,
        item.user,
        (response) => {
          if (response) {
            if (response.error) {
              this.setState({
                filteredFriendships: oldFilteredFriendships,
              });
            }
          }
        },
      );
    }
  };

  removeFriendshipAt = async (index) => {
    const newFilteredFriendships = [...this.state.filteredFriendships];
    await newFilteredFriendships.splice(index, 1);
    this.setState({
      filteredFriendships: [...newFilteredFriendships],
    });
  };

  onSearchBar = async () => {
    this.setState((prevState) => ({
      isSearchModalOpen: !prevState.isSearchModalOpen,
    }));

    setTimeout(() => {
      if (this.searchBarRef.current) {
        this.searchBarRef.current.focus();
      }
    }, 500);
  };

  onSearchModalClose = () => {
    this.setState({
      isSearchModalOpen: false,
    });
  };

  onSearchClear = () => {
    this.updateFilteredFriendships('');
  };

  onEmptyStatePress = () => {
    this.onSearchBar();
  };

  onSenderProfilePicturePress = (item) => {
    console.log(item);
  };

  render() {
    let colorScheme = Appearance.getColorScheme();

    return (
      <>
        {/* <StatusBar appStyles={AppStyles} /> */}
        <IMChatHomeComponent
          loading={this.state.loading}
          searchBarRef={this.searchBarRef}
          friends={this.props.friends}
          onFriendItemPress={this.onFriendItemPress}
          onSearchBarPress={this.onSearchBar}
          searchData={this.state.filteredFriendships}
          onSearchTextChange={this.onSearchTextChange}
          isSearchModalOpen={this.state.isSearchModalOpen}
          onSearchModalClose={this.onSearchModalClose}
          onSearchBarCancel={this.onSearchBar}
          onSearchClear={this.onSearchClear}
          onFriendAction={this.onFriendAction}
          appStyles={AppStyles}
          navigation={this.props.navigation}
          onEmptyStatePress={this.onEmptyStatePress}
          onSenderProfilePicturePress={this.onSenderProfilePicturePress}
          user={this.props.user}
          audioVideoChatConfig={this.props.audioVideoChatConfig}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            borderRadius: 50,
            backgroundColor: AppStyles.buttonSet[colorScheme].butonBackGround,
          }}>
          <TNTouchableIcon
            imageStyle={{
              tintColor: AppStyles.buttonSet[colorScheme].colorFilled,
            }}
            iconSource={AppStyles.iconSet.inscription}
            onPress={() =>
              this.props.navigation.navigate('CreateGroup', {
                appStyles: AppStyles,
              })
            }
            appStyles={AppStyles}
          />
        </View>
      </>
    );
  }
}

HomeScreen.propTypes = {
  friends: PropTypes.array,
  users: PropTypes.array,
};

const mapStateToProps = ({ friends, auth, audioVideoChat }) => {
  return {
    user: auth.user,
    friends: friends.friends,
    users: auth.users,
    friendships: friends.friendships,
    audioVideoChatConfig: audioVideoChat,
  };
};

export default connect(mapStateToProps, {
  setFriends,
  setUsers,
  setFriendships,
})(HomeScreen);
