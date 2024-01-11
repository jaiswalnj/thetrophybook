import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Text, CheckBox } from 'react-native';

const CategoryList = ({ categories }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (categoryId) => {
    setSelectedCategories((prevSelected) =>
      prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId)
        : [...prevSelected, categoryId]
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <CheckBox
              value={selectedCategories.includes(item.id)}
              onValueChange={() => handleCheckboxChange(item.id)}
            />
            <Text style={styles.categoryName}>{item.name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0, // Position at the bottom
    left: 0,
    right: 0,
    backgroundColor: 'white', // Adjust as needed
    maxHeight: 400, // Set a maximum height
    overflow: 'auto', // Enable scrolling
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  categoryName: {
    marginLeft: 10,
  },
});

export default CategoryList;
