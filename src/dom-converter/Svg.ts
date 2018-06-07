import {ImageNode, ShapeNode} from "../@types/tree";
import convertShapeNode from "./Shape";
import * as sha1 from 'js-sha1';

export default async (element: HTMLImageElement): Promise<ShapeNode> => {

    const shapeObject = await convertShapeNode(element);

    element.style.width = `${(Number(element.style.width) * 8)}px`;
    element.style.height = `${(Number(element.style.height) * 8)}px`;

    //
    const appendStyles = (el) => {
        Object.entries(getComputedStyle(el)).forEach(item => {
            el.style[item[0]] = item[1]

        });
        Array.from(el.children).forEach(appendStyles);
    };
    appendStyles(element);

    return new Promise<ShapeNode>((resolve, reject) => {
        debugger;
        const svgString = new XMLSerializer().serializeToString(element);
        const canvas = document.createElement('canvas');
        canvas.height = shapeObject.height * 8;
        canvas.width = shapeObject.width * 8;
        const ctx = canvas.getContext("2d");
        const DOMURL = self.URL || (<any>self).webkitURL || self;
        const img = new Image();
        const svg = new Blob([svgString], {type: "image/svg+xml;charset=utf-8"});
        const url = DOMURL.createObjectURL(svg);
        img.addEventListener('load', () => {
            ctx.drawImage(img, 0, 0);
            const dataURL = canvas.toDataURL("image/png").replace('data:image/png;base64,', '');
            const node: ShapeNode = (Object.assign({}, shapeObject, {
                style: {
                    backgroundColor: {
                        r: 0,
                        g: 0,
                        b: 0,
                        a: 1,
                    },
                    backgroundImage: {
                        naturalWidth: element.naturalWidth,
                        naturalHeight: element.naturalHeight,
                        base64: dataURL,
                        name: sha1(dataURL),
                        ext: 'png'
                    }
                }
            }));
            element.style.width = `${(Number(element.style.width) / 8)}px`;
            element.style.height = `${(Number(element.style.height) / 8)}px`;
            resolve(node)
        });
        img.addEventListener('error', () => {
            reject(null);
        });

        img.src = url;
    })

}

