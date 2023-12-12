import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // Hela appen övergripliga style
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  // Style för Region Skåne bilden
  imageStyle: {
    width: "100%", 
    height: "50%", 
    resizeMode: "contain", 
  },
  // Håller i headern, stylen för den är i App.js
  sectionHeader: {
    flex: 0.08,
   // marginVertical: "0%",
   // alignItems: "flex-start",
  },
  // Bägrensaren för wrappern, (lägg border color red för att se den)
  cameraContainer: {
    flex: 0.5,
    width: "80%",
   // justifyContent: "center",
   // alignItems: "center",
    marginTop: "5%",
    
  },
  
  // Kameran igger inuti denna som kontrollera kamerans begränsningar
  cameraWrapper: {
    //flex: 1,
    
    height:270,
    borderRadius: 10, 
    borderWidth: 4,
    //borderColor: 'white',
   // width: "100%",
    borderRadius: 20, 
    overflow: 'hidden', 
  },
  
  // Själva kameran 
  camera: {
    aspectRatio: 1,
   // width: "100%", 
  },
  
  //
  //buttonContainer: {
  //  flex: 0.1,
  //  width: "1000%",
  //  marginTop: "2%",
  //  marginBottom: "1.5%",
  //  justifyContent: "center",
   // alignItems: "center",
  //  borderRadius: 20, 
 // },
  //button: {
  //  flex: 10,
  //  justifyContent: 'center',
  //  alignItems: 'center',
  //  paddingVertical: "2%",
  //  paddingHorizontal: "5%",
  //  borderRadius: 20, 
   // backgroundColor: "#007bff", 
  //},

  // Containern längst upp i sidan där man skannar mediciner
  emptyContainer1: {
    flex: 0.1,
  },
    // Containern längst ner i sidan där man skannar mediciner
  emptyContainer2: {
    flex: 0.1,
  },
  // Hela containern som innehåller alla medicincontainer
  listContainer: {
    flex: 0.4,
    width: "80%",
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 5, 
  },
  // Varje medicincontainer för sig själv
  listItem: {
    fontSize: 16, 
    marginVertical: "0.%",
    paddingLeft: "0.7%",
  },
  //scrollView: {
   // flex: 5,
  //},

  // Knappen på första sidan
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
  // Knappen för att skanna igen efter att man har skannat fel avdelning
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
  // Knappen för att kunna skanna medciner
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
  // Knappen som skickar datan till databasen när man skannar
  submitButton: {
    backgroundColor: "#28a745",
    padding: "5%",
    width: "90%",
    //height:"5%",
    borderRadius: 30,
    marginTop: "3%",
    color:"red",

  },
  submitButtonText: {
    color: "white",
    textAlign: "center",

  },
  //Knappen för att ändra avdelning när man skannar mediciner
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

});