function event(value){
    const shoot = ()=> {
        alert("hii");

    }

    const value2 = value.isValue;
        let one;

        if(value2){
            one = "hii";
        }
        else{
            one = "hello";
        }
    return (
        <div>
            <button onClick={shoot}>Hello</button>
            <h2>{one}</h2>
        </div>
    )
}

export default event;