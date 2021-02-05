import zh_CN from './zh_CN';

export const localesMap = {
  zh_CN,
};

export type Locale = keyof typeof localesMap;

const defaultLocale: Locale = 'zh_CN';

export let currentLocales = localesMap[defaultLocale];

export type LocaleKey = keyof typeof currentLocales;

export const formatMessage = (
  key: LocaleKey | string = '',
  {
    locale = defaultLocale,
    replaces,
  }: {
    locale?: Locale;
    replaces?: { [key: string]: any };
  } = {}
) => {
  const locales = localesMap[locale] ?? defaultLocale;
  const message = locales[key as LocaleKey];

  if (!message) {
    return key;
  }

  if (!replaces) {
    return message;
  }

  return Object.entries(replaces).reduce(
    (msg, [placeholder, replacement]) =>
      msg.replace(new RegExp(`%{${placeholder}}`, 'g'), String(replacement)),
    message
  );
};

export const t = formatMessage;
