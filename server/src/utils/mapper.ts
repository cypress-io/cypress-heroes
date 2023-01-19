export function exclude<T, Key extends keyof T>(
  model: T,
  ...keys: Key[]
): Omit<T, Key> {
  for (const key of keys) {
    delete model[key];
  }
  return model;
}

export function mapper<T1, T2>(
  target: T1,
  source: T2,
  transform?: (obj: T1) => void,
) {
  const keys = Object.keys(source);
  keys.forEach((k) => {
    target[k] = source[k];
  });
  if (transform) {
    transform(target);
  }
  return target;
}
