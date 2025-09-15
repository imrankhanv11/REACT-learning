import React, { useEffect, useState } from "react";

interface ItemList {
    id: number,
    BookName: string,
    Discription: string
};

interface ActiveList {
    items: ItemList[];
    ondelete: (id: number) => void;
}

const ActiveList: React.FC<ActiveList> = ({ items, ondelete }) => {

    const [itemCount, setCount] = useState<number>(0);

    useEffect(()=> {setCount(items.length)},[items]);

    return (
        <div className="card h-100 shadow-sm container">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3 text-info">Active List</h5>

                {items.length === 0 ?
                    (<p className="text-muted">No active items</p>)
                    :
                    
                    ( 
                    <div>
                        <p>Total Number of list : {itemCount}</p>
                        <ul className="list-group list-group-flush overflow-auto flex-fill">
                        {items.map((item) => (
                            <div>
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center mt-1 border-2 rounded-2" >
                                    <div>
                                        <strong>Book Name:</strong> {item.BookName} <br />
                                        <strong>Description:</strong> {item.Discription}
                                    </div>
                                    <button onClick={() => ondelete(item.id)} className="btn btn-sm btn-danger">Delete</button>
                                </li>
                            </div>
                        ))}
                    </ul>
                    </div>
                    )}
            </div>
        </div>


    );
};

export default ActiveList;