import React, {PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';

interface CardProps {
    // children: JSX.Element 
    styled: any   
}

export const AppCard = ({children, styled}:PropsWithChildren<CardProps>) => 

    (  

    <View style={{...styles.default, ...styled}} >{children}</View>

)


const styles = StyleSheet.create({
   default: {
       padding: 20,
       flexDirection: 'row',
       justifyContent: 'space-between',
       shadowColor: '#000',
       shadowRadius: 2,
       shadowOpacity: 0.3,
       shadowOffset: {width: 2 , height: 2},
       backgroundColor: '#fff',
       borderRadius: 10
   }
  });
