(function (window) {
  window.__env = window.__env || {};
  const API_URL = 'https://jsonplaceholder.typicode.com';
  const SOCKET_URL = 'wss://test.com';
  window.__env.apiUrl = API_URL;
  window.__env.socketUrl = SOCKET_URL;
}(this));
