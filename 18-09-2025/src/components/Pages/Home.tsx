import { useState } from "react";
import Form from "../HomeComponets/Form";
import UserList from "../HomeComponets/UserList";
import { toast } from "react-toastify";

export interface ItemList {
    id: number,
    BookName: string,
    Discription: string,
    Gender: string,
    Email: string,
    IsActive: boolean,
    Hobbies: string[],
    Department: string
};

function Home() {

    const [lists, setLists] = useState<ItemList[]>([]);

    const addItems = (BookName: string, Discription: string, Gender: string, Email: string, Hobbies: string[], department: string) => {

        const item: ItemList = {
            id: Date.now(),
            BookName, Discription,
            Gender, Email,
            IsActive: true,
            Hobbies,
            Department: department
        }
        setLists((prev) => [...prev, item]);
    };

    const deleteItem = (id: number) => {
        setLists(prevLists =>
            prevLists.map(item =>
                item.id === id
                    ? { ...item, IsActive: false }
                    : item
            )
        )

        toast(
            <div>
                <strong className=" text-danger">List Deleted</strong>
                <p>Please find that in Deleted list</p>
            </div>
        )
    };


    return (
        <>
            <div className=" container-md d-flex mt-3">
                <Form onAdd={addItems} />
                <div className=" container d-flex flex-column">
                    <div className="mt-3">
                        <UserList items={lists.filter(s => s.IsActive)} ondelete={deleteItem} IsActive={true} />
                    </div>
                    <div className=" mt-3 mb-3">
                        <UserList items={lists.filter(s => !s.IsActive)} IsActive={false} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;