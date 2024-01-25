import { useState } from "react";

export const useLocalStorage = () => {
    const [value, setValue] = useState(null)


    const setItem = (key, value) =>{
        localStorage.setItem(key, value)
        setValue(value)
    }

    const getItem = (key)=>{
        const val = localStorage.getItem(key)
        return val
    }

    const removeItem = (key) =>{
        localStorage.removeItem(key)
        setValue(null)
    }

    return {
        value,
        setItem,
        getItem,
        removeItem
    }
}