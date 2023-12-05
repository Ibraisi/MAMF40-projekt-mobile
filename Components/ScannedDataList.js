import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; // Adjust the library and icon as necessary

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
              marginBottom: "3%",
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: "5%",
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
                marginLeft: 15,
                backgroundColor: "red",
                padding: 7,
                borderRadius: 7,
              }}
            >
              <Icon name="trash" size={20} color="white" />

            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScannedDataListComponent;
