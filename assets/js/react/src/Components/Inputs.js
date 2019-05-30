import React from "react"
export const Inputs = ({name,value,onChange,type})=>(
    <div class={"col-md-6 offset-md-3"}>
    <input  name={name} value={value}
                  onChange={onChange} type={type}/>
    </div>
) 