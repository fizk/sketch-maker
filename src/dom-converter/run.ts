import {ShapeNode, TextNode, Node, ImageNode} from "../@types/tree";
import convertTextNode from './Text';
import convertShapeNode from './Shape';
import convertImageNode from './Image';

const run = async (element: HTMLElement): Promise<Node> => {
    if (element.nodeType === 3) {
        const object: TextNode = await convertTextNode(<HTMLElement> element);
        return object;
    }else if (element.tagName === 'IMG') {
        const object: ImageNode = await convertImageNode(<HTMLImageElement> element);
        return object;
    } else {
        const object: ShapeNode = await convertShapeNode(element);
        object.children = await Promise.all(
            Array.from(element.childNodes)
            .filter((child:HTMLElement) => ((child.nodeType === 3 && child.textContent.trim() !== '') || child.nodeType === 1))
            .map((child:HTMLElement) => run(child))
        );
        return object
    }
};

export default run;
