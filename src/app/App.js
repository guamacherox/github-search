
class AppController {
  constructor(GitUserService, $log) {
    'ngInject';
    this.$log = $log;
    this.message = 'Tu buscador de usuarios GitHub';
    this.user = '';
    this.users = [];
    this.searching = false;
    this.loading = false;
    this.noResults = false;
    this.error = {
      active: false,
      message: ''
    };
    this.gitUserService = GitUserService;
  }
  searchUsers() {
    if (this.user.length >= 4) {
      this.searching = true;
      this.loading = true;
      this.noResults = false;
      this.users = [];
      this.error.active = false;
      this.gitUserService
        .getUsers(this.user)
        .then(async response => {
          if (response.data.items.length) {
            await this.searchFollowers(response.data.items);
            this.$log.log(response);
          } else {
            this.noResults = true;
          }
          this.loading = false;
          return;
        })
        .catch(error => {
          this.$log.error(error);
          this.error.active = true;
          this.error.message = error.data.message;
          this.searching = false;
          this.loading = false;
        });
    } else {
      this.searching = false;
      this.loading = false;
      this.noResults = false;
      this.error.active = false;
      this.users = [];
    }
  }
  async searchFollowers(users) {
    for (const user of users) {
      await this.gitUserService.getUserFollowers(user.followers_url)
        .then(response => {
          this.$log.log('followers for' + user.login);
          const length = response.data.length;
          user.followers = length ? response.data : null;
          this.users.push(user);
        })
        .catch(error => {
          this.$log.log(error);
          this.error.active = true;
          this.error.message = error.data.message;
        });
    }
  }
}

export const App = {
  template: require('./App.html'),
  controller: AppController
};
