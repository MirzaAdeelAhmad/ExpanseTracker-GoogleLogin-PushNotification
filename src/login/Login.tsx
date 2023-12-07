import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {loginStyle} from './LoginStyle';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {firebase} from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
// ---------- importing images and icons ----------
import logoImage from '../../assets/images/images-removebg-preview.png';
import googleIcon from '../../assets/images/2991148-removebg-preview.png';
import useLogin from '../hooks/useLogin';

export default function Login() {
  const {navigation, setuserInformation, userInformation} = useLogin();

  // ------------ Get Device Token For Push Notification -------------
  // const getDeviceToken = async () => {
  //   const token = await messaging().getToken();
  //   console.log('Get Token Succesfully...');
  //   console.log(token);
  // };
  // getDeviceToken();

  // ------------- Signin with Google ------------
  useEffect(() => {
    getDeviceToken();

    GoogleSignin.configure({
      webClientId:
        '513123302968-7euo1lp12k211k2tkkt6iisflb4jhulr.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the idToken on the user object, and for offline access.
    });
  }, []);

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
    console.log(token);
  };
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setuserInformation(userInfo);
      navigation.navigate('Home');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <View style={loginStyle.mainContainer}>
      <Image source={logoImage} style={{width: 200, height: 200}} />
      <Text style={loginStyle.title}>Expense Tracker</Text>
      <TouchableOpacity
        style={[loginStyle.loginWithView, loginStyle.boxShadow]}
        onPress={() => signIn()}>
        <Image
          source={googleIcon}
          style={{width: 30, height: 30, marginLeft: 40}}
        />
        <Text style={loginStyle.loginWithText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}
