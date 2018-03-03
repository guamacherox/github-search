import angular from 'angular';
import {API_BASE} from './app/config';

import {App} from './app/App';
import {gitUserTableComponent} from './app/components/git-users/git-user-table';
import {GitUserService} from './app/components/git-users/git-user.service';
import 'angular-ui-router';
import 'angular-material';
import 'angular-messages';
import 'angular-animate';
import routesConfig from './routes';

import 'bulma/css/bulma.css';
import './index.scss';

export const app = 'app';

angular
  .module(app, ['ui.router', 'ngAnimate'])
  .config(routesConfig)
  .constant('ApiBase', API_BASE)
  .service('GitUserService', GitUserService)
  .component('gitUserTable', gitUserTableComponent)
  .component('app', App);
