const electron = require('electron')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

module.exports = class Apri {
  constructor() {
    this.rulesPath = path.join(electron.app.getPath('userData'), 'rules.js');
    this.rules = this.buildRules(this.rulesPath);
  }

  handler(event, path) {
    this.rules = this.buildRules(this.rulesPath);
    this.rules.forEach((rule, idx) => {
      if (rule.length === 2)
        rule = {'matcher': rule[0], 'action': rule[1]};
      if (typeof(rule.matcher.test) === 'function' && rule.matcher.test(path)) {
        console.info(`matched: rule[${idx}] path=${path}`);
        rule['action'](path);
      }
    });
  }

  buildRules(path) {
    if (fs.lstatSync(path).isFile()) {
      let rules = require(path);
      console.info(`buildRules file=${path} length=${rules.length}`);
      return rules;
    } else {
      console.error(`buildRules file=${path} not found`);
      return [];
    }
  }

  getSeralizedRules(rules) {
    rules = rules || this.rules || [];
    let seralizedRules = rules.map(rule => {
      let seralizedRule = {};
      if (rule instanceof Array) {
        seralizedRule.matcher = rule[0];
        seralizedRule.action = rule[1];
      }
      seralizedRule.matcher = this.serialize(seralizedRule.matcher);
      seralizedRule.action = this.serialize(seralizedRule.action);
      return seralizedRule;
    });
    return seralizedRules;
  }

  serialize(raw) {
    let seralized = raw;
    if (raw instanceof RegExp) {
      seralized = {type: "RegExp", data: raw.toString()};
    } else if (raw instanceof Function) {
      seralized = {type: "Function", data: raw.toString()};
    }
    return seralized;
  }
}
