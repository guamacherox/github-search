
export class GitUserService {
  constructor($http, ApiBase) {
    'ngInject';
    this.$http = $http;
    this.ApiBase = ApiBase;
  }
  getUsers(user) {
    const URL = this.ApiBase.baseURL + '/search/users?q=' + user + '&per_page=10';
    return this.$http.get(URL, {headers: {Authorization: 'token ' + this.ApiBase.token}});
  }
  getUserFollowers(url) {
    return this.$http.get(url + '?per_page=3', {headers: {Authorization: 'token ' + this.ApiBase.token}});
  }
}
