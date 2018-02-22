import {
    createRect, createShapeGroup, createSketchBitmap, createSketchBorder,
    createSketchColor,
    createSketchCurvePoint,
    createSketchFill, createSketchGroup,
    createSketchPath,
    createSketchRectangle,
    createSketchShadow,
    createSketchStyle
} from "./creators";
import {GenericNode, GroupNode, ImageNode, NonTerminal, ShapeNode, TextNode} from "../@types/tree";
import {SketchLayer} from "../@types/sketch";

const traverse = (data: GenericNode, offsetX: number = 0, offsetY: number = 0): SketchLayer[] => {

    if (data.type === 'text') {
        // const shapeGroup1 = createSketchText(
        //     data.text,
        //     createRect(data.width, data.height, data.x, data.y)
        // );
        // everything.push(shapeGroup1);
        const node = <TextNode> data;
        const path1 = createSketchPath([
            createSketchCurvePoint([0, 0], [0, 0], [0, 0]),
            createSketchCurvePoint([1, 0], [1, 0], [1, 0]),
            createSketchCurvePoint([1, 1], [1, 1], [1, 1]),
            createSketchCurvePoint([0, 1], [0, 1], [0, 1])
        ]);

        const sketchLayer1 = createSketchRectangle(
            path1,
            createRect(node.width, node.height /*, node.x, node.y*/)
        );

        return [createShapeGroup(
            'Text Layer',
            [sketchLayer1],
            node.x - offsetX,
            node.y - offsetY,
            createSketchStyle(
                [createSketchFill(createSketchColor(node.style.color.r, node.style.color.g, node.style.color.b, 0.5))],
                [],
                []
            )
        )];

    } else if (data.type === 'image') {
        const node = <ImageNode> data;
        return [createSketchBitmap(
            undefined,
            node.image.name,
            createRect(node.width, node.height /*,node.x, node.y*/),
            createSketchStyle(
                [createSketchFill(
                    createSketchColor(node.style.backgroundColor.r, node.style.backgroundColor.g, node.style.backgroundColor.b, node.style.backgroundColor.a)
                )],
                (node.style.border || []).map(border => {
                    return createSketchBorder(
                        createSketchColor(border.color.r,border.color.g, border.color.b, border.color.a),
                        border.thickness
                    )
                }),
                (node.style.boxShadow || []).map(shadow => {
                    return createSketchShadow(
                        createSketchColor(shadow.color.r, shadow.color.g, shadow.color.b, shadow.color.a),
                        shadow.blurRadius,
                        shadow.offsetX,
                        shadow.offsetY,
                        shadow.spread,
                    )
                })
            )
        )];

    } else if (data.type === 'shape') {

        const children: SketchLayer[] = (<NonTerminal> data).children.reduce((prev, current) => {
            prev.push(...traverse(<GenericNode> current, offsetX, offsetY));
            return prev;
        }, []);

        const node = <ShapeNode> data;
        const path1 = createSketchPath([
            createSketchCurvePoint([0, 0], [0, 0], [0, 0], undefined, undefined, node.style.radius),
            createSketchCurvePoint([1, 0], [1, 0], [1, 0], undefined, undefined, node.style.radius),
            createSketchCurvePoint([1, 1], [1, 1], [1, 1], undefined, undefined, node.style.radius),
            createSketchCurvePoint([0, 1], [0, 1], [0, 1], undefined, undefined, node.style.radius)
        ]);

        const sketchLayer1 = createSketchRectangle(
            path1,
            createRect(node.width, node.height/*, node.x, node.y*/),
            node.style.radius
        );

        const shapeGroup = createShapeGroup(
            node.nodeName,
            [sketchLayer1],
            node.x - offsetX,
            node.y - offsetY,
            createSketchStyle(
                [createSketchFill(
                    createSketchColor(node.style.backgroundColor.r, node.style.backgroundColor.g, node.style.backgroundColor.b, node.style.backgroundColor.a)
                )],
                (node.style.border || []).map(border => {
                    return createSketchBorder(
                        createSketchColor(border.color.r,border.color.g, border.color.b, border.color.a),
                        border.thickness
                    )
                }),
                (node.style.boxShadow || []).map(shadow => {
                    return createSketchShadow(
                        createSketchColor(shadow.color.r, shadow.color.g, shadow.color.b, shadow.color.a),
                        shadow.blurRadius,
                        shadow.offsetX,
                        shadow.offsetY,
                        shadow.spread,
                    )
                })
            )
        );
        return [shapeGroup, ...children];
    } else {

        const children: SketchLayer[] = (<NonTerminal> data).children.reduce((prev, current) => {
            prev.push(...traverse(<GenericNode> current, data.x + offsetX, data.y + offsetY));
            return prev;
        }, []);

        return [createSketchGroup(
            (<GroupNode> data).name,
            createRect(data.width, data.height, data.x, data.y),
            children
        )];
    }
};

export default traverse ;
