import React, {useState} from "react";
import {View, StyleSheet, TextInput, ViewStyle, Alert, Keyboard} from 'react-native'; 
import {AntDesign} from '@expo/vector-icons';
interface styleTodo {
    block: ViewStyle,
    input: {};
  
}

interface TodoProps {
    onSubmit: any
}


export const AddTodo: React.FC<TodoProps> = ({onSubmit}) => {

    const [value, setValue] = useState('');

   const pressBtn = () => {
       if (value.trim()) {
           onSubmit(value);
        setValue('');
        Keyboard.dismiss();
       } else {
        Alert.alert('Вы не ввели ничего что-то')
    }
      
   }
 
    return (
        <View style={styles.block}>
            <TextInput 
            style={styles.input}
            onChangeText={(text:string) => setValue(text)}
            value={value}
            placeholder="Введите что-то !!!"
            autoCorrect={false}
            autoCapitalize='none'
            />

            <AntDesign.Button 
             onPress={pressBtn}
             name="pluscircleo">
                 Добавить
            </AntDesign.Button>
        </View>
    )
} 

const styles = StyleSheet.create<styleTodo>({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    input: {
        width: "70%",
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: "#3949ab",
        padding: 10
        
    }
});