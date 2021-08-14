import React, { ReactNode } from "react";
import {View, Text, StyleSheet, ViewStyle, TextStyle, Platform} from "react-native";
import {AppTextBold} from '../ui/AppTextBold';
import { THEME } from "../theme";


interface StylesNavbar {
    navbar: ViewStyle,
    text: TextStyle;
    navbarAndroid: ViewStyle,
    navbarIos: ViewStyle
};

interface Props {
    title: ReactNode
};




export const Navbar: React.FC<Props> = ({title}) => {
    return (
        <View style={{...styles.navbar, ...Platform.select({
            ios:styles.navbarIos,
            android:styles.navbarAndroid
        })}}>
            <AppTextBold styled={styles.text}>My first App and {title}</AppTextBold>
        </View>
    )
};


const styles = StyleSheet.create<StylesNavbar>({
    navbar: {
        height: 70,
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "grey",
        paddingBottom: 5
    },
    text: {
        fontSize: 25, 
        color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : 'white',
     },
     navbarAndroid: {
        backgroundColor: THEME.MAIN_COLOR,
     },
     navbarIos: {
         borderBottomWidth: 1,
         borderBottomColor: THEME.MAIN_COLOR,
         backgroundColor: 'white'
     }
   
});