
class AppController {
  constructor(GitUserService, $log) {
    'ngInject';
    this.$log = $log;
    this.message = 'Tu buscador de usuarios GitHub';
    this.user = '';
    this.users = [];
    this.gitUserService = GitUserService;
  }
  searchUsers() {
    this.gitUserService.getContacts(this.user)
      .then(response => {
        const users = response.data.items;
        this.users = users;
      })
      .catch(error => this.$log.error(error));
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
