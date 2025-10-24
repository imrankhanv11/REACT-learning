import { useEffect, useState } from "react";

function About() {
    const [input, changecount] = useState(1);

    const [count, countIncreae] = useState(0);

    const handleClick = () => {
        changecount(prev => prev + 1);
    };

    useEffect(() => {
        console.log("input", input);
    });

    useEffect(() => {
        if (count <= 99) {
            const timer = setTimeout(() => {
                countIncreae(prev => prev + 1);
            }, 1000);

            // return () => clearTimeout(timer);
        }
    }, [count]);


    return (
        <div className="container mt-4">

            <button className="btn btn-dark" onClick={handleClick}>
                Count
            </button>
            <div className="mt-2">
                <p>Count is : {input}</p>
            </div>
            <div className="c container mt-3">
                <h1>The Count : {count}</h1>
            </div>
            <div style={{ height: "80vh" }}>

            </div>
        </div>
    );
}

export default About;
