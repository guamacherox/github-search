
export class GitUserService {
  constructor($http, ApiBase) {
    'ngInject';
    this.$http = $http;
    this.ApiBase = ApiBase;
  }
  getContacts(user) {
    const URL = this.ApiBase + '/search/users?q=' + user;
    return this.$http.get(URL);
  }
}