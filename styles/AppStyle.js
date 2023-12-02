import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flex: 0.1,
    fontSize: 20, // Assuming scalable font size, adjust as necessary
    fontWeight: "bold",
    marginVertical: "2%",
    marginLeft: 0,
    alignItems: "flex-end",
  },
  emptyContainer1: {
    flex: 0.1,
  },
  cameraContainer: {
    flex: 0.4,
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "100%", // Adjust as necessary
    marginTop:"5%",
    marginBottom:"4%",
  },
  camera: {
    aspectRatio: 1,
    width: "100%",
    backgroundColor: "lightgray",
    borderRadius: 20, // Adjust as necessary
  },
  buttonContainer: {
    flex: 0.1,
    width: "40%",
    marginTop: "2%",
    marginBottom: "1.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20, // Adjust as necessary
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: "2%",
    paddingHorizontal: "5%",
    borderRadius: 20, // Adjust as necessary
    backgroundColor: "#007bff", // Example button color
  },
  emptyContainer2: {
    flex: 0.1,
  },
  listContainer: {
    flex: 0.4,
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20, // Adjust as necessary
  },
  listItem: {
    fontSize: 16, // Assuming scalable font size, adjust as necessary
    marginVertical: "0.4%",
    paddingLeft: "0.7%",
  },
  scrollView: {
    flex: 1,
  },
  startScanButton: {
    backgroundColor: "#007bff",
    padding: "1%",
    borderRadius: 5,
    marginTop: "1%",
    marginBottom: "1%",
  },
  startScanButtonText: {
    color: "white",
    textAlign: "center",
  },
  rescanButton: {
    backgroundColor: "#ff9800",
    padding: "1%",
    borderRadius: 5,
    marginTop: "1%",
    marginBottom: "1%",
  },
  rescanButtonText: {
    color: "white",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: "6%",
    width: "70%",
    //height:"5%",
    borderRadius: 5,
    marginTop: "5%",
    //marginBottom: "1%",
    color:"red",

  },
  submitButtonText: {
    color: "white",
    textAlign: "center",

  },
  changeSectionButton: {
    backgroundColor: "#6c757d",
    padding: "6%",
    borderRadius: 5,
    marginTop: "1%",
    marginBottom: "1%",
  },
  changeSectionButtonText: {
    color: "white",
    textAlign: "center",
  },
  scannedItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1%",
    borderRadius: 5,
    padding: "1%",
  },
  removeButton: {
    marginLeft: "2%",
    backgroundColor: "red",
    padding: "1%",
    borderRadius: 5,
  },
  removeButtonText: {
    color: "white",
  },
});