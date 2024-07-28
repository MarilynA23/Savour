import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

export default function App() {
  const [recipe, setRecipe] = useState(null);
  const [diet, setDiet] = useState('');
  const [maxCalories, setMaxCalories] = useState('');

  // Replace with your backend URL
  const backendURL = 'Add backend URL here'; // Replace with your backend URL

  const fetchRecipe = async () => {
    try {
      const response = await axios.get(backendURL, {
        params: {
          diet,
          max_calories: maxCalories,
        },
      });
      setRecipe(response.data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      setRecipe(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Random Recipe Generator</Text>
      <TextInput
        style={styles.input}
        placeholder="Diet (e.g., vegetarian)"
        value={diet}
        onChangeText={setDiet}
      />
      <TextInput
        style={styles.input}
        placeholder="Max Calories"
        keyboardType="numeric"
        value={maxCalories}
        onChangeText={setMaxCalories}
      />
      <Button title="Get Recipe" onPress={fetchRecipe} />
      {recipe && (
        <View style={styles.recipeContainer}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Text>Calories: {recipe.calories}</Text>
          <Text>Ingredients:</Text>
          <FlatList
            data={recipe.extendedIngredients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text>- {item.name}</Text>}
          />
          <Text>Instructions:</Text>
          <Text>{recipe.instructions}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
  },
  recipeContainer: {
    marginTop: 20,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
