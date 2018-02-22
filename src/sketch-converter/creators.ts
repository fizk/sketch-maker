import {
    Position, SHA1, SketchArtboard, SketchBitmap, SketchBlur,
    SketchBorder, SketchBorderOptions,
    SketchColor, SketchColorControls,
    SketchCurvePoint,
    SketchDocument, SketchExportOptions,
    SketchFill, SketchGraphicsContextSettings, SketchGroup, SketchInnerShadow,
    SketchLayer,
    SketchMeta, SketchMSAttributedString,
    SketchPage,
    SketchPath,
    SketchRect,
    SketchRectangle, SketchShadow,
    SketchShapeGroup,
    SketchStyle, SketchSymbolMaster, SketchText, SketchTextStyle,
    SketchUser, UUID
} from "../@types/sketch";
// import uuid from "./util/uuid";

const uuid = (): string => {
    let uuid = '', ii;
    for (ii = 0; ii < 32; ii += 1) {
        switch (ii) {
            case 8:
            case 20:
                uuid += '-';
                uuid += (Math.random() * 16 | 0).toString(16);
                break;
            case 12:
                uuid += '-';
                uuid += '4';
                break;
            case 16:
                uuid += '-';
                uuid += (Math.random() * 4 | 8).toString(16);
                break;
            default:
                uuid += (Math.random() * 16 | 0).toString(16);
        }
    }
    return uuid.toUpperCase();
};

export const createSketchCurvePoint = (
    from: Position,
    to: Position,
    point: Position,
    curveFrom: boolean = false,
    curveTo: boolean = false,
    radius: number = 0,
    mode: number = 1,
): SketchCurvePoint => {
    return {
        _class: "curvePoint",
        cornerRadius: radius,
        curveFrom: `{${from[0]}, ${from[1]}}`,
        curveMode: mode,
        curveTo: `{${to[0]}, ${to[1]}}`,
        hasCurveFrom: curveFrom,
        hasCurveTo: curveTo,
        point: `{${point[0]}, ${point[1]}}`,
    }
};

export const createSketchPath = (
    points: SketchCurvePoint[],
    closed: boolean = true,
    radiusBehaviour: number = 1
): SketchPath => {
    return {
        _class: 'path',
        isClosed: closed,
        pointRadiusBehaviour: radiusBehaviour,
        points: points
    }
};

export const createSketchRectangle = (
    path: SketchPath,
    frame: SketchRect,
    radius: number = 0
): SketchRectangle => {
    return {
        _class: "rectangle",
        booleanOperation: -1,
        do_objectID: uuid(),
        edited: false,
        exportOptions: {
            _class: "exportOptions",
            exportFormats: [],
            includedLayerIds: [],
            layerOptions: 0,
            shouldTrim: false
        },
        fixedRadius: radius,
        frame: frame,
        hasConvertedToNewRoundCorners: true,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 0,
        name: "Path",
        nameIsFixed: false,
        path: path,
        resizingConstraint: 63,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false
    }
};

export const createSketchColor = (
    red: number,
    green: number,
    blue: number,
    alpha: number = 1
): SketchColor => {
    return {
        _class: "color",
        alpha: alpha,
        blue: blue,
        green: green,
        red: red
    }
};

export const createSketchFill = (
    color: SketchColor
): SketchFill => {
    return {
        _class: "fill",
        color: color,
        fillType: 0,
        isEnabled: true,
        noiseIndex: 0,
        noiseIntensity: 0,
        patternFillType: 1,
        patternTileScale: 1
    }
};

export const createSketchBorder = (
    color: SketchColor,
    thickness: number = 1
): SketchBorder => {
    return {
        _class: "border",
        color: color,
        fillType: 0,
        isEnabled: true,
        position: 1,
        thickness: thickness
    }
};

export const createSketchShadow = (
    color: SketchColor,
    blurRadius: number = 0,
    offsetX: number = 0,
    offsetY: number = 0,
    spread: number = 0
):SketchShadow => {
    return {
        _class: 'shadow', // shadow
        isEnabled: true,
        contextSettings: {
            _class: 'graphicsContextSettings',
            blendMode: 0,
            opacity: 1
        },
        blurRadius: blurRadius,
        color: color,
        offsetX: offsetX,
        offsetY: offsetY,
        spread: spread
    }
};

