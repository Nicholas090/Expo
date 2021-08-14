import React , {useState}from 'react';
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native';
import { AppBtn } from '../ui/AppBtn';

interface EditModalProps {
    visible: any,
    onCancle: () => void,
    value: string,
    onSave: (title: string) => void
}

export const EditModal:React.FC<EditModalProps> = ({visible, onCancle, value, onSave}) => {
      
    const [title, setTitle] = useState(value)

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Error',
             `Минимальная длина названия 3 символа. Сейчас ${
                title.trim().length < 3  
            }`);
        }else {
           onSave(title) ;
        }
    }
    const cancelHandler = () => {
        setTitle(value);
        onCancle();
    }
    return (
            <Modal visible={visible} animationType="slide" >
              <View style={styles.wrap}>
                <TextInput
                value={title}
                onChangeText={setTitle}
                 style={styles.input} 
                placeholder='Введите Название'
                autoCapitalize='none'
                autoCorrect={false}
                maxLength={20}
                />
                <View style={styles.buttons}>
                <AppBtn 
                onPress={cancelHandler} 
                color='red'>
                Отменить
                </AppBtn>
                <AppBtn 
                onPress={saveHandler}>
                Сохранить
                </AppBtn>
                </View>
              </View>
            </Modal>
        )
}


const styles = StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    input: {
        padding: 10,
        borderBottomColor: 'green',
        borderBottomWidth: 2,
        width: '80%'
    },
    buttons: {
        width: '100%',
        marginTop: 14,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
   });