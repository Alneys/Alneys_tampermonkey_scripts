// ==UserScript==
// @name         时间线卡片调整：移除卡片内容动态变化的效果
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  时间线卡片调整：移除卡片内容动态变化的效果
// @author       Alneys
// @match        https://bangumi.tv/*
// @match        https://bgm.tv/*
// @match        https://chii.in/*
// @icon         https://bgm.tv/img/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  for (const cssStyleSheet of document.styleSheets) {
    const cssRules = cssStyleSheet.cssRules;
    for (let i = 0; i < cssRules.length; i += 1) {
      const rule = cssRules[i];
      const regex = /\#timeline.*\.card\.card_tiny.*\:hover/g;
      if (rule.selectorText && rule.selectorText.search(regex) !== -1) {
        // console.log(rule);
        cssStyleSheet.deleteRule(i);
      }
    }
  }
})();
