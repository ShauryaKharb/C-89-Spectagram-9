import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import { createDrawerNavigator } from '@react-navigation/drawer'
import StackNavigator from './StackNavigator'
import Profile from '../screens/Profile'
import Logout from '../screens/Logout'
import firebase from 'firebase'

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

export default class DrawerNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      light_theme: null,
    }
  }

  fetchUser = async () => {
    let theme
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme
        this.setState({ light_theme: theme === 'light' ? true : false })
      })
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    return (
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: this.state.light_theme ? '#e45edf' : '#801',
          inactiveTintColor: this.state.light_theme ? '#000' : '#fff',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => {
          return (
            <View
              style={{
                flex: 1,
                backgroundColor: this.state.light_theme ? '#fff' : '#000',
              }}
            >
              <Image
                source={require('../assets/logo.png')}
                style={styles.sideMenuProfileIcon}
              ></Image>
              {/* <DrawerContentScrollView {...props}> */}
              <DrawerItemList {...props} />
              {/* </DrawerContentScrollView> */}
            </View>
          )
        }}
      >
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Logout" component={Logout} />
      </Drawer.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: 'center',
    marginTop: RFValue(60),
    resizeMode: 'contain',
  },
})
