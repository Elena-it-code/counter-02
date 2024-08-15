import React from "react";

export type ButtonPropsType = {
    children: React.ReactNode
    className?: string
    onClick?: (() => void)
    disabled?: boolean
}


export const Button = (props: ButtonPropsType) => {
    return (
        <button className={props.className}
                onClick={props.onClick}
                disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}