import React, {useState, useEffect, useContext, useCallback} from 'react';
import { View, StyleSheet, Image,Text, FlatList, useWindowDimensions, Dimensions} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import { THEME } from '../theme';
import {TodoContext} from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../ui/AppLoader';
import {AppText} from '../ui/AppText';
import { AppBtn } from '../ui/AppBtn';



export const MainScreen: React.FC = () => {
   
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext);
    const {changeScreen} = useContext(ScreenContext);


    const [deviceWidth, setDeviceWidth] = useState<number>(useWindowDimensions().width - THEME.PADDING_HORIZONTAL * 2);

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

    useEffect(() => {
        loadTodos();
    }, []);

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

    if (loading) {     
        return <AppLoader/>
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText styled={styles.error}>{error}</AppText>
                <AppBtn onPress={loadTodos}>Повторить</AppBtn>
            </View>
            )
   }

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
    },
    error: {
        fontSize: 25,
        color: THEME.DANGER_COLOR,
        paddingBottom: 30
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 170 ,
    }
});