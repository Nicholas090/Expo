import React, { PropsWithChildren } from 'react';
import {Text, StyleSheet} from 'react-native';

interface AppTextProp {
    // children: any,
    styled: any
}
export const AppText: React.FC<AppTextProp> = ({children, styled}: PropsWithChildren<AppTextProp>) => 
    (
        <Text style={{...styles.default, ...styled}}>{children}</Text>
    )


    const styles = StyleSheet.create({
        default:  {
            fontFamily: 'roboto-regular'
        }
    });