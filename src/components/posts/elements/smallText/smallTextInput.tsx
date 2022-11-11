import React from "react";

import TextObjectInput, {TextObjectInputProps} from "../textObject/textObjectInput";
import styles from "./smallText.module.scss";

export const SmallTextInputRaw = <input type="text"/>
export default function SmallTextInput(props: TextObjectInputProps) {
    return TextObjectInput({
        internalProps: props,
        editObjectType: SmallTextInputRaw,
        topDivClass: styles.smallText,
    })
}