export const createSketchStyle = (
    fills: SketchFill[],
    borders: SketchBorder[],
    shadows: SketchShadow[]
    // blur?: SketchBlur[],
    // borderOptions?: SketchBorderOptions,
    // contextSettings?: SketchGraphicsContextSettings,
    // colorControls?: SketchColorControls,
    // textStyle?: SketchTextStyle,
    // innerShadows: SketchInnerShadow[],
): SketchStyle => {
    return {
        _class: "style",
        borders: borders,
        shadows: shadows,
        fills: fills,
        miterLimit: 10,
        endDecorationType: 0,
        startDecorationType: 0
    }
};

export const createShapeGroup = (
    name: string = 'Rectangle',
    layers: SketchLayer[],
    x: number = 0,
    y: number = 0,
    style: SketchStyle
): SketchShapeGroup => {
    const widths = layers.map((item: SketchLayer) => item.frame.width);
    const heights = layers.map((item: SketchLayer) => item.frame.height);
    const maxWidth = Math.max(...widths);
    const maxHeight = Math.max(...heights);

    const myFrame = createRect(maxWidth, maxHeight, x, y);

    return {
        _class: "shapeGroup",
        clippingMaskMode: 0,
        do_objectID: uuid(),
        exportOptions: {
            _class: "exportOptions",
            exportFormats: [],
            includedLayerIds: [],
            layerOptions: 0,
            shouldTrim: false
        },
        // frame: frame,
        frame: myFrame,
        hasClickThrough: false,
        hasClippingMask: false,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 1,
        layers: layers,
        name: name,
        nameIsFixed: false,
        resizingConstraint: 63,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false,
        style: style,
        windingRule: 1
    }
};

export const createPage = (
    layers: Array<SketchArtboard | SketchLayer | SketchSymbolMaster>,
    number: number = 1
): SketchPage => {
    return {
        _class: "page",
        do_objectID: uuid(),
        exportOptions: {
            _class: "exportOptions",
            exportFormats: [],
            includedLayerIds: [],
            layerOptions: 0,
            shouldTrim: false
        },
        frame: {
            _class: "rect",
            constrainProportions: false,
            height: 300,
            width: 300,
            x: 0,
            y: 0
        },
        hasClickThrough: true,
        horizontalRulerData: {
            _class: "rulerData",
            base: 0,
            guides: []
        },
        includeInCloudUpload: true,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 0,
        layers: layers,
        name: `Page ${number}`,
        nameIsFixed: false,
        resizingConstraint: 63,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false,
        style: {
            _class: "style",
            endDecorationType: 0,
            miterLimit: 10,
            startDecorationType: 0
        },
        verticalRulerData: {
            _class: "rulerData",
            base: 0,
            guides: []
        }
    }
};

export const createSketchDocument = (
    pages: SketchPage[] = []
): SketchDocument => {
    return {
        _class: "document",
        assets: {
            _class: "assetCollection",
            colors: [],
            gradients: [],
            imageCollection: {
                _class: "imageCollection",
                images: {}
            },
            images: []
        },
        colorSpace: 0,
        currentPageIndex: 0,
        do_objectID: uuid(),
        enableLayerInteraction: true,
        enableSliceInteraction: true,
        foreignSymbols: [],
        layerStyles: {
            _class: "sharedStyleContainer",
            objects: []
        },
        layerSymbols: {
            _class: "symbolContainer",
            objects: []
        },
        layerTextStyles: {
            _class: "sharedTextStyleContainer",
            objects: []
        },
        pages: pages.map((page:SketchPage) => ({
                _class: "MSJSONFileReference",
                _ref: `pages/${page.do_objectID}`,
                _ref_class: "MSImmutablePage"
            }
        ))
    }
};

export const createRect = (
    width: number = 0,
    height: number = 0,
    x: number = 0,
    y: number = 0,
    constrainProportions: boolean = false
): SketchRect => {
    return {
        _class: "rect",
        constrainProportions: constrainProportions,
        height: height,
        width: width,
        x: x,
        y: y,
    }
};

