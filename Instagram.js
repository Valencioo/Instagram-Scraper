/**
 * @overview
 * @author Voidular <voidularr@gmail.com>
 * @license The MIT License (MIT)
 */
/**
 * @module Instagram Scraper
 */
'use strict';

var util = require('util'),
    EventEmitter = require('events').EventEmitter,
    request = require('request');

function Instagram(config) {
    var self = this;

    config = config || {};


    this.__request = request.defaults({
        baseUrl: "https://www.instagram.com/explore/tags/",
    });
}
Instagram.prototype.__FetchMention = function(tag, done) {
    var self = this;
    this._request(tag, function(err, res, body) {
        var Mention = body.split("@")[1].split(" ")[0];
        if (!body || !body.split("@") || !body.split("@")[index] || !body.split("@")[index].split(" ")[0]) {
            return null;
        }
        if (!Mention.charAt(Mention.length).match(/[a-z]/i)) {
            return done(Mention.slice(0, -1));
        } else {
            return done(Mention);
        }
    });
}

Instagram.prototype.__FetchUsername = function(tag, done) {
    var self = this;
    this._request(tag, function(err, res, body) {
        if (!body || !body.split("@") || !body.split("@")[index] || !body.split("@")[index].split(" ")[0]) {
            return null;
        }
        var Author = body.split("@")[1].split(" ")[0];
        if (!Author.charAt(Author.length).match(/[a-z]/i)) {
            return done(Author.slice(0, -1));
        } else {
            return done(Author);
        }
    });
}

Instagram.prototype.__FetchAllMentions = function(tag, done) {
  var self = this;
  request(tag, function(err, res, body) {
   var index = 0;
    let Mentions = [];
    while (true) {
        if (!body || !body.split("@") || !body.split("@")[index] || !body.split("@")[index].split(" ")[0]) {
            return done(Mentions);
        }
        var Mention = body.split("@")[index].split(" ")[0];
        if (!Mention.startsWith("<!DOCTYPE")) {
        if (!Mention.charAt(Mention.length).match(/[a-z]/i)) {
            Mentions.push(Mention.slice(0, -1))
        } else {
            Mentions.push(Mention);
        }
        index++;
    } else {
      index++;
    }
  }
    return done(Mentions);
  });
}

module.exports = Instagram;
