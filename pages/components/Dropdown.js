// Dropdown.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Dropdown = ({ label, data, onSelect }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsVisible(!isVisible);
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelect(item);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <Text style={styles.selectedText}>
          {selectedItem ? selectedItem.label : 'Select an item...'}
        </Text>
        {/* <Text style={{color:"#000"}}>+</Text> */}
      </TouchableOpacity>
      {isVisible && (
        <View style={styles.dropdownContainer}>
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.value}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    color:"#000",
    fontSize: 16,
    marginBottom: 8,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc', 
    padding: 12,
  },
  selectedText: {
    color: '#000',
    fontSize: 16,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginTop: 8,
    maxHeight: 150,
  },
  item: {
    padding: 12,
  },
  itemText: {
    color: '#000',
    fontSize: 16,
  },
});

export default Dropdown;
