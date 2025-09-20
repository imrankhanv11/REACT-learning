import React, { useEffect, useState } from "react";

interface ItemList {
    id: number,
    BookName: string,
    Discription: string,
    Gender: string,
    Email: string,
    IsActive: boolean,
    Hobbies: string[],
    Department: string
};

interface UserList {
    items: ItemList[];
    ondelete?: (id: number) => void;
    IsActive: boolean
}

const UserList: React.FC<UserList> = ({ items, ondelete, IsActive }) => {

    const [itemCount, setCount] = useState<number>(0);

    useEffect(() => { setCount(items.length) }, [items]);

    return (
        <div className="card h-100 shadow-sm container">
            <div className="card-body d-flex flex-column">
                {IsActive ?
                    <h5 className="card-title mb-3 text-info">Active List</h5>
                    :
                    <h5 className="card-title mb-3 text-danger">Deleted List</h5>}

                {items.length === 0 ?
                    (<p className="text-muted">No active items</p>)
                    :

                    (
                        <div>
                            <p>Total Number of list : {itemCount}</p>
                            <ul className="list-group list-group-flush overflow-auto flex-fill">
                                {items.map((item, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center mt-1 border-2 rounded-2" >
                                        <div>
                                            <strong>Name:</strong> {item.BookName} <br />
                                            <strong>Description:</strong> {item.Discription} <br />
                                            <strong>Gender:</strong> {item.Gender}<br />
                                            <strong>Email:</strong> {item.Email} <br />
                                            <strong>Department:</strong> {item.Department} <br />
                                            <strong>Hobbies:</strong>
                                            <ul>
                                                {item.Hobbies.map((hobby, index) => (
                                                    <li key={index}>{hobby}</li>
                                                ))}
                                            </ul>

                                        </div>
                                        {IsActive && ondelete &&
                                            <button onClick={() => ondelete(item.id)} className="btn btn-sm btn-danger">Delete</button>}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
            </div>
        </div>


    );
};

export default UserList;