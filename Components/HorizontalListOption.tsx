import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function HorizontalListOption({ options, callBack }): React.JSX.Element {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    callBack(selectedValue);
  }, [selectedValue]);

  const handleSelect = (item) => {
    setSelectedValue(item);
  };

  return (
    <View style={styles.listContainer}>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, selectedValue === item && styles.selectedItem]}
          onPress={() => handleSelect(item)}
        >
          <Text style={[styles.itemText, selectedValue === item && styles.selectedText]}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',  // Arrange items in a row
    flexWrap: 'wrap',      // Allow items to wrap onto the next line
    justifyContent: 'center', // Optional: center items horizontally
    paddingVertical: 0,     // No vertical padding
    paddingHorizontal: 0,   // No horizontal padding
  },
  item: {
    backgroundColor: '#ddd',
    padding: 15,           // Minimal padding
    margin: 5,             // Spacing between items
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 60,          // Optional: Ensure a minimum width for items
  },
  selectedItem: {
    backgroundColor: '#007BFF', // Change background color when selected
  },
  itemText: {
    fontSize: 14, // Slightly smaller text
  },
  selectedText: {
    color: 'white', // Change text color when selected
  },
});

export default HorizontalListOption;
