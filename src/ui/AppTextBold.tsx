import React, { PropsWithChildren } from 'react';
import {Text, StyleSheet} from 'react-native';

interface AppTextBoldProp {
    // children: any,
    styled?: any
}
export const AppTextBold: React.FC<AppTextBoldProp> = ({children, styled}: PropsWithChildren<AppTextBoldProp>) => 
    (
        <Text style={{...styles.default, ...styled}}>{children}</Text>
    )


    const styles = StyleSheet.create({
        default:  {
            fontFamily: 'roboto-bold'
        }
    });