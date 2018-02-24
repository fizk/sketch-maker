import {Color} from "../@types/tree";

export const convertRGB = (string): Color => {
    const color: string[] = string.match(/rgba?\(([0-9\.]*), ([0-9\.]*), ([0-9\.]*)(, ([0-9\.]*))?\)/);
    return !color
        ? {
            r: 0,
            g: 0,
            b: 0,
            a: 0
        } : {
            r: Number(color[1])/255,
            g: Number(color[2])/255,
            b: Number(color[3])/255,
            a: color[5] ? parseFloat(color[5]) : 1
        }
};

export const border = (color: string, thickness: string): object[] | null => {
    const ints: number[] = (thickness.match(/[0-9]*(px|em|rem|\%)/g) || []).map(unit => {
        return parseInt(unit)
    });
    const width = ints.reduce((a: number, b: number) => b, 0);
    return width ? [{
        color: convertRGB(color),
        thickness: width
    }] : null
};

export const boxShadow = (string: string): object[] | null => {
    const color: Color = convertRGB(string);
    const ints: number[] = (string.match(/[0-9]*(px|em|rem|\%)/g) || []).map(unit => {
        return parseInt(unit)
    });
    return string !== 'none' ? [{
        color: color,
        blurRadius: ints[2] || 0,
        offsetX: ints[0] || 0,
        offsetY: ints[1] || 0,
        spread: ints[3] || 0,
    }] : null;
};

export const radius = (string: string, width: number, height: number): number => {
    const ints = (string.match(/[0-9]*(px|em|rem|\%)/g) || []).map(unit => {
        const split: string[] = unit.match(/([0-9]*)(px|em|rem|\%)/);
        if(split && split[2] === '%') {
            return (Number(split[1]) / 100) * width;
        } else {
            return parseInt(unit)
        }
    });
    return ints.reduce((prev: number, current: number) => current, 0);
};

export const backgroundImage = (string: string): string | null => {
    const result = string.match(/url\("(.*)"\)/);
    return result ? result[1] : null;
};

