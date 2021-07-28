import React, {useState} from "react";
import {View, StyleSheet, TextInput, Button, ViewStyle, Alert} from 'react-native'; 

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
            />
            <Button  
            title="Добавить"
            onPress={pressBtn}
            />
        </View>
    )
} 

const styles = StyleSheet.create<styleTodo>({
    block: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 1
    },
    input: {
        width: "70%",
        borderStyle: "solid",
        borderBottomWidth: 2,
        borderBottomColor: "#3949ab",
        padding: 10
    }
});