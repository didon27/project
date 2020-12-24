import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Platform, Alert, BackHandler, Switch, Text, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { IMIconButton } from '../../truly-native';
import IMChat from '../IMChat/IMChat';
import { channelManager } from '../firebase';
import { firebaseStorage } from '../../firebase/storage';
import { reportingManager } from '../../user-reporting';
import { IMLocalized } from '../../localization/IMLocalization';
import { notificationManager } from '../../notifications';
import { setMediaChatReceivers } from '../audioVideo/redux';
import IMAudioVideoChat from '../audioVideo/IMAudioVideoChat';
import TranslateModal from '../../../components/TranslateModal/TranslateModal';
import ChatConfig from '../../../config';
import { HeaderBackButton } from 'react-navigation-stack';
import IMChatScreenHeader from './IMChatScreenHeader';
import amplitude from '../../../../amplitude';
import firebase from 'react-native-firebase';

class IMChatScreen extends Component {
  static navigationOptions = ({ screenProps, navigation }) => {
    const options = {};
    let appStyles = navigation.state.params.appStyles;
    let channel = navigation.state.params.channel;
    let currentTheme = appStyles.navThemeConstants[screenProps.theme];
    let title = channel.name;
    if (!title) {
      title = channel.participants[0].firstName
        ? channel.participants[0].firstName
        : channel.participants[0].fullname;
    }

    options.headerTitle = title;
    options.headerTitleStyle = {
      paddingEnd: 20,
    };
    options.headerStyle = {
      backgroundColor: currentTheme.backgroundColor,
    };
    options.headerTintColor = currentTheme.fontColor;
    options.header = (
      <IMChatScreenHeader
        title={title}
        navigation={navigation}
        currentTheme={currentTheme}
        channel={channel}
      />
    );
    options.headerRight = (
      <>
        {channel.participants.length == 1 && (
          <View style={{ marginLeft: 10 }}>
            <Text style={{ color: 'white', fontSize: 12 }}>Translate</Text>
            <Switch
              style={{
                marginRight: 15,
                transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
              }}
              onValueChange={() => navigation.state.params.onTranslateSwitch()}
              value={navigation.state.params.translate}
            />
          </View>
        )}
        <IMIconButton
          source={require('../../../CoreAssets/settings-icon.png')}
          // tintColor={appStyles.styleSet.chatIconStyle.tintColor}
          onPress={() => navigation.state.params.onSettingsPress()}
          marginRight={15}
          width={20}
          height={20}
        />

        <IMIconButton
          source={require('../../../CoreAssets/call.png')}
          // tintColor={appStyles.styleSet.chatIconStyle.tintColor}
          onPress={() => navigation.state.params.onAudioChat()}
          marginRight={15}
          width={20}
          height={20}
        />
        <IMIconButton
          source={require('../../../CoreAssets/video-camera.png')}
          // tintColor={appStyles.styleSet.chatIconStyle.tintColor}
          onPress={() => navigation.state.params.onVideoChat()}
          marginRight={15}
          width={20}
          height={20}
        />
      </>
    );
    return options;
  };

  constructor(props) {
    super(props);
    this.channel = this.props.navigation.getParam('channel');
    this.appStyles = this.props.navigation.getParam('appStyles');
    this.state = {
      thread: [],
      inputValue: '',
      channel: this.channel,
      downloadUrl: '',
      uploadProgress: 0,
      isMediaViewerOpen: false,
      isRenameDialogVisible: false,
      selectedMediaIndex: null,
      translate: false,
      modalVisible: false,
      selectedLanguages: {},
      languageOptions: ChatConfig.languageOptions,
      languagesAreSet: false,
      initState: true,
      prevNode: null,
      isLoading: false,
      allDataLoaded: false,
    };
    this.didFocusSubscription = props.navigation.addListener(
      'didFocus',
      (payload) =>
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );

    this.groupSettingsActionSheetRef = React.createRef();
    this.privateSettingsActionSheetRef = React.createRef();
    this.setLanguagesActionSheetRef = React.createRef();
    this.setLanguage2ActionSheetRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.user.id) {
      const db = firebase.database();
      var ref = db.ref('users/' + this.props.user.id);
      ref.on(
        'value',
        (data) => {
          console.log(data.val().to, data.val().from);
          if (data.val().to && data.val().from) {
            this.setState({
              languagesAreSet: true,
              to: data.val().to,
              from: data.val().from,
            });
          }

          this.setState({
            languageTo: data.val().to,
            languageFrom: data.val().from,
          });
        },
        function (error) {},
      );
    }

