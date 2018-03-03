/**
 * @description Servicio para la conexión con la API de github.
*/
export class GitUserService {
  constructor($http, ApiBase) {
    'ngInject';
    this.$http = $http;
    this.ApiBase = ApiBase;
    this.clientId = '7300bf3a22909989fdb5';
    this.clientSecret = '47311167016524db192b6ee2550b0bdae57322e9';
  }
  getUsers(user) {
    const URL = `${this.ApiBase.baseURL}/search/users?q=${user}&per_page=10&client_id=${this.clientId}&client_secret=${this.clientSecret}`;
    return this.$http.get(URL);
  }
  getUserFollowers(url) {
    return this.$http.get(`${url}?per_page=3&client_id=${this.clientId}&client_secret=${this.clientSecret}`);
  }
}
