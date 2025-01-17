type FetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
};

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    method = 'GET',
    body,
    headers = {},
  } = options;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || 'Something went wrong');
  }

  return res.json();
}

export const api = {
  async get<T>(endpoint: string, options?: FetchOptions) {
    return fetchApi<T>(endpoint, { ...options, method: 'GET' });
  },

  async post<T>(endpoint: string, data: any, options?: FetchOptions) {
    return fetchApi<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data,
    });
  },

  async put<T>(endpoint: string, data: any, options?: FetchOptions) {
    return fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data,
    });
  },

  async delete<T>(endpoint: string, options?: FetchOptions) {
    return fetchApi<T>(endpoint, { ...options, method: 'DELETE' });
  },
};