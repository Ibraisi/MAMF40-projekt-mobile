import React from 'react';
import { View, Text, ScrollView, Button } from 'react-native';
import styles from '../styles/AppStyle'; // Adjust path as necessary

const ScannedDataListComponent = ({ scannedDataList, handleRemoveItem }) => {
  return (
    <View style={styles.listContainer}>
    <ScrollView style={styles.scrollView}>
      {scannedDataList.map((item) => (

    <View key={item.id} style={{ flexDirection: 'row' }}>
      <Text style={styles.listItem}>
        {item.data}
      </Text>
      <Button
        title="X"
        onPress={() => handleRemoveItem(item.id)}
        style={{ marginLeft: 20 }}
      />
      </View>

      ))}
    </ScrollView>
  </View>
  );
};

export default ScannedDataListComponent;
