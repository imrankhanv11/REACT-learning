import { useEffect, useState } from "react";

function UseLocalStorage<T>(key: string, InitialValue: T){
    const [value, setValue] = useState<T>(()=>{
        try{
            const item = localStorage.getItem(key);

            return item? (JSON.parse(item) as T) :  InitialValue;
        }
        catch{
            return InitialValue;
        }
    })

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(value));
    },[key, value]);

    return [value, setValue] as const;
}

export default UseLocalStorage;