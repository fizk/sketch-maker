import {TextNode} from "../@types/tree";
import {convertRGB} from '../util/string'
export default (element: HTMLElement): TextNode => {
    const range = document.createRange();
    range.setStart(element, 0);
    range.setEnd(element, element.textContent.length);
    const rects = range.getClientRects();

    const all = Array.from(rects).map((rect: {top: number, left: number, width: number, height: number}): any => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        return {
            top: rect.top + scrollTop,
            left: rect.left + scrollLeft,
            width: rect.width,
            height: rect.height,
        };
    });

    const top = Math.min(...all.map(item => item.top));
    const left = Math.min(...all.map(item => item.left));
    const width = Math.max(...all.map(item => item.width));
    const height = all.reduce((prev, item) => prev + item.height, 0);

    const styles = getComputedStyle(element.parentElement);
    const color = convertRGB(styles.color);

    return {
        type: 'text',
        nodeName: element.nodeName,
        classes: [],
        x: left,
        y: top,
        width: width,
        height: height,
        text: element.textContent,
        style: {
            color: color
        }
    };
}
