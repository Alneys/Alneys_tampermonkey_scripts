// == UserScript ==
// @name         时间线卡片调整-显示原名和译名
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  交换所有 .card 元素中的 .title 和 .subtitle 文本
// @author       Alneys
// @match        https://bangumi.tv/*
// @match        https://bgm.tv/*
// @match        https://chii.in/*
// @icon         https://bgm.tv/img/favicon.ico
// @grant        none
// ==/UserScript==
(function () {
  'use strict';
  function swapTitlesAndSubtitles() {
    // 获取页面上所有具有 "card" 类的元素
    const cardElements = document.querySelectorAll('.card:not([data-swapped])'); // 只选择还未处理过的.card元素
    // 遍历每一个 "card" 元素
    cardElements.forEach((card) => {
      // 找到该 card 内部的 .title 和 .subtitle 元素
      const titleElement = card.querySelector('.title');
      const subtitleElement = titleElement.querySelector('.subtitle');
      if (titleElement && subtitleElement) {
        // 确保两者都存在
        const titleHref = card.querySelector('.title a').href;
        // 获取它们的文本内容
        const titleText = titleElement.textContent.trim();
        const subtitleText = subtitleElement.textContent.trim();
        if (subtitleText !== '') {
          const pureTitleText = titleText.replace(subtitleText, '').trim();
          // 重新组合.title和.subtitle
          titleElement.innerHTML = `<a href=${titleHref}>${subtitleText}<small class="grey">${pureTitleText}</small></a>`;
        } else {
          // do nothing
        }
        card.setAttribute('data-swapped', 'true'); // 标记该.card元素已经被处理过
      }
    });
  }
  // 首次运行
  swapTitlesAndSubtitles();
  // 创建一个观察器实例
  const observer = new MutationObserver(function (mutations) {
    swapTitlesAndSubtitles();
  });
  // 配置观察器：观察整个文档和子树的变化
  observer.observe(document.body, { childList: true, subtree: true });
})();
