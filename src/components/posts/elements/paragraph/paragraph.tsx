import React from "react";

import styles from "./paragraph.module.scss";
import TextObject, {TextObjectProps} from "../textObject/textObject";
import {ParagraphInputRaw} from "./paragraphInput";

export default function Paragraph(props: TextObjectProps) {
    return TextObject({
        internalProps: props,
        editObjectType: ParagraphInputRaw,
        viewObjectType: <div className={styles.paragraph}/>,
        topDivClass: styles.paragraph,
    })
}
