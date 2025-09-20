import type React from "react";
import { useRef} from "react";


const UseRefHooks: React.FC = () => {

    const refInputValue = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        refInputValue.current?.focus();
    }

    const renderCount = useRef<number>(0);
    renderCount.current += 1;

    return (
        <div className=" mt-3">
            <div className=" container">
                <form>
                    <div className=" mb-2">
                        <label htmlFor="" className=" form-label" >
                            Name :
                        </label>
                        <input type="text" className=" form-control w-50" ref={refInputValue} />
                    </div>
                    <div className=" mb-2">
                        <label htmlFor="" className=" form-label">
                            Description
                        </label>
                        <input type="text" className=" form-control w-50" />
                    </div>
                    <div>
                        <button className=" btn btn-info" type="button" onClick={focusInput}>
                            Focus
                        </button>
                    </div>
                </form>

                <div className="mt-2">
                    <strong>Render Count: {renderCount.current}</strong>
                </div>
            </div>
        </div>
    );
}

export default UseRefHooks;