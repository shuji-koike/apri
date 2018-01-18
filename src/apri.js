const electron = require('electron')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')

module.exports = class Apri {
  constructor() {
    this.rulesPath = path.join(electron.app.getPath('userData'), 'rules.js');
  }

  handler(event, path) {
    let rules = this.buildRules(this.rulesPath);
    _.each(rules, (rule, idx) => {
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
      return require(path);
    } else {
      console.info(`config file ${path} not found`);
      return [];
    }
  }
}
