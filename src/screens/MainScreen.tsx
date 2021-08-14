import React, {useState, useEffect, useContext} from 'react';
import { View, StyleSheet, Image, FlatList, useWindowDimensions, Dimensions} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import { THEME } from '../theme';
import {TodoContext} from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';




export const MainScreen: React.FC = () => {
   
    const {addTodo, todos, removeTodo} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);


    const [deviceWidth, setDeviceWidth] = useState<number>(useWindowDimensions().width - THEME.PADDING_HORIZONTAL * 2);

    useEffect(() => {
        const update = () => {
            const width = useWindowDimensions().width - THEME.PADDING_HORIZONTAL * 2
            setDeviceWidth(width);
        }
        Dimensions.addEventListener('change', update);
        

         return () => {
         Dimensions.removeEventListener('change', update);
         }
    });

   let content: JSX.Element = (
    <View style={{width: deviceWidth}}>
          <FlatList
    data={todos}
    renderItem={({item}) => (
    <Todo
     todo={item} 
     key={item.key} 
     onRemove={removeTodo} 
     onOpen={changeScreen} />
   
    )}
    />
    </View>
   )

   if (todos.length === 0) {
       content = (
       <View style={styles.imgWrap}>
           <Image 
           source={require('../../assets/no-items.png')}
           style={styles.image}
           />
       </View>
       )
   }
   
    return (
     <View>
        <AddTodo onSubmit={addTodo} />
        {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        padding: 10,
        justifyContent: 'center',
        height: 300
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    }
});