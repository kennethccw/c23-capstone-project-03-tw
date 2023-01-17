export const fetchJson = async <T = unknown>(url: RequestInfo | URL, init?: RequestInit) => {
  try {
    const resp = await fetch(url, init);
    const data = await resp.json();

    if (resp.status >= 200 && resp.status < 300) {
      return data as T;
    }

    throw new APIError(resp.status, data.message);
  } catch (err) {
    if (err instanceof APIError) {
      throw err;
    }
    throw new APIError(500);
  }
};

export class APIError extends Error {
  constructor(public httpStatus: number, message?: string) {
    super(message ?? "error is found");
    Object.setPrototypeOf(this, APIError.prototype);
  }
}
