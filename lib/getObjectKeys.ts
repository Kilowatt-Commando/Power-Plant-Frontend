export default function getObjectKeys<T>(obj: any): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}
