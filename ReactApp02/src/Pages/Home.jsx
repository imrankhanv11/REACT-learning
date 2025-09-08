import { useState } from "react";

function Home() {
    const [inputvalue, setinput] = useState("");
    const [setvalue, setinputvalue] = useState("");

    const sumbitprevent = (e) => {
        e.preventDefault();

        setinputvalue(inputvalue);

        setinput("");
    }

    return (
        <div>
            <h1>Home</h1>
            <div className="container mb-3">
                <form onSubmit={sumbitprevent}>
                    <input
                        type="text"
                        className="me-3"
                        value={inputvalue}
                        placeholder="imran"
                        onChange={(e) => setinput(e.target.value)} />

                    <button className="btn btn-primary">Sumbit</button>
                </form>

                <div className="container mt-2">
                    {setvalue && (
                        <div>
                            <h5>Sumbit value : </h5> <h5>{setvalue}</h5>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;