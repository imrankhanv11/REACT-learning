import type React from "react";
import UseCallBackChildren from "./UseCallBackHookChildren";
import { useCallback, useState } from "react";

const UseCallBack: React.FC = () => {

    const [count, setCounter] = useState<number>(0);

    const items: string[] = ['one', 'two', 'three', 'four', 'five'];

    const callCheck = useCallback((item: string) => {
        console.log(`Selected item : ${item}`);
    }, [])

    return (
        <div>
            <div className="container text-white bg-black mt-3 rounded-3 p-2">
                <h2>This is Parent</h2>

                <button className="btn btn-primary" onClick={() => setCounter(count + 1)}>
                    count: {count}
                </button>
            </div>

            {items.map((item) => (
                <UseCallBackChildren key={item} item={item} onSelect={callCheck} />
            ))}
        </div>
    )
}

export default UseCallBack;