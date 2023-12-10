import React from 'react';
import { View, Text } from 'react-native';

// Funktionell komponent för att hantera visningen av meddelanden om kameratillstånd
const PermissionRequestComponent = ({ hasPermission }) => {
  // Om kameratillståndet är null, visa ett laddningsmeddelande
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  // Om kameratillståndet är false, visa ett meddelande om ingen åtkomst till kameran
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }
  // Om kameratillståndet är true (dvs. användaren har gett tillstånd), returnera null (inget att visa)
  return null;
};

// Exportera komponenten för användning i andra delar av applikationen
export default PermissionRequestComponent;
