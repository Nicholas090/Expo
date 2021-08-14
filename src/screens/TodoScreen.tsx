import React, {useState, useContext} from 'react';
import { View, StyleSheet, Text, Button, Dimensions} from 'react-native';
import { EditModal } from '../components/editModal';
import { AppCard } from '../ui/card';
import {THEME} from '../theme';
import {AppTextBold} from '../ui/AppTextBold';
import {AppBtn} from '../ui/AppBtn';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import {TodoContext} from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';




// interface TodoScreenProp {
//     goBack(): void,
//     todo: any ,
//     onRemove(key: string): void,
//     onSave(key: string ,title: string): void
// }

export const TodoScreen: React.FC= () => {
    
    const {todos, removeTodo, updateTodo} = useContext(TodoContext);
    const {todoKey, changeScreen }= useContext(ScreenContext);

    const [modal, setModal] = useState<boolean>(false);

    const todo = todos.find(i => i.key === todoKey);

    const saveHandler = (title: string) => {
        updateTodo(todo!.key, title)
        setModal(false)
    }
    
    

    return (
        <View>  
            <EditModal
             value={todo!.title} 
             visible={modal}
              onCancle={() => setModal(false)}
              onSave={saveHandler}
              />
        <AppCard styled={styles.card}>
        <AppTextBold styled={styles.title}>{todo!.title}</AppTextBold>
        <AppBtn  onPress={() => setModal(true)}>
        <FontAwesome name='edit' size={20}/>
        </AppBtn>
        </AppCard>
            <View style={styles.buttons}>
            <View style={styles.button}>
            <AppBtn
            
            onPress={() => changeScreen(null!)} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={23} color="white"/>
            </AppBtn>               
            </View>
            <View style={styles.button}>
            <AppBtn 
            onPress={() => removeTodo(todo!.key)} 
            color={THEME.DANGER_COLOR}>
            <FontAwesome name="remove" size={23} color="white"/>
            </AppBtn>
            </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 26
    },
    card: {
        marginBottom: 20,
        padding: 15
    }
})