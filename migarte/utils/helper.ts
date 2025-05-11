export const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
};

export const toUnderline = (s: string) => {
  return s.replace(/([A-Z])/g, "_$1").toLowerCase();
}

const isArray = function (a: any) {
  return Array.isArray(a);
};

const isObject = function (o: any) {
  return o === Object(o) && !isArray(o) && typeof o !== 'function';
};

export const keysToCamel = function (o: any) {

  if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach((k) => {
      n[toCamel(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToCamel(i);
    });
  }

  return o;
};

export const keysToUnderline = function (o: any) {

  if (isObject(o)) {
    const n: any = {};

    Object.keys(o).forEach((k) => {
      n[toUnderline(k)] = keysToUnderline(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map((i: any) => {
      return keysToUnderline(i);
    });
  }

  return o;
};

export function toHump(name: string) {
  return name.replace(/\_(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
};

export function fmtMSS(s: number) { return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s }