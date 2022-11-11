import React from "react";

export interface TextObjectInputProps {
    value: string
    placeholder: string
    onChange: (data: string) => void
}

export interface TextObjectGeneratorInputProps {
    internalProps: TextObjectInputProps
    editObjectType: any
    topDivClass: string
}

export default function TextObjectInput({internalProps, editObjectType, topDivClass}: TextObjectGeneratorInputProps) {
    let editObject = React.cloneElement(editObjectType, {
        ...editObjectType.props,
        value: internalProps.value,
        placeholder: internalProps.placeholder,
        onChange: (e: any) => internalProps.onChange(e.target.value),
    })

    return (
        <div className={topDivClass}>
            {editObject}
        </div>
    )
}
