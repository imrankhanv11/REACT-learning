import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [store, setStore] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);

            return item ? (JSON.parse(item) as T) : initialValue;

            // return item? JSON.parse(item, (k,v)=>{
            //     if(k==="addedDate") return new Date(v);

            //     return v
            // }) : initialValue
        }
        catch {
            return initialValue
        }
    });

    useEffect(()=>{
        localStorage.setItem(key, JSON.stringify(store));
    },[key, store]);

    return [store, setStore] as const;
}

export default useLocalStorage;