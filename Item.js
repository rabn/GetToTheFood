import React, { Component, } from 'react'
import { View, ListView, TouchableHighlight, AppRegistry, StyleSheet, Text } from 'react-native'

export default class Item extends Component {
 _navigate(rowData) {
     console.log(this.props.navigator)
      this.props.navigator.push({
          id: 'RestaurantList',
          passProps: {
            restaurant_obj: rowData
          }
      })
  }
  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={()=>this._navigate(this.props.rowData)}>
          <Text>
            {this.props.rowData.res_name}
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

AppRegistry.registerComponent('Item', () => Item);
