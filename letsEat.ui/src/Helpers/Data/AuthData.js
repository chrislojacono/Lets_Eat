import firebase from 'firebase/app';
import 'firebase/auth';
import UserData from './UserData';

const getUid = () => firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    return user.uid;
  }
  return console.warn('no user logged in.');
});

const loginClickEvent = (e) => {
  e.preventDefault();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
  });
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((cred) => {
      const user = cred.additionalUserInfo.profile;
      const userObj = {
        Id: cred.user.uid,
        FirstName: user.given_name,
        LastName: user.family_name,
        EmailAddress: user.email,
        Image_Url: user.picture,
      };
      UserData.AddAUser(userObj);
    });
};

const logoutClickEvent = (e) => {
  e.preventDefault();
  window.sessionStorage.removeItem('token');
  firebase.auth().signOut();
  window.location.href = '/';
};
// eslint-disable-next-line
export default {
  getUid,
  loginClickEvent,
  logoutClickEvent,
};
