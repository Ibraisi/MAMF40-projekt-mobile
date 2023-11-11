import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../styles/AppStyle'; // Adjust path as necessary

const ScannedDataListComponent = ({ scannedDataList }) => {
  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.scrollView}>
        {scannedDataList.map((item) => (
          <Text key={item.id} style={styles.listItem}>
            {item.data}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScannedDataListComponent;
