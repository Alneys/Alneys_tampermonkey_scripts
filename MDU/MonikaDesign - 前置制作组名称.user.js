// ==UserScript==
// @name         MonikaDesign - 前置制作组名称
// @namespace    http://tampermonkey.net/
// @version      0.2.0
// @description  MonikaDesign - 前置制作组名称
// @author       Alneys
// @match        https://monikadesign.uk/torrents?*
// @match        https://monikadesign.uk/torrents
// @match        https://monikadesign.uk/torrents/similar/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=monikadesign.uk
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';

  /** 组名和前面名称部分的分割符 */
  const separators = ['.0-', '.1-', 'Atmos-', '2.0 ', '2.1 ', '5.1 ', '7.1 '];

  function updateTorrentListingNameHelper() {
    let flag = false;
    document
      .querySelectorAll('.torrent-listings-name:not([group-name-moved])')
      .forEach((each) => {
        const text = each.innerText;
        // console.log('new', each.innerText);
        if (text[0] !== '[') {
          flag = true;
          for (const separator of separators) {
            const splitTexts = text.split(separator);
            if (splitTexts.length > 1) {
              each.innerText = `[${splitTexts[splitTexts.length - 1].trim()}] ${
                each.innerText
              }`;
              each.setAttribute('group-name-moved', true);
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
