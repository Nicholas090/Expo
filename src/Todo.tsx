import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

interface todoProp {
    todo: any
}


export const Todo:React.FC<todoProp> = ({todo}) => {
    return (
        <View style={styles.todo}>
            <Text>
                {todo.title}
            </Text>
        </View>
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
        marginBottom: 10
    }
})