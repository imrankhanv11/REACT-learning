import { useEffect, useState } from "react";


function UseLocalStorage<T>(key: string, initialValue: T){
    const [value, setValue] = useState(()=>{
        try{
            const item = localStorage.getItem(key);
            
            return item? (JSON.parse(item) as T) : initialValue;
        }
        catch{
            return initialValue;
        }
    })


    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    },[key, value]);

    return [value, setValue] as const;
}

export default UseLocalStorage;