import React from "react"
import { View, Text, StyleSheet, FlatList, Platform } from "react-native"

import { CATEGORIES, MEALS } from "../data/dummy-data"
import MealItem from "../components/MealItem"
import Colors from "../constants/Colors"

const CategoryMealsScreen = props => {
  const catId = props.navigation.getParam("categoryId")
  const displayedMeals = MEALS.filter(
    meal => meal.categoryIds.indexOf(catId) >= 0
  )

  const renderMealItem = itemData => {
    return (
      <MealItem
        item={itemData.item}
        onSelectMeal={() => {
          props.navigation.navigate({
            routeName: "MealDetails",
            params: {
              mealId: itemData.item.id,
            },
          })
        }}
      />
    )
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={displayedMeals}
        renderItem={renderMealItem}
        style={{ width: "100%" }}
      />
    </View>
  )
}

/**
 * Setting navigation options dynamically
 *
 * @param {*} navigationData is a navigation prop automatically set
 * @returns navigation options object
 */
CategoryMealsScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam("categoryId")
  const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

  return {
    headerTitle: selectedCategory.title,
    headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
})

export default CategoryMealsScreen
