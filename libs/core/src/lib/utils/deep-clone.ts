export function deepClone<T>(value: T): T {
  return window.structuredClone(value);
}
