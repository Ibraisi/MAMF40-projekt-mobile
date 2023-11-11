import React from 'react';
import { View, Text } from 'react-native';

const PermissionRequestComponent = ({ hasPermission }) => {
  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }
  return null;
};

export default PermissionRequestComponent;
