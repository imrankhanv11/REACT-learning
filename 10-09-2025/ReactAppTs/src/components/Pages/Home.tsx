import { useState } from "react";
import Form from "../HomeComponets/Form";
import ActiveList from "../HomeComponets/ActiveList";
import DeletedList from "../HomeComponets/DeletedList";

interface ItemList {
    id: number,
    BookName: string,
    Discription: string
};

function Home() {

    const [lists, setLists] = useState<ItemList[]>([]);
    const [deletelist, setDeleteLists] = useState<ItemList[]>([]);

    const addItems = (BookName: string, Discription: string) => {

        const item: ItemList = {
            id: Date.now(),
            BookName, Discription
        }
        setLists((prev) => [...prev, item]);
    };

    const deleteItem = (id: number) => {
        const itemToDelete = lists.find((item) => item.id === id);
        if (!itemToDelete) return;

        setLists((prev) => prev.filter((item) => item.id !== id));

        setDeleteLists((prev) => [...prev, itemToDelete]);
    };


    return (
        <>
            <div className=" container-md d-flex mt-3">
                <Form onAdd={addItems} />
                <div className=" container d-flex flex-column">
                    <div className="mt-3">
                        <ActiveList items={lists} ondelete={deleteItem} />
                    </div>
                    <div className=" mt-2">
                        <DeletedList items={deletelist} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;