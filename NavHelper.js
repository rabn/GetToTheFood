import React, { Platform } from 'react-native';
import _ from 'underscore';

import HomeContainer from './HomeContainer'
import RestaurantList from './RestaurantList'

module.exports = function (scene) {
    var componentMap = {
        'HomeContainer': {
            title: 'HomeContainer',
            name: 'HomeContainer',
            component: HomeContainer
        },
        'RestaurantList': {
            title: 'RestaurantList',
            name: 'RestaurantList',
            component: RestaurantList
        }
    }
    var component = componentMap[scene];
    var params = Platform.OS === 'ios' ? { passProps: scene.params } : scene.params;
    return _.extend(component, params);
}

export default NavHelper