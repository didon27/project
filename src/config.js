import { IMLocalized, setI18nConfig } from './Core/localization/IMLocalization';

setI18nConfig();

const regexForNames = /^[a-zA-Z]{2,25}$/;
const regexForPhoneNumber = /\d{9}$/;

const ChatConfig = {
  isSMSAuthEnabled: false,
  appIdentifier: 'rn-messenger-android',
  onboardingConfig: {
    welcomeTitle: 'Trice',
    welcomeCaption: IMLocalized('Send and receive translated messages, call, and video chat with your friends.'),
    walkthroughScreens: [
      {
        icon: require("../assets/icons/messaging-icon1.png"),
        iconDark: require("../assets/icons/messaging-icon1-dark.png"),
        title: "Real Time Messaging",
        description: IMLocalized("Send messagess, call or video chat with your friends for free.")
      },
      {
        icon: require("../assets/icons/send-photos-icon1.png"),
        iconDark: require("../assets/icons/send-photos-icon1-dark.png"),
        title: "Send Photos and Videos",
        description: IMLocalized("Send photos and videos in group chats or private messages.")
      },
      {
        icon: require("../assets/icons/translate-messages-icon1.png"),
        iconDark: require("../assets/icons/translate-messages-icon1-dark.png"),
        title: "Translate Messages",
        description: IMLocalized("Translate your chat messages in real time.")
      }
    ]
  },
  tosLinkTC: "https://tricelate.github.io/terms-and-conditions",
  tosLinkPP: "https://tricelate.github.io/privacy-policy",
  editProfileFields: {
    sections: [
      {
        title: IMLocalized("PUBLIC PROFILE"),
        fields: [
          {
            displayName: IMLocalized("First Name"),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'firstName',
            placeholder: 'Your first name'
          },
          {
            displayName: IMLocalized("Last Name"),
            type: 'text',
            editable: true,
            regex: regexForNames,
            key: 'lastName',
            placeholder: 'Your last name'
          }
        ]
      },
      {
        title: IMLocalized("PRIVATE DETAILS"),
        fields: [
          {
            displayName: IMLocalized("Phone Number"),
            type: 'text',
            editable: true,
            regex: regexForPhoneNumber,
            key: 'phone',
            placeholder: 'Your phone number'
          }
        ]
      }
    ]
  },
  userSettingsFields: {
    sections: [
      {
        title: IMLocalized("GENERAL"),
        fields: [
          {
            displayName: IMLocalized("Allow Push Notifications"),
            type: 'switch',
            editable: true,
            key: 'push_notifications_enabled',
            value: false,
          },
          {
            displayName: IMLocalized("Enable Face ID / Touch ID"),
            type: 'switch',
            editable: true,
            key: 'face_id_enabled',
            value: false
          },
          {
            displayName: IMLocalized("Privacy Policy"),
            type: 'link',
            key: 'privacyPolicy',
          }
        ]
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized("Save"),
            type: 'button',
            key: 'savebutton',
          }
        ]
      }
    ]
  },
  editLanguageField: {
    sections: [
      {
        title: IMLocalized("LANGUAGE"),
        fields: [
          {
            displayName: IMLocalized("Select Language"),
            type: 'select',
            key: 'language',
            displayOptions: [
              "en",
              "es",
              "ru"
            ]
          }
        ]
      },
      {
        title: '',
        fields: [
          {
            displayName: IMLocalized("Save"),
            type: 'button',
            key: 'savebutton',
          }
        ]
      }
    ]
  },
  contactUsFields: {
    sections: [
      {
        title: IMLocalized("CONTACT"),
        fields: [
          {
            displayName: IMLocalized("E-mail us"),
            value: 'tricelateapp@gmail.com',
            type: 'contact',
            editable: false,
            key: 'email',
            placeholder: 'Your email address'
          }
        ]
      }
    ]
  },
  languageOptions: [
    { value: "ar", text: "Arabic" },
    { value: "en", text: "English" },
    { value: "es", text: "Spanish" },
    { value: "fr", text: "French" },
    { value: "ja", text: "Japanese" },
    { value: "ka", text: "Georgian" },
    { value: "ko", text: "Korean" },
    { value: "ru", text: "Russian"},
    { value: "tr", text: "Turkish"},
    { value: "zh", text: "Chinese"},
  ],
  contactUsPhoneNumber: "+16504859694"
};

export default ChatConfig;
