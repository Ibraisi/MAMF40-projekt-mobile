import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"; 
import styles from "../styles/AppStyle"; 

// Style för hur listan ska se ut när man skannar medicinen
const ScannedDataListComponent = ({ scannedDataList, handleRemoveItem }) => {
  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.scrollView}>
        {scannedDataList.map((item, index) => (
          <View
            key={index}
            //Hur de skanna ska ligga och se ut i listan
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "3%",
              marginVertical: "1%",
              marginHorizontal:"2%",
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 5,
              padding: 10,
            }}
          >
            <View>
              <Text style={styles.listItem}>
              #{index +1} Name/PN: {item.data.name}  {/* Displaying name or GTIN */}
              </Text>
              <Text style={styles.listItem}>Expiry: {item.data.expiry}</Text>
              {/* Additional item details here */}
            </View>
            <TouchableOpacity
              onPress={() => handleRemoveItem(index)} 
              style={{
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
