// == UserScript ==
// @name         时间线卡片调整：修复卡片内容展示不全
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  时间线卡片调整：修复卡片内容展示不全
// @author       Alneys
// @match        https://bangumi.tv/*
// @match        https://bgm.tv/*
// @match        https://chii.in/*
// @icon         https://bgm.tv/img/favicon.ico
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
  function func() {
    // 选择所有.card.card_tiny
    const cards = document.querySelectorAll('.card.card_tiny');
    cards.forEach((card) => {
      // 选择.container
      const container = card.querySelector('.container');
      // 设置.card_tiny的高度
      if (container) {
        card.style.minHeight = `${container.clientHeight}px`;
        card.style.maxHeight = `${container.clientHeight}px`;
      }
    });
  }
  // 延迟2秒首次运行，试图解决片假名终结者的冲突
  setTimeout(func, 2000);
  // 创建一个观察器实例
  const observer = new MutationObserver(function (mutations) {
    func();
  });
  // 配置观察器：观察整个文档和子树的变化
  observer.observe(document.body, { childList: true, subtree: true });
})();
