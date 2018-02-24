import {ImageNode} from "../@types/tree";
import convertShapeNode from "./Shape";
import * as sha1 from 'js-sha1';

export default async (element: HTMLImageElement): Promise<ImageNode> => {
    element.setAttribute('crossOrigin', 'anonymous');
    let dataURL = '';
    const shapeObject = await convertShapeNode(element);
    shapeObject.type = 'image';

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');

    canvas.height = element.naturalHeight;
    canvas.width = element.naturalWidth;

    try {
        context.drawImage(element, 0, 0);
        dataURL = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
    } catch (error) {
        console.error(error);
    }

    document.body.removeChild(canvas);

    const node: ImageNode = (Object.assign({}, shapeObject, {
        type: 'image',
        image: {
            naturalWidth: element.naturalWidth,
            naturalHeight: element.naturalHeight,
            base64: dataURL,
            name: sha1(dataURL),
            ext: 'png'
        }
    }));

    return Promise.resolve(node);
}

