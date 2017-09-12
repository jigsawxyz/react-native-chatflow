import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native';

import ChatFlow from "react-native-chatflow";
import chatScript from "./chatScript.json";

export default class ChatExample extends Component {
  render() {
    return (
      <View style={localStyles.container}>
        <StatusBar hidden={true}/>
        <ChatFlow
          backgroundColor="#f4f4f4"
          chatScript={chatScript}
          />
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('ChatExample', () => ChatExample);
