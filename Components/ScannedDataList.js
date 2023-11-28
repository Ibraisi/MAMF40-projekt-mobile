import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import styles from "../styles/AppStyle"; // Adjust path as necessary

const ScannedDataListComponent = ({ scannedDataList, handleRemoveItem }) => {
  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.scrollView}>
        {scannedDataList.map((item, index) => (
          <View key={index} style={styles.scannedItemContainer}>
            <View>
              <Text style={styles.listItem}>
                #{index + 1} GTIN: {item.data.gtin}
              </Text>
              <Text style={styles.listItem}>Expiry: {item.data.expiry}</Text>
              {/* Additional item details here */}
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveItem(index)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScannedDataListComponent;
