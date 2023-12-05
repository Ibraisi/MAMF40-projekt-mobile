import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

const WebAppLink = () => {
    const computerWebAppURL = 'http://192.168.1.99:3000/'; // Your computer's web app URL
  
    const openWebLink = () => {
      Linking.openURL(computerWebAppURL)
        .catch(err => {
          console.error('An error occurred', err);
        });
    };
  
    return (
      <View>
        <Text>Your App Content</Text>
        <TouchableOpacity onPress={openWebLink}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
            Open Web Link on Phone
          </Text>
        </TouchableOpacity>
      </View>
    );
};

export default WebAppLink;
