'use strict';

var m = require('mithril');
var github = require('../github');

module.exports = {
  controller: function() {
    var scope = {};

    scope.post = {
      slug: m.prop(''),
      title: m.prop(''),
      content: m.prop('')
    };

    scope.savePost = function() {
      console.log(JSON.stringify(scope.post));
      return false;
    };

    return scope;
  },
  view: function(scope) {
    return [
      m('h1', 'Create post'),
      m('form', {
        onsubmit: scope.savePost
      }, [
        m('input.title', {
          value: scope.post.title(),
          oninput: m.withAttr('value', scope.post.title),
          placeholder: 'title'
        }),
        m('input.content', {
          value: scope.post.content(),
          oninput: m.withAttr('value', scope.post.content),
          placeholder: 'content'
        }),
        m('input', {
          type: 'submit',
        })
      ])
    ];
  }
};
