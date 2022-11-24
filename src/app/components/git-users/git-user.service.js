/**
 * @description Servicio para la conexión con la API de github.
*/
export class GitUserService {
  /** @ngInject */
  constructor($http, ApiBase) {
    this.$http = $http;
    this.ApiBase = ApiBase;
    this.clientId = process.env.CLIENT_ID;
    this.clientSecret = process.env.CLIENT_SECRET;
  }
  getUsers(user) {
    const URL = `${this.ApiBase.baseURL}/search/users?q=${user}&per_page=10&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    return this.$http.get(URL);
  }
  getUserFollowers(url) {
    return this.$http.get(`${url}?per_page=3&client_id=${this.clientId}&client_secret=${this.clientSecret}`);
  }
}
