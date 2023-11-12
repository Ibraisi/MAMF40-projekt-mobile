import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import styles from "../styles/AppStyle"; // Adjust path as necessary

const ScannedDataListComponent = ({ scannedDataList, handleRemoveItem }) => {
  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.scrollView}>
        {scannedDataList.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <View>
              <Text style={styles.listItem}>
                #{index + 1} GTIN: {item.data.gtin}
              </Text>
              <Text style={styles.listItem}>Expiry: {item.data.expiry}</Text>
              {/* Additional item details here */}
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveItem(index)} // Use index for removal
              style={{
                marginLeft: 20,
                backgroundColor: "red",
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={{ color: "white" }}>Remove</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScannedDataListComponent;
