export async function fetchJson<T>(
  method: string,
  url: string,
  body?: any,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(url, {
    method,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(body, camelToSnakeReplacer),
    signal,
  });
  const text = await response.text();
  return JSON.parse(text, snakeToCamelReviver);
}

function camelToSnakeReplacer(_key: string, value: any): any {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const replacement: any = {};
    for (const [objKey, objValue] of Object.entries(value)) {
      replacement[objKey.replace(/([A-Z])/g, '_$1').toLowerCase()] = objValue;
    }
    return replacement;
  }
  return value;
}

function snakeToCamelReviver(_key: string, value: any): any {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const replacement: any = {};
    for (const [objKey, objValue] of Object.entries(value)) {
      replacement[objKey.replace(/(_\w)/g, (k) => k[1].toUpperCase())] = objValue;
    }
    return replacement;
  }
  return value;
}
