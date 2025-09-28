import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
    const [item, setItem] = useState<T>(() => {
        try {
            const value = localStorage.getItem(key);

            return value? (JSON.parse(value) as T) :  initialValue;

        }
        catch {
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(item));
    }, [key, item]);

    return [item, setItem] as const;
}

export default useLocalStorage;