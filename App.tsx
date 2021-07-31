import React, {FunctionComponent, JSXElementConstructor, useState} from 'react';
import { StyleSheet, Text, View , ScrollView, FlatList} from 'react-native';
import { Navbar } from './src/Navbar';
import { AddTodo } from './src/AddTodo';
import {Todo} from './src/Todo';

interface infTodo {
  key: string,
  title: string
}

 
export default function App() {


  const [todos, setTodos] = useState<Array<infTodo>>([]);

  const addTodo = (title: string) => {
//     const newTodo = {
//       id: Date.now().toString(),
//       title: title
// }

    // setTodos(todos.concat([newTodo]))
    // setTodos( (prevTodos) => {
    //     return [
    //       ...prevTodos,
    //       newTodo
    //     ]
    // });

    setTodos(prev => [
      ...prev, 
      {
      key: Date.now().toString(),
      title
    }
  ])
  };
    


  return (
    <View>
       <Navbar title="todoApp"/>
      <View style={styles.container}>
      <AddTodo onSubmit={addTodo} />

        <FlatList
        keyExtractor={item => item.key.toString()}
        data={todos}
        renderItem={({item}) => <Todo todo={item} key={item.key}/>}
        />

    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      paddingHorizontal: 30,
      paddingVertical: 20
  }
});
