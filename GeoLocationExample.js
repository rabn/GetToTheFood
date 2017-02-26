import React, { Component, } from 'react'
import { View, } from 'react-native'

export default GeolocationExample = (props) => {
   return (
      <View style = {styles.container}>

         <Text>
            <Text style = {styles.boldText}>
               Initial position:
            </Text>
            {props.initialPosition}
         </Text>
         <Text>
            <Text style = {styles.boldText}>
               Current position:
            </Text>
            {props.lastPosition}
         </Text>

      </View>
   );
}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 70
   },
   boldText: {
      flex: 1,
      fontWeight: 'bold'
   }
});
export default GeoLocationExample