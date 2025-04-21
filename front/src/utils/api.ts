const API_BASE_URL = "http://localhost:3000";

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("token");

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/login";
    return Promise.reject(new Error("Token expiré, redirection vers login..."));
  }

  if (!response.ok) {
    return Promise.reject(new Error(`Erreur HTTP ${response.status}`));
  }

  if (response.status === 204) {
    return Promise.resolve({} as T);
  }

  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return apiFetch<T>(`${endpoint}${queryString}`, { method: "GET" });
  },

  post: <T>(endpoint: string, body: unknown) =>
    apiFetch<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown) =>
    apiFetch<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, params?: Record<string, string>) => {
    const queryString = params
      ? "?" + new URLSearchParams(params).toString()
      : "";
    return apiFetch<T>(`${endpoint}${queryString}`, { method: "DELETE" });
  }
};
