import React, {useState} from "react";
import styles from "./textObject.module.scss";

export interface TextObjectProps {
    initialText: string
    newTextCallback?: (text: string) => void
    placeholder?: string
}

export interface TextObjectGeneratorProps {
    internalProps: TextObjectProps
    editObjectType: any
    viewObjectType: any
    topDivClass: string
}

export default function TextObject({internalProps, editObjectType, viewObjectType, topDivClass}: TextObjectGeneratorProps) {
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [text, setText] = useState<string>(internalProps.initialText)

    const save = () => {
        internalProps.newTextCallback!(text)
        setEditMode(false)
    }

    const cancel = () => {
        setText(internalProps.initialText)
        setEditMode(false)
    }

    if (isEditMode) {
        let editObject = React.cloneElement(editObjectType, {
            ...editObjectType.props,
            value: text,
            placeholder: internalProps.placeholder,
            onChange: (e: any) => setText(e.target.value),
        })

        return (
            <div className={topDivClass}>
                <div>{editObject}</div>
                {
                    <div className={styles.buttons}>
                        <div className={styles.button} onClick={save}>
                            Save
                        </div>
                        <div className={styles.button} onClick={cancel}>
                            Cancel
                        </div>
                    </div>
                }
            </div>
        )
    } else {
        let extraProps = {}
        if (internalProps.newTextCallback !== undefined) {
            extraProps = {onClick: () => setEditMode(true)}
        }

        let viewObject = React.cloneElement(
            viewObjectType,
            {
                ...viewObjectType.props,
                ...extraProps,
            },
            [text],
        )

        return viewObject
    }
}
