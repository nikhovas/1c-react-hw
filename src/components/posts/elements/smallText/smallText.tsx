import React from "react";

import styles from './smallText.module.scss'
import TextObject, {TextObjectProps} from "../textObject/textObject";
import {SmallTextInputRaw} from "./smallTextInput";

export default function SmallText(props: TextObjectProps) {
    return TextObject({
        internalProps: props,
        editObjectType: SmallTextInputRaw,
        viewObjectType: <div className={styles.smallText}/>,
        topDivClass: styles.smallText,
    })
}
