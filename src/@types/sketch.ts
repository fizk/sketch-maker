export type UUID = string // with UUID v4 format
export type SHA1 = string // with SHA1 format

export type SketchPositionString = string // '{0.5, 0.67135115527602085}'

export type Position = [number, number];

export type SketchNestedPositionString = string // '{{0, 0}, {75.5, 15}}'

export type Base64String = string

export type FilePathString = string

export type SketchImageCollection = {
    _class: string, // imageCollection
    images: any // TODO
}

export type SketchColor = {
    _class: string, // color
    alpha: number,
    blue: number,
    green: number,
    red: number
}

export type SketchBorder = {
    _class: string, // border
    isEnabled: boolean,
    color: SketchColor,
    fillType: number,
    position: number,
    thickness: number
}

export type SketchGradientStop = {
    _class: string, // gradientStop
    color: SketchColor,
    position: number
}

export type SketchGradient = {
    _class: string, // gradient
    elipseLength: number,
    from: SketchPositionString,
    gradientType: number,
    shouldSmoothenOpacity: boolean,
    stops: SketchGradientStop[],
    to: SketchPositionString
}

export type SketchGraphicsContextSettings = {
    _class: string, // graphicsContextSettings
    blendMode: number,
    opacity: number
}

export type SketchInnerShadow = {
    _class: string, // innerShadow
    isEnabled: boolean,
    blurRadius: number,
    color: SketchColor,
    contextSettings: SketchGraphicsContextSettings,
    offsetX: 0,
    offsetY: 1,
    spread: 0
}

export type SketchFill = {
    _class: string, // fill
    isEnabled: boolean,
    color: SketchColor,
    fillType: number,
    // gradient: SketchGradient,
    noiseIndex: number,
    noiseIntensity: number,
    patternFillType: number,
    patternTileScale: number
}

export type SketchShadow = {
    _class: string, // shadow
    isEnabled: boolean,
    blurRadius: number,
    color: SketchColor,
    contextSettings: SketchGraphicsContextSettings,
    offsetX: number,
    offsetY: number,
    spread: number
}

export type SketchBlur = {
    _class: string, // blur
    isEnabled: boolean,
    center: SketchPositionString,
    motionAngle: number,
    radius: number,
    type: number
}

export type SketchEncodedAttributes = {
    NSKern?: number,
    MSAttributedStringFontAttribute?: {
        _archive: Base64String,
    },
    NSParagraphStyle?: {
        _archive: Base64String
    },
    NSColor?: {
        _archive: Base64String
    },
    MSAttributedStringColorDictionaryAttribute?: {
        alpha: number,
        blue: number,
        green: number,
        red: number,
    }
}

export type SketchRect = {
    _class: string, // rect
    constrainProportions: boolean,
    height: number,
    width: number,
    x: number,
    y: number
}

export type SketchTextStyle = {
    _class: string, // textStyle
    encodedAttributes: SketchEncodedAttributes,
    verticalAlignment: number
}

export type SketchBorderOptions = {
    _class: string, // borderOptions
    do_objectID: UUID,
    isEnabled: boolean,
    dashPattern: any[], // TODO,
    lineCapStyle: number,
    lineJoinStyle: number
}

export type SketchColorControls = {
    _class: string, // colorControls
    isEnabled: boolean,
    brightness: number,
    contrast: number,
    hue: number,
    saturation: number
}

export type SketchStyle = {
    _class: string, // style
    endDecorationType: number,
    miterLimit: number,
    // sharedObjectID: UUID,
    startDecorationType: number,
    blur?: SketchBlur[],
    borderOptions?: SketchBorderOptions,
    contextSettings?: SketchGraphicsContextSettings,
    colorControls?: SketchColorControls,
    innerShadows?: SketchInnerShadow[],
    shadows?: SketchShadow[]
    borders?: SketchBorder[],
    fills?: SketchFill[],
    textStyle?: SketchTextStyle,
}

export type SketchSharedStyle = {
    _class: string, // sharedStyle
    do_objectID: UUID,
    name: string,
    value: SketchStyle
}

export type SketchExportFormat = {
    _class: string, // exportFormat
    absoluteSize: number,
    fileFormat: string,
    name: string,
    namingScheme: number,
    scale: number,
    visibleScaleType: number
}

