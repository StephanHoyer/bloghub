'use strict';

var reponame = 'bloghub-test';
var Octokat = require('octokat');
var base64 = require('base-64');
var utf8 = require('utf8');

function base64encode(string) {
  return base64.encode(utf8.encode(string));
}

var user = JSON.parse(localStorage.getItem('github'));

var octo = new Octokat({
  token: user.token
});

var repo = octo.repos(user.username, reponame);
repo.contents('README.md').readBinary().then(function(contents) {
  console.log(contents);
});

repo.contents('test.md').add({
  message: 'Updating file',
  content: base64encode('New file contents'),
  sha: '123456789abcdef'
}).then(function(info) {
  console.log('File Updated. new sha is ', info.commit.sha);
});
