/** Same-origin Java API client. Browser demo state remains local unless a route is explicitly used here. */
async function requestJson(path) {
  const response = await fetch(path, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    credentials: 'same-origin',
    cache: 'no-store',
  });

  if (!response.ok) {
    const error = new Error(`A API Java respondeu ${response.status}.`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export const apiClient = Object.freeze({
  /** Busca um cupom no endpoint público já existente; não consome seu limite de uso. */
  getCouponByCode(code) {
    return requestJson(`/api/cupons/codigo/${encodeURIComponent(String(code).trim())}`);
  },
});

export default apiClient;
