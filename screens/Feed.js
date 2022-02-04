import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { RFValue } from 'react-native-responsive-fontsize'
import firebase from 'firebase'

import PostCard from './PostCard'

let posts = require('./Posts.json')

export default class Feed extends React.Component {
  constructor() {
    super()
    this.state = {
      theme: null,
      posts: {},
    }
  }

  renderItem = ({ item: post }) => {
    return <PostCard post={post} navigation={this.props.navigation} />
  }

  keyExtractor = (item, index) => index.toString()

  getPosts = () => {
    firebase
      .database()
      .ref('posts/')
      .on('value', (x) => {
        var posts = []
        Object.keys(x.val()).forEach((y) => {
          console.log(y)
          posts.push({ z: x.val()[y] })
          console.log(posts)
          this.setState({ posts: posts })
        })
      })
  }

  fetchUser = async () => {
    let theme
    await firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid)
      .on('value', (snapshot) => {
        theme = snapshot.val().current_theme
        this.setState({ theme: theme })
      })
  }

  componentDidMount() {
    this.fetchUser()
    this.getPosts()
  }

  render() {
    if (this.state.theme !== null) {
      return (
        <View
          style={[
            styles.container,
            {
              backgroundColor:
                this.state.theme === 'light'
                  ? '#fff'
                  : this.state.theme === 'dark'
                  ? '#000'
                  : 'transparent',
            },
          ]}
        >
          <SafeAreaView style={styles.droidSafeArea} />
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.posts}
            renderItem={this.renderItem}
          />
        </View>
      )
    } else {
      return <ActivityIndicator size={'large'} color={'#000'} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.935,
    backgroundColor: '#2b2b2b',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
})