export type SketchExportOptions = {
    _class: string, // exportOptions
    exportFormats: SketchExportFormat[],
    includedLayerIds: any[], // TODO
    layerOptions: number,
    shouldTrim: boolean
}

export type SketchSharedStyleContainer = {
    _class: string, // sharedStyleContainer
    objects: SketchSharedStyle[]
}

export type SketchSymbolContainer = {
    _class: string, // symbolContainer
    objects: any[] // TODO
}

export type SketchSharedTextStyleContainer = {
    _class: string, // sharedTextStyleContainer
    objects: SketchSharedStyle[],
}

export type SketchAssetsCollection = {
    _class: string, // assetCollection
    colors: any[], // TODO
    gradients: any[], // TODO
    imageCollection: SketchImageCollection,
    images: any[] // TODO
}

export type SketchMSJSONFileReference = {
    _class: string, // MSJSONFileReference
    _ref_class: string, // MSImmutablePage' | 'MSImageData
    _ref: FilePathString
}

export type SketchMSAttributedString = {
    _class: string, // MSAttributedString
    archivedAttributedString: {
        _archive: Base64String
    }
}

export type SketchCurvePoint = {
    _class: string, // curvePoint
    // do_objectID: UUID,
    cornerRadius: number,
    curveFrom: SketchPositionString,
    curveMode: number,
    curveTo: SketchPositionString,
    hasCurveFrom: boolean,
    hasCurveTo: boolean,
    point: SketchPositionString
}

export type SketchRulerData = {
    _class: string, // rulerData
    base: number,
    guides: any[] // TODO
}

export type SketchText = {
    _class: string, // text
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    isFlippedVertical: boolean,
    isFlippedHorizontal: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    // originalObjectID: UUID,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    style: SketchStyle,
    attributedString: SketchMSAttributedString,
    automaticallyDrawOnUnderlyingPath: boolean,
    dontSynchroniseWithSymbol: boolean,
    glyphBounds: SketchNestedPositionString,
    heightIsClipped: boolean,
    lineSpacingBehaviour: number,
    textBehaviour: number,
    resizingConstraint: number,
}

export type SketchShapeGroup = {
    _class: string, // shapeGroup
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    isFlippedVertical: boolean,
    isFlippedHorizontal: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    // --- originalObjectID: UUID,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    style: SketchStyle,
    hasClickThrough: boolean,
    layers: SketchLayer[],
    clippingMaskMode: number,
    hasClippingMask: boolean,
    windingRule: number,
    resizingConstraint: number,

}

export type SketchPath = {
    _class: string, // path
    isClosed: boolean,
    pointRadiusBehaviour: number,
    points: SketchCurvePoint[]
}

export type SketchShapePath = {
    _class: string, // shapePath
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    isFlippedVertical: boolean,
    isFlippedHorizontal: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    booleaneanOperation: number,
    edited: boolean,
    path: SketchPath
}

export type SketchArtboard = {
    _class: string, // artboard
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    isFlippedHorizontal: boolean,
    isFlippedVertical: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    style: SketchStyle,
    hasClickThrough: boolean,
    layers: SketchLayer[],
    backgroundColor: SketchColor,
    hasBackgroundColor: boolean,
    horizontalRulerData: SketchRulerData,
    includeBackgroundColorInExport: boolean,
    includeInCloudUpload: boolean,
    verticalRulerData: SketchRulerData
}

export type SketchBitmap = {
    _class: string, // bitmap
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    clippingMask: SketchNestedPositionString,
    isFlippedHorizontal: boolean,
    isFlippedVertical: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    fillReplacesImage: boolean,
    style: SketchStyle,
    image: SketchMSJSONFileReference,
    nineSliceCenterRect?: SketchNestedPositionString,
    nineSliceScale?: SketchPositionString,
    resizingConstraint: number,
}

export type SketchSymbolInstance = {
    _class: string, // symbolInstance
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    isFlippedHorizontal: boolean,
    isFlippedVertical: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    style: SketchStyle,
    horizontalSpacing: number,
    masterInfluenceEdgeMaxXPadding: number,
    masterInfluenceEdgeMaxYPadding: number,
    masterInfluenceEdgeMinXPadding: number,
    masterInfluenceEdgeMinYPadding: number,
    symbolID: number,
    verticalSpacing: number,
    overrides: {
        "0": {} // TODO
    }
}

