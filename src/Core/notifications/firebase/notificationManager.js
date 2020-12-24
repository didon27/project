import firebase from 'react-native-firebase';

import firebaseConfig from '../../firebase/config';

// if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

const notificationsRef = firebase.firestore().collection('notifications');

const fcmURL = 'https://fcm.googleapis.com/fcm/send';
const firebaseServerKey =
  'AAAA2FZ3i2I:APA91bHiNmw2AG_ZMV_oMjUVVbS6DLTEiTuUkiloedUqd3qF1Px7EykgIHGT-DkaUcrG-OckwS8W86E7oSRzOI5apXPRfojWCrpdL8fD5SkWp0FWSV0rWcj4xE5PoA7J54lI6S13hvGU';

const sendPushNotification = async (
  toUser,
  title,
  body,
  type,
  metadata = {},
) => {
  if (metadata && metadata.fromUser && toUser.id == metadata.fromUser.id) {
    return;
  }
  const notification = {
    toUserID: toUser.id,
    title,
    body,
    metadata,
    toUser,
    type,
    seen: false,
  };

  const ref = await notificationsRef.add({
    ...notification,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  });
  notificationsRef.doc(ref.id).update({ id: ref.id });
  if (!toUser.pushToken) {
    return;
  }

  const pushNotification = {
    to: toUser.pushToken,
    notification: {
      title: title,
      body: body,
    },
    data: { ...metadata, type, toUserID: toUser.id },
  };
  fetch(fcmURL, {
    method: 'post',
    headers: new Headers({
      Authorization: 'key=' + firebaseServerKey,
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify(pushNotification),
  });
};

export const notificationManager = {
  sendPushNotification,
};
