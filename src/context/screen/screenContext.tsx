import React from 'react';


interface ContextScreenProp {
    todoKey: string,
    changeScreen: (key: string | null) => void
}
export const ScreenContext = React.createContext<ContextScreenProp>(null!)