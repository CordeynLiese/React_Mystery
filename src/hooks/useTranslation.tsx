import { flatten } from '../utils/Flatten';

const translations = {
  nl: {
    home: {
      title: 'Thuis',
    },
  },
  en: {
    home: {
      title: 'Home',
      text: {
        paragraph1: 'hallo',
        paragraph2: 'help',
      },
    },
  },
};

const flattenedValues = flatten(translations);

export function useTranslation(language: 'en' | 'nl' = 'en'): (key: string) => string {
  return (key: string): string => {
    const fltn = flattenedValues;
    const recordKey = language + '.' + key;
    return fltn[recordKey] ?? key;
  };
}
