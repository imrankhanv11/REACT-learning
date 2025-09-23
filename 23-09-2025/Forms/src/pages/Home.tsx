import type React from "react";
// import Form from "../components/Form";
import BootrapForm from "../components/BootrapForm";

const Home: React.FC = () => {
    console.log("HOme");
    return(
        <div>
            {/* <Form /> */}
            <BootrapForm />
        </div>
    );
};

export default Home;