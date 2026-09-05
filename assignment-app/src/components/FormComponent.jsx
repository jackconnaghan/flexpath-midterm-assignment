import React from "react";

export default function FormComponent({ input, setInput, 
    filterTypeValue, setNewFilterType, filterTypeOptions, 
    handleSubmit, handleDrop }) {

    return (
        <form onSubmit={(e) => {
                        handleSubmit(e);
                    }}>
                        <p>Select data point to filter search by</p>
                        <select className="row-g1 form-select form-select-sm w-50"
                            value={filterTypeValue}
                            onChange={(e) => {
                                setNewFilterType(e);
                            }}>
                            {filterTypeOptions.map((option, index) => (
                                <option key={`${index}`}>{`${option}`}</option>
                            ))}
                        </select>
                        <br></br>
                        <br></br>
                        <input className="form-control w-50" type="text" placeholder="keyword..."
                            value={input}
                            //this does not work without the brackets, 
                            //as React will not prioritize the onChange event
                            //and will cache it for async
                            onChange={(e) => {
                                setInput(e.target.value)
                            }

                            }
                            onDrop={(e) => {
                                //handleInputValueClear;
                                handleDrop(e);
                            }}></input>
                        <br></br>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
    )
}