'use strict';

var github = require('./github');

if (global.document) {
  require('es6-promise').polyfill();
}

var domready = require('domready');
var m = require('mithril');

var routes = require('./routes');

m.route.mode = 'hash';

domready(function() {
  m.route(document.body , '/', routes);
});

var user = JSON.parse(localStorage.getItem('github'));

var api = github({
  username: user.username,
  token: user.token,
  reponame: 'bloghub-test'
});

api.commit([{
  path: 'test/file1.md',
  content: '# File1'
}, {
  path: 'test/file2.md',
  content: '# File2'
}], 'test commit via commit function, again, one time');