export const createMetaDocument = (
    pages: SketchPage[]
): SketchMeta => {
    return {
        app: "com.bohemiancoding.sketch3",
        appVersion: "48.1",
        autosaved: 0,
        build: 47250,
        commit: "5b9531439a15a8e8d2e29be292655447768783db",
        compatibilityVersion: 93,
        created: {
            app: "com.bohemiancoding.sketch3",
            appVersion: "48.1",
            build: 47250,
            commit: "5b9531439a15a8e8d2e29be292655447768783db",
            compatibilityVersion: 93,
            variant: "NONAPPSTORE",
            version: 97
        },
        fonts: [],
        pagesAndArtboards: pages.reduce((previous: object, page: SketchPage): object => {
            previous[page.do_objectID] = {
                artboards: {},
                name: page.name
            };
            return previous;
        }, {}),
        saveHistory: [
            "NONAPPSTORE.47250"
        ],
        variant: "NONAPPSTORE",
        version: 97
    }
};

export const createUserDocument = (
    documents: SketchDocument[],
    pages: SketchPage[]
): SketchUser => {
    const documentsReference = documents.reduce((prev: object, document: SketchDocument): object => {
        prev[document.do_objectID] = {
            pageListHeight: -1
        };
        return prev;
    }, {});

    return pages.reduce((prev: object, page: SketchPage): object => {
        prev[page.do_objectID] = {
            scrollOrigin: "{27, 27}",
            zoomValue: 1
        };
        return prev;
    }, documentsReference);

};

// export const createSketchOval = (): SketchOval => {};
// export const createSketchShapeGroup = (): SketchShapeGroup => {};
// export const createSketchShapePath = (): SketchShapePath => {};

// export const createSketchSymbolInstance = (): SketchSymbolInstance => {};

export const createSketchBitmap = (
    name: string = 'Image',
    hash: SHA1,
    frame: SketchRect,
    style: SketchStyle,
): SketchBitmap => {
    return {
        _class: "bitmap",
        do_objectID: uuid(),
        exportOptions: {
            _class: "exportOptions",
            exportFormats: [],
            includedLayerIds: [],
            layerOptions: 0,
            shouldTrim: false
        },
        frame: frame,
        clippingMask: "{{0, 0}, {1, 1}}",
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 0,
        name: name,
        nameIsFixed: false,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false,
        fillReplacesImage: false,
        style: style,
        image: {
            _class: "MSJSONFileReference",
            _ref: `images/${hash}`,
            _ref_class: "MSImageData"
        },
        resizingConstraint: 63,
    }
};

export const createSketchMSAttributedString = (
    attribute: string
): SketchMSAttributedString => {
    return {
        _class: "MSAttributedString",
        archivedAttributedString: {
            // _archive: "YnBsaXN0MDDUAQIDBAUGUVJYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoK8QGQcIDxAaGxwoKSorLC0uLzA2OkJDREVGSU1VJG51bGzTCQoLDA0OWE5TU3RyaW5nViRjbGFzc1xOU0F0dHJpYnV0ZXOAAoAYgANeVHlwZSBzb21ldGhpbmfTERIKExYZV05TLmtleXNaTlMub2JqZWN0c6IUFYAEgAWiFxiABoAQgA9fECpNU0F0dHJpYnV0ZWRTdHJpbmdDb2xvckRpY3Rpb25hcnlBdHRyaWJ1dGVfEB9NU0F0dHJpYnV0ZWRTdHJpbmdGb250QXR0cmlidXRl0xESCh0iGaQeHyAhgAeACIAJgAqkIyQlJoALgAyADYAOgA9TcmVkVWFscGhhVGJsdWVVZ3JlZW4jP9KSbT////8jP/AAAAAAAAAjP9KSpR////8jP9KSi0AAAADSMTIzNFokY2xhc3NuYW1lWCRjbGFzc2VzXE5TRGljdGlvbmFyeaIzNVhOU09iamVjdNIKNzg5XxAaTlNGb250RGVzY3JpcHRvckF0dHJpYnV0ZXOAF4AR0xESCjs+QaI8PYASgBOiP0CAFIAVgBZfEBNOU0ZvbnRTaXplQXR0cmlidXRlXxATTlNGb250TmFtZUF0dHJpYnV0ZSNALAAAAAAAAFlIZWx2ZXRpY2HSMTJHSF8QE05TTXV0YWJsZURpY3Rpb25hcnmjRzM10jEySktfEBBOU0ZvbnREZXNjcmlwdG9yokw1XxAQTlNGb250RGVzY3JpcHRvctIxMk5PXxASTlNBdHRyaWJ1dGVkU3RyaW5nolA1XxASTlNBdHRyaWJ1dGVkU3RyaW5nXxAPTlNLZXllZEFyY2hpdmVy0VNUVHJvb3SAAQAIABEAGgAjAC0AMgA3AFMAWQBgAGkAcAB9AH8AgQCDAJIAmQChAKwArwCxALMAtgC4ALoAvADpAQsBEgEXARkBGwEdAR8BJAEmASgBKgEsAS4BMgE4AT0BQwFMAVUBXgFnAWwBdwGAAY0BkAGZAZ4BuwG9Ab8BxgHJAcsBzQHQAdIB1AHWAewCAgILAhUCGgIwAjQCOQJMAk8CYgJnAnwCfwKUAqYCqQKuAAAAAAAAAgEAAAAAAAAAVQAAAAAAAAAAAAAAAAAAArA="
            // _archive: new Buffer(`
            // var archive = NSString.stringWithString("${attribute}");
            // var data = NSData.alloc().initWithBase64EncodedString_options(archive, nil);
            // var resObject = NSKeyedUnarchiver.unarchiveObjectWithData(data);
            // `).toString('base64')
            _archive: new Buffer(attribute).toString('base64')
        }
    }
};

