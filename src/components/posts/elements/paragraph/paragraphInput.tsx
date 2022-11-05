import React from "react";

import TextObjectInput, {TextObjectInputProps} from "../textObject/textObjectInput";
import styles from "./paragraph.module.scss";

export const ParagraphInputRaw = <textarea/>
export default function ParagraphInput(props: TextObjectInputProps) {
    return TextObjectInput({
        internalProps: props,
        editObjectType: ParagraphInputRaw,
        topDivClass: styles.paragraph,
    })
}
