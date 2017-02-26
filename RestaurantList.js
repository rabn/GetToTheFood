import React, { Component, } from 'react'
import { View, ListView, AppRegistry, StyleSheet, Text } from 'react-native'

export default class RestaurantList extends Component {
  render() {
    console.log('in',this.props.restaurant_obj)
    return (
      <Text>hello</Text>
    )
  }
}

AppRegistry.registerComponent('RestaurantList', () => RestaurantList);