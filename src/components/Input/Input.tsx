import React from "react";

export type InputPropsType = {
    type: "number"
    style?: React.CSSProperties
    className: string
    onChange?: (((event: React.ChangeEvent<HTMLInputElement>) => void))
    value: number
}


export const Input = (props: InputPropsType) => {
    return (
        <>
            <input type={props.type}
                   style={props.style}
                   className={props.className}
                   value={props.value}
                   onChange={props.onChange}/>
        </>
    )
}