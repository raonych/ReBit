// public/utils/cors.js

export function Cors(res) {
    res.headers.set('Access-Control-Allow-Origin', '*'); // Permite todas as origens
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Permite métodos específicos
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // Permite cabeçalhos específicos
    return res;
  }
  