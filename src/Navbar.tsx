import React, { ReactNode } from "react";
import {View, Text, StyleSheet, ViewStyle, TextStyle} from "react-native";

interface StylesNavbar {
    navbar: ViewStyle,
    text: TextStyle;

}

interface Props {
    title: ReactNode
}




export const Navbar: React.FC<Props> = ({title}) => {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>My first App and {title}</Text>
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
        color: "purple",
        fontSize: 25   
     }
})