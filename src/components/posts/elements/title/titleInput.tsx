import React from "react";

import TextObjectInput, {TextObjectInputProps} from "../textObject/textObjectInput";
import styles from "./title.module.scss";

export const TitleInputRaw = <input/>
export default function TitleInput(props: TextObjectInputProps) {
    return TextObjectInput({
        internalProps: props,
        editObjectType: TitleInputRaw,
        topDivClass: styles.title,
    })
}
