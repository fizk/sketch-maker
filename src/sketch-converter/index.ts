import {
    createRect, createShapeGroup, createSketchBitmap, createSketchBorder,
    createSketchColor,
    createSketchCurvePoint,
    createSketchFill, createSketchGroup, createSketchMSJSONImageReference,
    createSketchPath,
    createSketchRectangle,
    createSketchShadow,
    createSketchStyle
} from "./creators";
import {GenericNode, GroupNode, ImageNode, ShapeNode, TextNode} from "../@types/tree";
import {SketchLayer} from "../@types/sketch";

const traverse = (node: GenericNode, offsetX: number = 0, offsetY: number = 0): SketchLayer[] => {

    if (node.type === 'text') {
        // const shapeGroup1 = createSketchText(
        //     data.text,
        //     createRect(data.width, data.height, data.x, data.y)
        // );
        // everything.push(shapeGroup1);
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
                [createSketchFill(
                    createSketchColor(
                        (<TextNode>node).style.color.r,
                        (<TextNode>node).style.color.g,
                        (<TextNode>node).style.color.b, 0.5
                    )
                )],
                [],
                []
            )
        )];

    } else if (node.type === 'image') {
        return [createSketchBitmap(
            undefined,
            (<ImageNode>node).image.name,
            createRect(node.width, node.height /*,node.x, node.y*/),
            createSketchStyle(
                [createSketchFill(
                    createSketchColor(
                        (<ImageNode>node).style.backgroundColor.r,
                        (<ImageNode>node).style.backgroundColor.g,
                        (<ImageNode>node).style.backgroundColor.b,
                        (<ImageNode>node).style.backgroundColor.a
                    )
                )],
                ((<ImageNode>node).style.border || []).map(border => {
                    return createSketchBorder(
                        createSketchColor(border.color.r,border.color.g, border.color.b, border.color.a),
                        border.thickness
                    )
                }),
                ((<ImageNode>node).style.boxShadow || []).map(shadow => {
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

    } else if (node.type === 'shape') {

        const children: SketchLayer[] = node.children.reduce((prev, current) => {
            prev.push(...traverse(<GenericNode> current, offsetX, offsetY));
            return prev;
        }, []);

        const path1 = createSketchPath([
            createSketchCurvePoint([0, 0], [0, 0], [0, 0], undefined, undefined, (<ShapeNode>node).style.radius),
            createSketchCurvePoint([1, 0], [1, 0], [1, 0], undefined, undefined, (<ShapeNode>node).style.radius),
            createSketchCurvePoint([1, 1], [1, 1], [1, 1], undefined, undefined, (<ShapeNode>node).style.radius),
            createSketchCurvePoint([0, 1], [0, 1], [0, 1], undefined, undefined, (<ShapeNode>node).style.radius)
        ]);

        const sketchLayer1 = createSketchRectangle(
            path1,
            createRect(node.width, node.height/*, node.x, node.y*/),
            (<ShapeNode>node).style.radius
        );

        const shapeGroup = createShapeGroup(
            node.nodeName,
            [sketchLayer1],
            node.x - offsetX,
            node.y - offsetY,
            createSketchStyle(
                [createSketchFill(
                    createSketchColor(
                        (<ShapeNode>node).style.backgroundColor.r,
                        (<ShapeNode>node).style.backgroundColor.g,
                        (<ShapeNode>node).style.backgroundColor.b,
                        (<ShapeNode>node).style.backgroundColor.a
                    ),
                    (<ShapeNode>node).style.backgroundImage
                        ? createSketchMSJSONImageReference((<ShapeNode>node).style.backgroundImage.name)
                        : null,
                )],
                ((<ShapeNode>node).style.border || []).map(border => {
                    return createSketchBorder(
                        createSketchColor(border.color.r,border.color.g, border.color.b, border.color.a),
                        border.thickness
                    )
                }),
                ((<ShapeNode>node).style.boxShadow || []).map(shadow => {
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

        const children: SketchLayer[] = node.children.reduce((prev, current) => {
            prev.push(...traverse(<GenericNode> current, node.x + offsetX, node.y + offsetY));
            return prev;
        }, []);

        return [createSketchGroup(
            (<GroupNode>node).name,
            createRect(node.width, node.height, node.x, node.y),
            children
        )];
    }
};

export default traverse ;
