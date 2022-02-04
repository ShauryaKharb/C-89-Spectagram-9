import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
import Ionicons from 'react-native-vector-icons/Ionicons'
import firebase from 'firebase'

export default class PostCard extends React.Component {
  constructor() {
    super()
    this.state = {
      theme: null,
    }
  }

  async fetchUser() {
    var theme
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
  }

  render() {
    let preview_images = {
      image1: require('../assets/image_1.jpg'),
      image2: require('../assets/image_2.jpg'),
      image3: require('../assets/image_3.jpg'),
      image4: require('../assets/image_4.jpg'),
      image5: require('../assets/image_5.jpg'),
      image6: require('../assets/image_6.jpg'),
      image7: require('../assets/image_7.jpg'),
    }
    if (this.state.theme !== null) {
      return (
        <View style={styles.container}>
          <ScrollView>
            <SafeAreaView style={styles.droidSafeArea} />
            <View
              style={[
                styles.cardContainer,
                {
                  backgroundColor:
                    this.state.theme === 'light'
                      ? '#ff4ff0'
                      : this.state.theme === 'dark'
                      ? '#801'
                      : 'transparent',
                },
              ]}
            >
              <Image
                source={{ uri: this.props.post.z.profile_image }}
                style={styles.profileImage}
              />
              <Text
                style={[
                  styles.authorName,
                  { color: this.state.theme === 'light' ? '#000' : '#fff' },
                ]}
              >
                {this.props.post.z.author}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('PostScreen', {
                    xyz: this.props.post.z,
                  })
                }}
              >
                <Image
                  source={preview_images[this.props.post.z.preview_image]}
                  style={styles.image}
                />
                <Text
                  style={[
                    styles.caption,
                    { color: this.state.theme === 'light' ? '#000' : '#fff' },
                  ]}
                >
                  {this.props.post.z.caption}
                </Text>
              </TouchableOpacity>
              <View style={styles.likeButtonContainer}>
                <Ionicons
                  name={'heart'}
                  size={RFValue(20)}
                  color={'#fff'}
                  style={styles.icon}
                />
                <Text style={styles.likeText}>{this.props.post.z.likes}</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      )
    } else {
      return <ActivityIndicator size={'large'} color={'#fff'} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  cardContainer: {
    marginLeft: RFValue(13),
    marginRight: RFValue(13),
    borderRadius: RFValue(20),
  },
  profileImage: {
    resizeMode: 'contain',
    height: RFValue(30),
    width: '100%',
    borderRadius: 1000,
    margin: RFValue(15),
    marginBottom: RFValue(-45),
    marginRight: '90%',
    alignSelf: 'center',
  },
  authorName: {
    color: '#fff',
    padding: RFValue(20),
    textAlign: 'left',
    marginLeft: '8%',
    fontSize: RFValue(15),
  },
  image: {
    resizeMode: 'contain',
    height: RFValue(200),
    width: RFValue(300),
    alignSelf: 'center',
    borderRadius: 15,
    marginLeft: RFValue(10),
    marginRight: RFValue(10),
  },
  caption: {
    color: '#fff',
    padding: RFValue(20),
    textAlign: 'left',
    fontSize: RFValue(15),
  },
  likeButtonContainer: {
    flexDirection: 'row',
    backgroundColor: 'red',
    marginBottom: RFValue(20),
    width: RFValue(100),
    alignSelf: 'center',
    borderRadius: RFValue(50),
  },
  icon: {
    marginTop: '5%',
    alignSelf: 'center',
    justifyContent: 'center',
    marginLeft: '13%',
  },
  likeText: {
    padding: RFValue(10),
    color: '#fff',
    textAlign: 'center',
    fontSize: RFValue(16),
  },
})
