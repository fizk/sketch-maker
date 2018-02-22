import {convertRGB, boxShadow, radius, border} from "../util/string";
import {ShapeNode} from "../@types/tree";

export default (element: HTMLElement): ShapeNode => {
    const box = element.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);

    const styleBackgroundColor = convertRGB(computedStyle.backgroundColor);
    const styleBoxShadow = boxShadow(computedStyle.boxShadow);
    const styleRadius = radius(computedStyle.borderRadius, box.width, box.height);
    const styleBorder = border(computedStyle.borderColor, computedStyle.borderWidth);

    const style = Object.assign(
        {},
        {radius: styleRadius},
        {backgroundColor: styleBackgroundColor},
        styleBoxShadow ? {boxShadow: styleBoxShadow} : {},
        styleBorder ? {border: styleBorder} : {},
     );

    return {
        type: 'shape',
        nodeName: element.nodeName,
        x: box.left,
        y: box.top,
        width: box.width,
        height: box.height,
        style: style,
        classes: Array.from(element.classList).map(item => String(item)),
        children: []
    };
}
