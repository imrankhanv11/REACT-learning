import React, { useMemo, useState } from "react"


const UseMemoHook: React.FC = () => {

    const largeArray: number[] = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
        31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
        41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
        51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
        61, 62, 63, 64, 65, 66, 67, 68, 69, 70,
        71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
        81, 82, 83, 84, 85, 86, 87, 88, 89, 90,
        91, 92, 93, 94, 95, 96, 97, 98, 99, 100
    ];

    const [filterValue, setFilterValue] = useState<number>(0);
    const [count, setCount] = useState<number>(0);

    const filterNumber: number[] = useMemo(() => {
        console.log("calculating....");
        return largeArray.filter((num) => num > filterValue)
    }, [filterValue]);


    return (
        <div className="container">
            <h2>UseMemo Example</h2>
            <div>
                <form>
                    <div className="container mt-2">
                        <label htmlFor="" className=" form-label">
                            Enter the number
                        </label>
                        <input type="number" className=" form-control w-50"
                            min={1} max={100}
                            value={filterValue}
                            onChange={e => setFilterValue(Number(e.target.value))}
                        />
                    </div>
                </form>
            </div>
            <div className="mt-3">
                <strong>Filter Number Length : {filterNumber.length}</strong>
            </div>
            <div className="mt-3">
                <button className="btn btn-info"
                    onClick={() => setCount(count => count + 1)}>
                    Counter: {count}
                </button>
            </div>
        </div>
    );
};

export default UseMemoHook;