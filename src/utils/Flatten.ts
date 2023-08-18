interface Translation {
  [key: string]: string | Translation | undefined;
}

function* flat(translation: Translation, prefix = ''): Iterable<[string, string]> {
  for (const [key, value] of Object.entries(translation)) {
    const prefixedKey = [prefix, key].filter(Boolean).join('.');
    if (value) {
      if (typeof value === 'string') yield [prefixedKey, value];
      else yield* flat(value, prefixedKey);
    }
  }
}

export function flatten(translation: Translation): Record<string, string> {
  return Object.fromEntries(flat(translation));
}