    this.props.navigation.setParams({
      onTranslateSwitch: this.onTranslateSwitch,
      translate: this.state.translate,
      turnOffTranslate: this.turnOffTranslate,
      modalVisible: this.state.modalVisible,
      onModalToggle: this.onModalToggle,
      channelId: this.state.channel.id,
      userId: this.props.user.id,
      onSettingsPress: this.onSettingsPress,
      onVideoChat: this.onVideoChat,
      onAudioChat: this.onAudioChat,
    });
    this.willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      (payload) =>
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        ),
    );
    this.threadUnsubscribe = channelManager.subscribeThreadSnapshot(
      this.channel,
      this.onThreadCollectionUpdate,
      this.state.thread.length ? this.state.thread.length : 20,
    );

    this._handleLoadMore();
  }

  componentWillUnmount() {
    this.threadUnsubscribe();
    this.didFocusSubscription && this.didFocusSubscription.remove();
    this.willBlurSubscription && this.willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    this.props.navigation.goBack();
    return true;
  };

  onVideoChat = async () => {
    await this.props.setMediaChatReceivers({
      receivers: this.channel.participants,
      channelId: this.channel.id,
      channelTitle: this.channel.name,
      type: 'video',
    });
    IMAudioVideoChat.showVideoChatModal();
    amplitude.getInstance().logEvent('video call');
  };

  onAudioChat = async () => {
    await this.props.setMediaChatReceivers({
      receivers: this.channel.participants,
      channelId: this.channel.id,
      channelTitle: this.channel.name,
      type: 'audio',
    });
    IMAudioVideoChat.showAudioChatModal();
    amplitude.getInstance().logEvent('audio call');
  };

  onSettingsPress = () => {
    if (this.state.channel.participants.length > 1) {
      this.groupSettingsActionSheetRef.current.show();
    } else {
      this.privateSettingsActionSheetRef.current.show();
    }
    amplitude.getInstance().logEvent('chat settings press');
  };

  onSelectLanguage = () => {
    this.setLanguagesActionSheetRef.current.show();
  };

  setLanguage2ActionSheetRef = () => {
    this.setLanguage2ActionSheetRef.current.show();
  };

  onChangeName = (text) => {
    this.showRenameDialog(false);

    const channel = { ...this.state.channel };
    delete channel.participants;
    channel.name = text;

    channelManager.onRenameGroup(
      text,
      channel,
      ({ success, error, newChannel }) => {
        if (success) {
          this.setState({ channel: newChannel });
          this.props.navigation.setParams({
            channel: newChannel,
          });
        }

        if (error) {
          alert(error);
        }
      },
    );
  };

  onLeave = () => {
    Alert.alert(
      IMLocalized(`Leave ${this.state.channel.name || 'group'}`),
      IMLocalized('Are you sure you want to leave this group?'),
      [
        {
          text: 'Yes',
          onPress: this.onLeaveDecided,
          style: 'destructive',
        },
        { text: 'No' },
      ],
      { cancelable: false },
    );
  };

  onLeaveDecided = () => {
    channelManager.onLeaveGroup(
      this.state.channel.id,
      this.props.user.id,
      ({ success, error }) => {
        if (success) {
          this.props.navigation.goBack(null);
        }

        if (error) {
          alert(error);
        }
      },
    );
  };

  onTranslateSwitch = () => {
    const translate = this.state.translate;
    var languages;
    const userId = this.props.user.id;
    if (!translate) {
      if (
        true
        //this.state.channel.hasOwnProperty('language')
      ) {
        if (
          !this.state.languagesAreSet
          // this.state.channel.language[userId] == null
        ) {
          Alert.alert(
            IMLocalized('Translate'),
            IMLocalized(
              'If you would like to translate the chat, please select the language',
            ),
            [
              {
                text: 'OK',
                onPress: () => {
                  this.props.navigation.push('TranslateSettings', {
                    appStyles: this.appStyles,
                    languageOptions: this.state.languageOptions,
                    userId: this.props.user.id,
                    translate: (data) => {
                      var languages = {
                        from: data.from,
                        to: data.to,
                      };
                      this.setState({
                        translate: !translate,
                        selectedLanguages: languages,
                      });
                      this.props.navigation.setParams({
                        translate: !translate,
                      });
                    },
                  });
                  //this.onModalToggle()
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => this.turnOffTranslate(),
              },
            ],
            { cancelable: false },
          );
        } else {
          var languages = {
            from: this.state.from,
            to: this.state.to,
          };
          this.setState({
            translate: !translate,
            selectedLanguages: languages,
          });
          this.props.navigation.setParams({ translate: !translate });
        }
      }
      amplitude.getInstance().logEvent('translate', {
        'is on': true,
      });
    } else {
      this.setState({ translate: !translate });
      this.props.navigation.setParams({ translate: !translate });
      amplitude.getInstance().logEvent('translate', {
        'is on': false,
      });
    }
  };

  onModalToggle = () => {
    const modalVisible = this.state.modalVisible;
    this.setState({ modalVisible: !modalVisible });
    this.props.navigation.setParams({ modalVisible: !modalVisible });
  };

  onSetLanguages = (languageFrom, languageTo) => {
    const translate = this.state.translate;
    channelManager.updateChannelLanguages(
      this.state.channel.id,
      this.props.user.id,
      languageFrom,
      languageTo,
    );
    var languages = { from: languageFrom, to: languageTo };
    this.setState({
      selectedLanguages: languages,
      modalVisible: false,
    });
    this.setState({ translate: !translate });
    this.props.navigation.setParams({ translate: !translate });
  };

  turnOffTranslate = () => {
    this.props.navigation.setParams({ translate: false });
    this.setState({ translate: false });
    this.setState({
      modalVisible: false,
    });
    this.props.navigation.setParams({ modalVisible: false });
  };

  showRenameDialog = (show) => {
    this.setState({ isRenameDialogVisible: show });
  };

  onThreadCollectionUpdate = (querySnapshot) => {
    if (this.state.initState) {
      this.setState({
        initState: false,
      });
    } else {
      let data = [];

      if (!querySnapshot.empty) {
        let documents = querySnapshot.docs;
        const lastElement = documents[documents.length - 1];

        querySnapshot.forEach((doc) => {
          const message = doc.data();
          if (
            this.props.user.id == '8ER8DgByeVhjYaO2D613aSVUi172' ||
            !message.content ||
            message.content.length == 0 ||
            !message.content.startsWith('XARQEGWE13SD')
          ) {
            data.push({ ...message, id: doc.id });
          }
        });

        this.setState({
          thread: data,
          prevNode: lastElement,
          allDataLoaded: false,
        });
      }
    }
  };

  onThreadCollectionUpdateGet = (querySnapshot) => {
    let { thread, prevNode } = this.state;

    let data = [...thread];

    if (!querySnapshot.empty) {
      let documents = querySnapshot.docs;
      const lastElement = documents[documents.length - 1];

      if (lastElement !== prevNode) {
        function add(arr, message, docId) {
          const found = arr.some((el) => el.id === docId);
          if (!found) {
            arr.push({ ...message, id: docId });
          }
          return arr;
        }
        querySnapshot.forEach((doc) => {
          const message = doc.data();
          if (
            this.props.user.id == '8ER8DgByeVhjYaO2D613aSVUi172' ||
            !message.content ||
            message.content.length == 0 ||
            !message.content.startsWith('XARQEGWE13SD')
          ) {
            add(data, message, doc.id);
            // data.push({ ...message, id: doc.id });
          }
        });
      } else {
        this.setState({
          allDataLoaded: true,
        });
      }

      this.setState({
        thread: data,
        isLoading: false,
        prevNode: lastElement,
      });
    } else {
      this.setState({
        isLoading: false,
        allDataLoaded: true,
      });
    }
  };

  _handleLoadMore = () => {
    if (!this.state.allDataLoaded) {
      this.setState(
        {
          isLoading: true,
        },
        () => {
          channelManager.getThreadSnapshot(
            this.channel,
            this.onThreadCollectionUpdateGet,
            this.state.prevNode,
          );
        },
      );
    }
  };

  onChangeTextInput = (text) => {
    this.setState({
      inputValue: text,
    });
  };

  createOne2OneChannel = () => {
    const self = this;
    return new Promise((resolve) => {
      channelManager
        .createChannel(self.props.user, self.state.channel.participants)
        .then((response) => {
          self.setState({ channel: response.channel });
          self.threadUnsubscribe = channelManager.subscribeThreadSnapshot(
            response.channel,
            self.onThreadCollectionUpdate,
            this.state.thread.length ? this.state.thread.length : 20,
          );
          resolve(response.channel);
        });
    });
  };

  onSendInput = async () => {
    const self = this;
    if (
      this.state.thread.length > 0 ||
      this.state.channel.participants.length > 1
    ) {
      self.sendMessage();
      return;
    }
    // If we don't have a chat id, we need to create it first together with the participations
    this.createOne2OneChannel().then((_response) => {
      self.sendMessage();
    });
  };

  sendMessage = () => {
    const self = this;
    const inputValue = this.state.inputValue;
    const downloadURL = this.state.downloadUrl;
    self.setState({
      inputValue: '',
      downloadUrl: '',
    });
    channelManager
      .sendMessage(this.props.user, this.state.channel, inputValue, downloadURL)
      .then((response) => {
        if (response.error) {
          alert(error);
          self.setState({
            inputValue: inputValue,
            downloadUrl: downloadURL,
          });
        } else {
          self.broadcastPushNotifications(inputValue, downloadURL);
        }
      });
  };

  broadcastPushNotifications = (inputValue, downloadURL) => {
    const channel = this.state.channel;
    const participants = channel.participants;
    if (!participants || participants.length == 0) {
      return;
    }
    const sender = this.props.user;
    const isGroupChat = channel.name && channel.name.length > 0;
    const fromTitle = isGroupChat
      ? channel.name
      : sender.firstName + ' ' + sender.lastName;
    var message;
    if (isGroupChat) {
      if (downloadURL) {
        if (downloadURL.mime && downloadURL.mime.startsWith('video')) {
          message =
            sender.firstName +
            ' ' +
            sender.lastName +
            ' ' +
            IMLocalized('sent a video.');
        } else {
          message =
            sender.firstName +
            ' ' +
            sender.lastName +
            ' ' +
            IMLocalized('sent a photo.');
        }
      } else {
        message = sender.firstName + ' ' + sender.lastName + ': ' + inputValue;
      }
    } else {
      if (downloadURL) {
        if (downloadURL.mime && downloadURL.mime.startsWith('video')) {
          message = sender.firstName + ' ' + IMLocalized('sent you a video.');
        } else {
          message = sender.firstName + ' ' + IMLocalized('sent you a photo.');
        }
      } else {
        message = inputValue;
      }
    }

    participants.forEach((participant) => {
      if (participant.id != this.props.user.id) {
        notificationManager.sendPushNotification(
          participant,
          fromTitle,
          message,
          'chat_message',
          { fromUser: sender },
        );
      }
    });
  };

  onAddMediaPress = (photoUploadDialogRef) => {
    photoUploadDialogRef.current.show();
  };

  onLaunchCamera = () => {
    const self = this;
    const { id, firstName, profilePictureURL } = this.props.user;

    ImagePicker.openCamera({
      cropping: false,
    })
      .then((image) => {
        const source = image.path;
        const mime = image.mime;

        const data = {
          content: '',
          created: channelManager.currentTimestamp(),
          senderFirstName: firstName,
          senderID: id,
          senderLastName: '',
          senderProfilePictureURL: profilePictureURL,
          url: 'http://fake',
        };

        self.startUpload({ source, mime }, data);
      })
      .catch(function (error) {
        console.log(error);
        self.setState({ loading: false });
      });
  };

  onOpenPhotos = () => {
    const { id, firstName, profilePictureURL } = this.props.user;
    const self = this;

    ImagePicker.openPicker({
      cropping: false,
      multiple: false,
    })
      .then((image) => {
        const source = image.path;
        const mime = image.mime;

        const data = {
          content: '',
          created: channelManager.currentTimestamp(),
          senderFirstName: firstName,
          senderID: id,
          senderLastName: '',
          senderProfilePictureURL: profilePictureURL,
          url: 'http://fake',
        };

        self.startUpload({ source, mime }, data);
      })
      .catch(function (error) {
        console.log(error);
        self.setState({ loading: false });
      });
  };

  startUpload = ({ source, mime }, data) => {
    const self = this;

    const filename =
      new Date() + '-' + source.substring(source.lastIndexOf('/') + 1);
    const uploadUri =
      Platform.OS === 'ios' ? source.replace('file://', '') : source;

    firebaseStorage.uploadFileWithProgressTracking(
      filename,
      uploadUri,
      async (snapshot, taskSuccess) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        self.setState({ uploadProgress });

        if (snapshot.state === taskSuccess) {
          const url = await snapshot.ref.getDownloadURL();
          self.setState({ downloadUrl: { url, mime }, uploadProgress: 0 });
          self.onSendInput();
        }
      },
      (error) => {
        self.setState({ uploadProgress: 0 });
        alert(IMLocalized('Oops! An error has occured. Please try again.'));
        console.log(error);
      },
    );
  };

  sortMediafromThread = () => {
    this.imagesUrl = [];
    this.images = [];

    this.state.thread.forEach((item) => {
      if (item.url && item.url != '') {
        if (item.url.mime && item.url.mime.startsWith('image')) {
          this.imagesUrl.push(item.url.url);
          this.images.push({
            id: item.id,
            url: item.url,
          });
        } else if (!item.url.mime && item.url.startsWith('https://')) {
          // To handle old format before video feature
          this.imagesUrl.push(item.url);
          this.images.push({
            id: item.id,
            url: item.url,
          });
        }
      }
    });

    return this.imagesUrl;
  };

  onChatMediaPress = (item) => {
    const index = this.images.findIndex((image) => {
      return image.id === item.id;
    });

    this.setState({
      selectedMediaIndex: index,
      isMediaViewerOpen: true,
    });
  };

  onMediaClose = () => {
    this.setState({ isMediaViewerOpen: false });
  };

  onUserBlockPress = () => {
    this.reportAbuse('block');
  };

  onSettingsLanPress = () => {
    this.props.navigation.push('TranslateSettings', {
      appStyles: this.appStyles,
      languageOptions: this.state.languageOptions,
      userId: this.props.user.id,
      translate: (data) => {
        var languages = {
          from: this.state.from,
          to: this.state.to,
        };
        // alert(JSON.stringidddfy(languages))

        this.setState({ translate: false }, () => {
          this.setState({
            translate: true,
            selectedLanguages: languages,
          });
          this.props.navigation.setParams({ translate: true });
        });
      },
    });
  };

  onUserReportPress = () => {
    this.reportAbuse('report');
  };

  reportAbuse = (type) => {
    const participants = this.state.channel.participants;
    if (!participants || participants.length != 1) {
      return;
    }
    const myID = this.props.user.id || this.props.user.userID;
    const otherUserID = participants[0].id || participants[0].userID;
    reportingManager.markAbuse(myID, otherUserID, type).then((response) => {
      if (!response.error) {
        this.props.navigation.goBack(null);
      }
    });
  };

  render() {
    return (
      <IMChat
        appStyles={this.appStyles}
        user={this.props.user}
        thread={this.state.thread}
        _handleLoadMore={this._handleLoadMore}
        isLoading={this.state.isLoading}
        inputValue={this.state.inputValue}
        onAddMediaPress={this.onAddMediaPress}
        onSendInput={this.onSendInput}
        onChangeTextInput={this.onChangeTextInput}
        onLaunchCamera={this.onLaunchCamera}
        onOpenPhotos={this.onOpenPhotos}
        uploadProgress={this.state.uploadProgress}
        sortMediafromThread={this.sortMediafromThread()}
        isMediaViewerOpen={this.state.isMediaViewerOpen}
        selectedMediaIndex={this.state.selectedMediaIndex}
        onChatMediaPress={this.onChatMediaPress}
        onMediaClose={this.onMediaClose}
        isRenameDialogVisible={this.state.isRenameDialogVisible}
        groupSettingsActionSheetRef={this.groupSettingsActionSheetRef}
        privateSettingsActionSheetRef={this.privateSettingsActionSheetRef}
        setLanguagesActionSheetRef={this.setLanguagesActionSheetRef}
        setLanguage2ActionSheetRef={this.setLanguage2ActionSheetRef}
        translate={this.state.translate}
        translateTo={this.state.selectedLanguages.to}
        translateFrom={this.state.selectedLanguages.from}
        showRenameDialog={this.showRenameDialog}
        onChangeName={this.onChangeName}
        onLeave={this.onLeave}
        onUserBlockPress={this.onUserBlockPress}
        onUserReportPress={this.onUserReportPress}
        modalVisible={this.state.modalVisible}
        languageOptions={this.state.languageOptions}
        turnOffTranslate={this.turnOffTranslate}
        onSetLanguages={this.onSetLanguages}
        onSettingsPress={this.onSettingsLanPress}
      />
    );
  }
}

IMChatScreen.propTypes = {
  thread: PropTypes.array,
  setChatThread: PropTypes.func,
  createThread: PropTypes.func,
  createChannel: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = ({ chat, auth }) => {
  return {
    user: auth.user,
    thread: chat.thread,
  };
};

export default connect(mapStateToProps, { setMediaChatReceivers })(
  IMChatScreen,
);
