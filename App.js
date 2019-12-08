import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Ionicons } from '@expo/vector-icons'

import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'

import HomeScreen from './screens/HomeScreen'
import MessageScreen from './screens/MessageScreen'
import PostScreen from './screens/PostScreen'
import NotificationScreen from './screens/NotificationScreen'
import ProfileScreen from './screens/ProfileScreen'

import * as firebase from 'firebase'

const AppContainer = createStackNavigator(
  {
    default: createBottomTabNavigator(
      {
        Home: {
          screen: HomeScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}> </Ionicons>
          }
        },
        Message: {
          screen: MessageScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-chatboxes" size={24} color={tintColor}> </Ionicons>
          }
        },
        Post: {
          screen: PostScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => 
            <Ionicons 
            name="ios-add-circle" 
            size={40} 
            color="#B8BBC4" 
            style={{
                shadowColor: "#5ABCF4", 
                shadowOffset: { width: 0, height: 0}, 
                shadowRadius: 10, 
                shadowOpacity: 0.3  
          }}> </Ionicons>
          }
        },
        Notification: {
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-notifications" size={24} color={tintColor}> </Ionicons>
          }
        },
        Profile: {
          screen: ProfileScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={24} color={tintColor}> </Ionicons>
          }
        },
      },
      {
        defaultNavigationOptions: {
          tabBarOnPress: ({navigation, defaultHandler}) => {
            if (navigation.state.key === "Post") { 
              navigation.navigate("postModal")
            } else {
              defaultHandler()
            }
          }
        },
        tabBarOptions: {
          activeTintColor: "#5ABCF4",
          inactiveTintColor: "#B8BBC4",
          showLabel: false,
          activeBackgroundColor: "transparent",
          inactiveBackgroundColor: "transparent",
          elevation: 0,
          shadowColor: "transparent",
          borderTopColor: "transparent"
        },
        style: {
          elevation: 0,
          shadowColor: "transparent",
          borderTopColor: "transparent"
        }
      },
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none",
    // initialRouteName: "postModal"
  }
)


const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)