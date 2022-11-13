import React from "react";

import styles from "./title.module.scss";
import TextObject, {TextObjectProps} from "../textObject/textObject";
import {TitleInputRaw} from "./titleInput";

export default function Title(props: TextObjectProps) {
    return TextObject({
        internalProps: props,
        editObjectType: TitleInputRaw,
        viewObjectType: <div className={styles.title}/>,
        topDivClass: styles.title,
    })
}
