import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

interface todoProp {
    todo: any,
    onRemove: any,
    onOpen: any
}


export const Todo:React.FC<todoProp> = ({todo, onRemove, onOpen}) => {
    return (
        <TouchableOpacity 
        activeOpacity={0.4}
        onPress={() => onOpen(todo.key)}
        onLongPress={() => onRemove(todo.key)}
        >
        <View style={styles.todo}>
            <Text style={styles.title}>
                {todo.title}
            </Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    todo:{
        flexDirection: 'row',
        alignItems:'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10,
    },
    title: {
        fontFamily: 'robot-bold'
    }
})