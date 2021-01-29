import zh_CN from "./zh_CN";

const locales = zh_CN;

export default locales;

export const t = (key: keyof typeof locales) => locales[key];