export const createSketchText = (
    text: string,
    frame: SketchRect,
): SketchText => {
    return {
        _class: "text",
        attributedString: createSketchMSAttributedString(text),
        automaticallyDrawOnUnderlyingPath: false,
        do_objectID: uuid(),
        dontSynchroniseWithSymbol: false,
        exportOptions: {
            _class: "exportOptions",
            exportFormats: [],
            includedLayerIds: [],
            layerOptions: 0,
            shouldTrim: false
        },
        frame: frame,
        glyphBounds: "{{0, 0}, {0, 0}}",
        heightIsClipped: false,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 0,
        lineSpacingBehaviour: 2,
        name: "Type something",
        nameIsFixed: false,
        resizingConstraint: 47,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false,
        style: {
            _class: "style",
            endDecorationType: 0,
            miterLimit: 10,
            startDecorationType: 0,
            textStyle: {
                _class: "textStyle",
                encodedAttributes: {
                    MSAttributedStringColorDictionaryAttribute: {
                        alpha: 1,
                        blue: 0.2902005016803741,
                        green: 0.2901943325996399,
                        red: 0.2901871800422668
                    },
                    MSAttributedStringFontAttribute: {
                        _archive: "YnBsaXN0MDDUAQIDBAUGJidYJHZlcnNpb25YJG9iamVjdHNZJGFyY2hpdmVyVCR0b3ASAAGGoKkHCA0XGBkaGyJVJG51bGzSCQoLDFYkY2xhc3NfEBpOU0ZvbnREZXNjcmlwdG9yQXR0cmlidXRlc4AIgALTDg8JEBMWV05TLmtleXNaTlMub2JqZWN0c6IREoADgASiFBWABYAGgAdfEBNOU0ZvbnRTaXplQXR0cmlidXRlXxATTlNGb250TmFtZUF0dHJpYnV0ZSNALAAAAAAAAFlIZWx2ZXRpY2HSHB0eH1okY2xhc3NuYW1lWCRjbGFzc2VzXxATTlNNdXRhYmxlRGljdGlvbmFyeaMeICFcTlNEaWN0aW9uYXJ5WE5TT2JqZWN00hwdIyRfEBBOU0ZvbnREZXNjcmlwdG9yoiUhXxAQTlNGb250RGVzY3JpcHRvcl8QD05TS2V5ZWRBcmNoaXZlctEoKVRyb290gAEACAARABoAIwAtADIANwBBAEcATABTAHAAcgB0AHsAgwCOAJEAkwCVAJgAmgCcAJ4AtADKANMA3QDiAO0A9gEMARABHQEmASsBPgFBAVQBZgFpAW4AAAAAAAACAQAAAAAAAAAqAAAAAAAAAAAAAAAAAAABcA=="
                    }
                },
                verticalAlignment: 0
            }
        },
        textBehaviour: 0
    }
};

export const createSketchGroup = (
    name: string = 'Group',
    frame: SketchRect,
    layers: SketchLayer[],
): SketchGroup => {
    return {
        _class: 'group',
        do_objectID: uuid(),
        exportOptions: {
            _class: "exportOptions",
            exportFormats: [],
            includedLayerIds: [],
            layerOptions: 0,
            shouldTrim: false
        },
        frame: frame,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 1,
        name: name,
        nameIsFixed: false,
        // originalObjectID: UUID,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false,
        hasClickThrough: false,
        layers: layers,
    }
};
