import { useEffect, useState } from "react";

function UseLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(() => {
        try {
            const item = localStorage.getItem(key);

            return item? (JSON.parse(item) as T) :  initialValue;

            // return item ? JSON.parse(item, (k, v) => {
            //     if (k === "birthDate") return new Date(v);

                // if (k === "duration" && Array.isArray(v)) {
                //     return v.map((d: string | null) => (d ? new Date(d) : null));
                // }
                // return v;
            // }) as T
            //     :
            //     initialValue;
        }
        catch {
            return initialValue;
        }
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue] as const;
}

export default UseLocalStorage;