import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Center all content vertically and horizontally
  },
  sectionHeader: {
    flex: 1, // Takes 10% of the screen height
    fontSize: 20, // Bigger font size
    fontWeight: "bold", // Bolder text
    marginVertical: 20,
    marginLeft: 0,
    alignItems: "flex-end", // Align text to the left
  },
  emptyContainer1: {
    flex: 1, // Takes 10% of the screen height
  },
  cameraContainer: {
    flex: 4, // Takes 70% of the screen height
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  camera: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "lightgray",
    borderRadius: 40,
  },
  buttonContainer: {
    flex: 0.8, // Takes 10% of the screen height
    width: "40%",
    marginTop: 20,
    marginBottom: 15,
    justifyContent: "center",
    borderWidth: 1, // Add a border
    borderColor: "black", // Border color
    borderRadius: 40,
    // Remove border properties from buttonContainer
  },
  button: {
    height: 10, // Set the height of the button as needed
    borderWidth: 1, // Add a border
    borderColor: "white", // Border color
    borderRadius: 40,
    color: "red",
  },
  emptyContainer2: {
    flex: 1, // Takes 10% of the screen height
  },
  listContainer: {
    flex: 4, // Takes 70% of the screen height
    borderStyle: "solid",
    borderWidth: 1,
    width: "70%",
    borderRadius: 20,
  },
  listItem: {
    fontSize: 16,
    marginVertical: 4,
    paddingLeft: 7,
  },
  scrollView: {
    // Customize the height
  },
  startScanButton: {
    backgroundColor: "#007bff", // Blue for primary action
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#0056b3",
    marginTop: 10,
    marginBottom: 10,
  },
  startScanButtonText: {
    color: "white",
    textAlign: "center",
  },
  rescanButton: {
    backgroundColor: "#ff9800", // Orange for secondary action
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e67e22",
    marginTop: 10,
    marginBottom: 10,
  },
  rescanButtonText: {
    color: "white",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#28a745", // Green for success
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#218838",
    marginTop: 10,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "white",
    textAlign: "center",
  },
  changeSectionButton: {
    backgroundColor: "#6c757d", // Gray for neutral action
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#5a6268",
    marginTop: 10,
    marginBottom: 10,
  },
  changeSectionButtonText: {
    color: "white",
    textAlign: "center",
  },
  scannedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 5,
    padding: 10,
  },

  removeButton: {
    marginLeft: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },

  removeButtonText: {
    color: "white",
  },
});
