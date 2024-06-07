export class HttpApi {
    static HOST_BASE = 'http://localhost:8080/CustomerMS';
  
    static GET_CLIENTS = `${this.HOST_BASE}/searchAll`;
    static GET_CLIENTS_BY_SHARED_KEY = `${this.HOST_BASE}/searchBySharedKey`;
    static POST_SAVE_CUSTOMER = `${this.HOST_BASE}/save`;
  

  }
  