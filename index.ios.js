/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';
import HomeContainer from './HomeContainer';
import RestaurantList from './RestaurantList';

class Project extends Component {
  renderScene(route, nav) {
    switch(route.id) {
      case 'HomeContainer':
        return <HomeContainer navigator={nav} title="HomeContainer"/>  
      case 'RestaurantList':
        return <RestaurantList navigator={nav} title="RestaurantList"/>
    }
  }
  
  
  render() {
    let navObj
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Menu Spotter
        </Text>
        <Navigator
               initialRoute={{id: 'HomeContainer', component: HomeContainer}}
               renderScene={ (route, nav) => {
                 navObj = nav;  
                return this.renderScene(route,nav);
               }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Project', () => Project);
