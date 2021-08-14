import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import { Navbar } from './components/Navbar';
import {THEME} from './theme';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContext';


export interface infTodo {
    key: string,
    title: string
  }
  

export const MainLayout: React.FC = () => {
   const {todoKey} = useContext(ScreenContext);    


    return (
        <View>
          <Navbar title="todoApp"/>
         <View style={styles.container}>
           {todoKey ?  <TodoScreen/> : <MainScreen/>}
           </View>
        </View>
    
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 10
    }
  });
  