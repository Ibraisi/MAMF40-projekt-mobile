import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';

//Kopplingen mella appen och webbaplikationen
const WebAppLink = () => {
    const computerWebAppURL = 'http://172.20.10.2:3000'; // Your computer's web app URL
  
    const openWebLink = () => {
      Linking.openURL(computerWebAppURL)
        .catch(err => {
          console.error('An error occurred', err);
        });
    };
  
    return (
      <View>
        <Text style={{ marginTop:"10%" }}>Länk till webbapplikationen</Text>
        <TouchableOpacity onPress={openWebLink}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline',marginTop:"3%" }}>
            Öppna webbapplikationen
          </Text>
        </TouchableOpacity>
      </View>
    );
};

export default WebAppLink;
