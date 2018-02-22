import {ShapeNode, TextNode, Node, ImageNode} from "../@types/tree";
import convertTextNode from './Text';
import convertShapeNode from './Shape';
import convertImageNode from './Image';

const run = (element: HTMLElement): Node => {
    if (element.nodeType === 3) {
        const object: TextNode = convertTextNode(<HTMLElement> element);
        return object;
    }else if (element.tagName === 'IMG') {
        const object: ImageNode = convertImageNode(<HTMLImageElement> element);
        return object;
    } else {
        const object: ShapeNode = convertShapeNode(element);
        object.children = Array.from(element.childNodes)
            .filter((child:HTMLElement) => ((child.nodeType === 3 && child.textContent.trim() !== '') || child.nodeType === 1))
            .map((child:HTMLElement) => run(child));
        return object
    }
};

export default run;
