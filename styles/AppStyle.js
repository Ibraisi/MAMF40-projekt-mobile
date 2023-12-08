import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: "100%", // Adjust the width as needed
    height: "50%", // Adjust the height as needed
    resizeMode: "contain", // Adjust the resizeMode as needed
  },
  sectionHeader: {
    flex: 0.1,
    fontSize: 25, // Assuming scalable font size, adjust as necessary
    fontWeight: "bold",
    marginVertical: "2%",
    marginLeft: 0,
    alignItems: "flex-start",
  },
  emptyContainer1: {
    flex: 0.1,
    width:"0%",
  },
  cameraContainer: {
    flex: 0.4,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
    borderRadius: 10, // Apply border radius directly to camera container
    borderWidth: 4,
    borderColor: 'white',
  },
  
  cameraWrapper: {
    flex: 1,
    width: "100%",
    borderRadius: 20, // Apply border radius directly to the wrapper view
    overflow: 'hidden', // Ensure that content is clipped to the border radius
  },
  
  camera: {
    aspectRatio: 1,
    width: "100%", // Adjusted to fill the wrapper view
  },
  
  //
  buttonContainer: {
    flex: 0.1,
    width: "90%",
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
    borderWidth: 2,
    paddingHorizontal:"0.5%",
    borderColor: "grey",
    borderRadius: 5, // Adjust as necessary
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
    backgroundColor: "grey",
    padding: "5%",
    width:"90%", 
    borderRadius: 29,
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
    marginBottom: "10%",
  },
  rescanButtonText: {
    color: "white",
    textAlign: "center",
  },
  submitButtonn: {
    backgroundColor: "#28a745",
    padding: "5%",
    width: "90%",
    //height:"5%",
    borderRadius: 30,
    marginTop: "5%",
    marginBottom: "5%",
    //marginBottom: "1%",
    color:"red",

  },
  submitButton: {
    backgroundColor: "#28a745",
    padding: "5%",
    width: "90%",
    //height:"5%",
    borderRadius: 30,
    marginTop: "3%",
    //marginBottom: "1%",
    color:"red",

  },
  submitButtonText: {
    color: "white",
    textAlign: "center",

  },
  changeSectionButton: {
    backgroundColor: "#6c757d",
    padding: "4%",
    borderRadius: 30,
    marginTop: "2%",
    marginBottom: "5%",
    width:300,
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
    borderRadius: 10,
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