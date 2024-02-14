import {
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SvgComponent from '../SVG/LogInSVG';
import {useNavigation} from '@react-navigation/native';
const GoogleSignIn = () => {
  const navigation = useNavigation();
  const _signInWithGoogle = async () => {
    try {
      GoogleSignin.configure({
        offlineAccess: false,
        webClientId:
          '795798415576-fi24hope1rqtonvep4q9sk194rdoqph0.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = auth.GoogleAuthProvider.credential(idToken);
      auth().signInWithCredential(googleCredentials);
      await AsyncStorage.setItem('token', idToken);
      navigation.navigate('Home');
      console.log(userInfo);
    } catch (error) {
      console.log('=> Google Sign In', error);
      return null;
    }
  };
  return (
    <ImageBackground source={require('../image/Bg.jpg')} style={{flex: 1}}>
      <StatusBar backgroundColor="#4169e1" />
      <View style={{height: 500}}>
        <SvgComponent />
      </View>
      <TouchableOpacity
        onPress={() => _signInWithGoogle()}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: 'blue',
          padding: 8,
          borderRadius: 10,
          width: '80%',
          alignSelf: 'center',
          bottom: 80,
        }}>
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Light}
        />
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#fff',marginLeft:8}}>
          SignIn Using Google
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default GoogleSignIn;
