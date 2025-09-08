import { useState } from "react";

function contact() {

    const [data, addData] = useState({
        todo: "",
        discription: ""
    });

    const [list, addlist] = useState([
        { todo: "Buy groceries", discription: "Milk, Bread, Eggs" },
        { todo: "Finish homework", discription: "Math exercises" },
        { todo: "Call friend", discription: "Check weekend plans" }
    ]);

    function formSubmit(e) {
        e.preventDefault();

        const newlist = [...list, data]
        addlist(newlist);

        addData({
            todo: "",
            discription: ""
        })

    }

    function onchangeinput(e) {
        addData({
            ...data,
            [e.target.name]: e.target.value
        });
    }

    function deleteitem(index) {
        const update = list.filter((_, index1) => index1 != index);

        addlist(update)
    }

    return (
        <>
            <form onSubmit={formSubmit} className="mt-4 container mb-4">
                <label>Enter the do :</label><br />
                <input type="text" onChange={onchangeinput} value={data.todo} name="todo" /><br />
                <br />
                <label>Enter the Discription : </label><br />
                <input type="text" onChange={onchangeinput} value={data.discription} name="discription" /><br /><br />

                <button type="submit" className="btn btn-primary">Click</button>
            </form>
            <div className="mt-3 container bg-secondary p-3 rounded shadow mb-3">
                <h4 className="text-light mb-3">Your To-Do List</h4>
                <ul className="list-group">
                    {list.map((value, index) => (
                        <li
                            key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div>
                                <strong className="text-primary">{value.todo}</strong>
                                <span className="text-muted ms-2">- {value.discription}</span>
                            </div>
                            <button className="btn btn-danger" onClick={() => deleteitem(index)}>delete</button>
                        </li>
                    ))}
                </ul>
            </div>

        </>
    )
}

export default contact;