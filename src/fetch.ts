type ErrorResponse = {
  message: string;
};

export async function fetchJson<T>(
  method: string,
  url: string,
  params?: Record<string, any>,
  body?: object,
  signal?: AbortSignal,
): Promise<T> {
  const finalUrl = new URL(url);
  if (params) {
    finalUrl.search = new URLSearchParams(params).toString();
  }

  const response = await fetch(finalUrl.toString(), {
    method,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(body, camelToSnakeReplacer),
    signal,
  });
  const text = await response.text();

  if (response.ok) {
    const result: T = JSON.parse(text, snakeToCamelReviver);
    return result;
  } else {
    const result: ErrorResponse = JSON.parse(text, snakeToCamelReviver);
    throw new Error(result.message);
  }
}

function camelToSnakeReplacer(_key: string, value: any): any {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const replacement: any = {};
    for (const [objKey, objValue] of Object.entries(value)) {
      replacement[objKey.replace(/([A-Z])/g, "_$1").toLowerCase()] = objValue;
    }
    return replacement;
  }
  return value;
}

function snakeToCamelReviver(_key: string, value: any): any {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const replacement: any = {};
    for (const [objKey, objValue] of Object.entries(value)) {
      replacement[objKey.replace(/(_\w)/g, (k) => k[1].toUpperCase())] = objValue;
    }
    return replacement;
  }
  return value;
}
