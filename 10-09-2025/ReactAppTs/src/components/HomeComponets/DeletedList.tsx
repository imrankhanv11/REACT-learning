import React, { useEffect, useState } from "react";

interface ItemList {
    id: number,
    BookName: string,
    Discription: string
};

interface DeletedListProps {
    items: ItemList[];
}

const DeletedList: React.FC<DeletedListProps> = ({ items }) => {

    const [itemcount, setCount] = useState<number>(0);

    useEffect(()=> {setCount(items.length)}, [items])

    return (
        <div className="card h-100 shadow-sm container mt">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-3 text-danger">Deleted List</h5>

                {items.length === 0 ?
                    (<p className="text-muted">No deleted items</p>)
                    :
                    (
                        <div>
                            <p>Total Number of list  : {itemcount}</p>
                            <ul className="list-group list-group-flush overflow-auto flex-fill">
                        {items.map((item) => (
                            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <strong>Book Name:</strong> {item.BookName} <br />
                                    <strong>Description:</strong> {item.Discription}
                                </div>
                            </li>
                        ))}
                    </ul>
                        </div>
                    )}
            </div>
        </div>

    );
};

export default DeletedList;
