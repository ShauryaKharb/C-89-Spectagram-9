import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import Loading from './screens/Loading'
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'

import { firebaseConfig } from './config'
import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
} else {
  firebase.app()
}

const AppNavigator = createSwitchNavigator({
  LoadingScreen: Loading,
  Login: Login,
  Dashboard: Dashboard,
})

const AppContainer = createAppContainer(AppNavigator)

export default function App() {
  return <AppContainer />
}

// VI COMMAND ==>>  openssl rand -base64 32 | openssl sha1 -c
// execute it in ==>> Program Files/Git/usr/bin

// npm i @react-navigation/drawer@5.12.5 @react-navigation/material-bottom-tabs@5.3.15 @react-navigation/native@5.9.4 @react-navigation/stack@5.14.4 expo-app-loading@1.3.0 expo-google-app-auth@8.3.0 firebase@8.2.10 react-native-dropdown-picker@4.0.4 react-native-gesture-handler@2.1.0 react-native-reanimated@2.1.0 react-native-responsive-fontsize@0.5.0 react-navigation@4.4.4
