import {convertRGB, boxShadow, radius, border, backgroundImage} from "../util/string";
import {ShapeNode} from "../@types/tree";
import * as sha1 from 'js-sha1'

const getStuff = (url: string | null) => {

    if (!url) {
        return Promise.resolve(null);
    }

    let dataURL = '';

    return new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', (event) => {
            const canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            const context = canvas.getContext('2d');

            canvas.height = img.naturalHeight;
            canvas.width = img.naturalWidth;

            try {
                context.drawImage(img, 0, 0);
                dataURL = canvas.toDataURL('image/png').replace('data:image/png;base64,', '');
                document.body.removeChild(canvas);
                resolve({
                    naturalWidth: img.naturalWidth,
                        naturalHeight: img.naturalHeight,
                        base64: dataURL,
                        name: sha1(dataURL),
                        ext: 'png'
                });
            } catch (error) {
                document.body.removeChild(canvas);
                reject(error);
            }

        });
        img.src = url;
    });

};


export default async (element: HTMLElement): Promise<ShapeNode> => {
    const box = element.getBoundingClientRect();
    const computedStyle = getComputedStyle(element);

    const styleBackgroundColor = convertRGB(computedStyle.backgroundColor);
    const styleBoxShadow = boxShadow(computedStyle.boxShadow);
    const styleRadius = radius(computedStyle.borderRadius, box.width, box.height);
    const styleBorder = border(computedStyle.borderColor, computedStyle.borderWidth);
    const styleBackgroundImage = await getStuff(backgroundImage(computedStyle.backgroundImage));

    const style = Object.assign(
        {},
        {radius: styleRadius},
        {backgroundColor: styleBackgroundColor},
        styleBoxShadow ? {boxShadow: styleBoxShadow} : {},
        styleBorder ? {border: styleBorder} : {},
        styleBackgroundImage ? {backgroundImage: styleBackgroundImage} : {}
     );

    return Promise.resolve({
        type: 'shape',
        nodeName: element.nodeName,
        x: box.left,
        y: box.top,
        width: box.width,
        height: box.height,
        style: style,
        classes: Array.from(element.classList).map(item => String(item)),
        children: [],
        attributes: Array.from(element.attributes)
            .filter(attribute => attribute.name !== 'class' && attribute.name !== 'style')
            .reduce((prev, current) => {
                prev[current.name] = current.value;
                return prev;
        }, {})
    });
}
