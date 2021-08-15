import React, { PropsWithChildren } from 'react';
import {StyleSheet, View, TouchableOpacity,TouchableNativeFeedback, Platform} from 'react-native';
import { THEME } from '../theme';
import {AppTextBold} from './AppTextBold';

interface AppBtnProp {
    // children: any,
    onPress(): void,
    color?: any
}

export const AppBtn: React.FC<AppBtnProp> = ({children, onPress, color = THEME.MAIN_COLOR}:PropsWithChildren<AppBtnProp>) => {
    const Wrapper = 
    Platform.OS === 'android' ? (TouchableNativeFeedback) as React.ElementType : (TouchableOpacity) as React.ElementType ;
    

   return (
    <Wrapper onPress={onPress} activeOpacity={0.7}>
        <View style={{...styles.button, backgroundColor: color}}>
    <AppTextBold styled={styles.text} >{children}</AppTextBold>
        </View>
    </Wrapper>
    )
};


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
    },
    text: {
        color: 'white'
    }
});
