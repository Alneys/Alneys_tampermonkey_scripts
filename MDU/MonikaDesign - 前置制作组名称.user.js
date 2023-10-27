// ==UserScript==
// @name         MonikaDesign - 前置制作组名称
// @namespace    http://tampermonkey.net/
// @version      0.3.0
// @description  MonikaDesign - 前置制作组名称
// @author       Alneys
// @match        https://monikadesign.uk
// @match        https://monikadesign.uk/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=monikadesign.uk
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  /** 组名和前面名称部分的分割符 */
  const separators = ['.0-', '.1-', 'Atmos-', '2.0 ', '2.1 ', '5.1 ', '7.1 '];

  /** 种子名称选择器字符串列表 */
  const torrentNameSelectorList = [
    // 首页 - 资源排名
    '.page__home .torrent-listings-format+td a:not([group-name-moved])',
    // 种子列表
    '.torrent-listings-name:not([group-name-moved])',
    // 种子卡片
    '.card.is-torrent .description_title a:not([group-name-moved])',
    // 种子分组
    '.torrent-search--grouped__name b:not([group-name-moved])',
  ];
  /** 种子名称选择器字符串 */
  const torrentNameSelector = torrentNameSelectorList.join(',');

  function updateTorrentListingNameHelper() {
    let flag = false;
    document.querySelectorAll(torrentNameSelector).forEach((each) => {
      const text = each.textContent;
      if (text[0] !== '[') {
        flag = true;
        for (const separator of separators) {
          const splitTexts = text.split(separator);
          if (splitTexts.length > 1) {
            each.innerText = `[${splitTexts[
              splitTexts.length - 1
            ].trim()}] ${text}`;
            each.setAttribute('group-name-moved', 'true');
            return;
          }
        }
      }
    });
    return flag;
  }

  // 首次运行
  updateTorrentListingNameHelper();
  // 创建一个观察器实例
  const observer = new MutationObserver(function (mutations) {
    updateTorrentListingNameHelper();
  });
  // 配置观察器：观察整个文档和子树的变化
  observer.observe(document.body, { childList: true, subtree: true });
})();