export type SketchGroup = {
    _class: string, // group
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    isFlippedHorizontal: boolean,
    isFlippedVertical: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    // originalObjectID: UUID,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    hasClickThrough: boolean,
    layers: SketchLayer[]
}

export type SketchRectangle = {
    _class: string, // rectangle
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    isFlippedHorizontal: boolean,
    isFlippedVertical: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    path: SketchPath,
    fixedRadius: number,
    resizingConstraint: number,
    hasConvertedToNewRoundCorners: boolean,
    booleanOperation: number,
    edited: boolean,
}

export type SketchOval = {
    _class: string, // oval
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    isFlippedHorizontal: boolean,
    isFlippedVertical: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    name: string,
    nameIsFixed: boolean,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    booleaneanOperation: number,
    edited: boolean,
    path: SketchPath
}

export type SketchLayer =
    | SketchText
    | SketchShapeGroup
    | SketchShapePath
    | SketchBitmap
    | SketchSymbolInstance
    | SketchGroup
    | SketchRectangle
    | SketchOval

export type SketchSymbolMaster = {
    backgroundColor: SketchColor,
    _class: string, // symbolMaster
    do_objectID: UUID,
    exportOptions: SketchExportOptions[],
    frame: SketchRect,
    hasBackgroundColor: boolean,
    hasClickThrough: boolean,
    horizontalRulerData: SketchRulerData,
    includeBackgroundColorInExport: boolean,
    includeBackgroundColorInInstance: boolean,
    includeInCloudUpload: boolean,
    isFlippedHorizontal: boolean,
    isFlippedVertical: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    layers: SketchLayer[],
    name: string,
    nameIsFixed: boolean,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    style: SketchStyle,
    symbolID: UUID,
    verticalRulerData: SketchRulerData
}

// document.json
export type SketchDocument = {
    _class: string,//'document',
    do_objectID: UUID,
    colorSpace: number,
    currentPageIndex: number,
    assets: SketchAssetsCollection,
    enableLayerInteraction: boolean,
    enableSliceInteraction: boolean,
    foreignSymbols: any[], // TODO
    layerStyles: SketchSharedStyleContainer,
    layerSymbols: SketchSymbolContainer,
    layerTextStyles: SketchSharedTextStyleContainer,
    pages: SketchMSJSONFileReference[]
}

// pages/*.json
export type SketchPage = {
    _class: string, // page
    do_objectID: UUID,
    exportOptions: SketchExportOptions,
    frame: SketchRect,
    hasClickThrough: boolean,
    horizontalRulerData: SketchRulerData,
    includeInCloudUpload: boolean,
    isFlippedHorizontal: boolean,
    isFlippedVertical: boolean,
    isLocked: boolean,
    isVisible: boolean,
    layerListExpandedType: number,
    layers: Array<SketchArtboard | SketchLayer | SketchSymbolMaster>,
    name: string,
    nameIsFixed: boolean,
    resizingType: number,
    rotation: number,
    shouldBreakMaskChain: boolean,
    style: SketchStyle,
    verticalRulerData: SketchRulerData,
    resizingConstraint: 63,
}

// meta.json
export type SketchMeta = {
    commit: string,
    appVersion: string,
    build: number,
    app: string,
    pagesAndArtboards: {
        [key: string/*UUID*/]: {
            name: string,
            artboards: {},
        }
    },
    fonts: string[], // Font names
    version: number,
    saveHistory: string[], // 'BETA.38916'
    autosaved: number,
    compatibilityVersion: number,
    variant: string, // 'BETA'
    created: {
        app: string,
        appVersion: string,
        build: number,
        commit: string,
        compatibilityVersion: number,
        variant: string,
        version: number
    }
}


type SketchDocumentId = UUID

type SketchPageId = UUID

export type SketchPageReference = {
    scrollOrigin: SketchPositionString,
    zoomValue: number
}

export type SketchDocumentReference = {
    pageListHeight: number,
}

// user.json
export type SketchUser = {
    [key: string]: SketchPageReference | SketchDocumentReference
}
