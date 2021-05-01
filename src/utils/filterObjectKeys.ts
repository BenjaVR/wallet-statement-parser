type FilteredObject<T extends string> = {
  [key in T]: any;
}

/**
 * Filters the keys of an object to only include the allowed ones.
 *
 * Example: object { a: "a", b: "b", c: "c" } with allowed keys ["a", "c"] will result in object { a: "a", c: "c" }.
 */
export default function filterObjectKeys<T extends string>(
  obj: { [key: string]: any },
  allowedKeys: T[]
): FilteredObject<T> {
  const copiedObj = { ...obj };
  Object.keys(copiedObj).forEach(key => {
    if (allowedKeys.includes(key as T)) {
      // Key is allowed, so just continue.
      return;
    }
    // Key is not allowed -> delete it from the object!
    delete copiedObj[key];
  });
  return copiedObj as FilteredObject<T>;
}
