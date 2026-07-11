/** API-Football (api-sports.io) — shared config */
const API_CONFIG = {
  KEY: 'be669a7810223736f57370c30634d3e0',
  BASE: 'https://v3.football.api-sports.io',
  HEADERS: { 'x-apisports-key': 'be669a7810223736f57370c30634d3e0' },
};

window.API_CONFIG = API_CONFIG;

async function apiFetch(endpoint) {
  if (window.location.protocol === 'file:') {
    throw new Error('Open the site at http://localhost:8080 (not file://) so the API can connect.');
  }

  const url = endpoint.startsWith('http') ? endpoint : `${API_CONFIG.BASE}${endpoint}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: API_CONFIG.HEADERS,
  });

  if (!response.ok) {
    throw new Error(`API error (${response.status})`);
  }

  const data = await response.json();

  if (data.errors && Object.keys(data.errors).length > 0) {
    throw new Error(Object.values(data.errors).join(' ') || 'API returned an error');
  }

  return data;
}

window.apiFetch = apiFetch;
