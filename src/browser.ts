import * as puppeteer from 'puppeteer';
import {GenericNode} from "./@types/tree";

export default async (url: string, selector: string): Promise<GenericNode[]> => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.addScriptTag({
        path: './lib/dom-converter/bundle.js'
    });

    const components = await page.evaluate((selector) => {
        return Array.from(document.querySelectorAll(selector)).map(run);
    }, selector);

    await browser.close();

    return components;
};
