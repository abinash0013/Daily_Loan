// Example: Example of SQLite Database in React Native
// https://aboutreact.com/example-of-sqlite-database-in-react-native
// Custom Button

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Mybutton = (props) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={props.customClick}>
      <Text style={styles.text}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex:1,
    alignItems: 'center',
    justifyContent:"center",
    backgroundColor: '#f05555',
    color: '#ffffff',
    padding: 12,
    marginTop: 16,
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 100
    
  },
  text: {
    color: '#ffffff',
  },
});

export default Mybutton;