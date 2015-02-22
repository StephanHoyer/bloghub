'use strict';

var reponame = 'bloghub-test';
var Octokat = require('octokat');
var base64 = require('base-64');
var utf8 = require('utf8');

function base64encode(string) {
  return base64.encode(utf8.encode(string));
}

function log(thing) {
  console.log(thing);
  return thing;
}

var user = JSON.parse(localStorage.getItem('github'));

var octo = new Octokat({
  token: user.token
});
var repo = octo.repos(user.username, reponame);

function fetchHead(branch) {
  return repo.git.refs.heads(branch || 'master').fetch();
}

var head;
function fetchTree(branch) {
  return fetchHead(branch).then(function(commit) {
    head = commit;
    return repo.git.trees(commit.object.sha).fetch();
  });
}

function fetchReadme() {
  return repo.contents('README.md').readBinary().then(log);
}

function commit(files, message) {
  return Promise.all(files.map(function(file) {
    return repo.git.blobs.create({
      content: file.content,
      encoding: 'utf-8'
    });
  })).then(function(blobs) {
    return fetchTree().then(function(tree) {
      return repo.git.trees.create({
        tree: files.map(function(file, index) {
          return {
            path: file.path,
            mode: '100644',
            type: 'blob',
            sha: blobs[index].sha
          };
        }),
        base_tree: tree.sha
      });
    });
  }).then(function(tree) {
    return repo.git.commits.create({
      message: message,
      tree: tree.sha,
      parents: [
        head.object.sha
      ]
    });
  }).then(function(commit) {
    return repo.git.refs.heads('master').update({
      sha: commit.sha
    });
  });
}

commit([{
  path: 'test/file1.md',
  content: '# File1'
}, {
  path: 'test/file2.md',
  content: '# File2'
}], 'test commit via commit function').then(log);

function commitOneFile() {
  return repo.contents('test.md').add({
    message: 'Updating file',
    content: base64encode('New file contents'),
    sha: '123456789abcdef'
  }).then(log);
}
