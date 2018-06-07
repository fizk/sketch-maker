import {Node} from "./tree";

interface ArrayConstructor {
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
    from<T>(arrayLike: ArrayLike<T>): Array<T>;
}

interface Window {
    webkitURL: any;
    // run: (element: HTMLElement) => Promise<Node>
}
