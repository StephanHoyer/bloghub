'use strict';

var m =  require('mithril');

var home = {
  controller: function() {
  },
  view: function() {
    return m('div', 'Hello world');
  }
};

module.exports = {
  '/': home
};
