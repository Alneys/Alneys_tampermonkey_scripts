// ==UserScript==
// @name         MonikaDesign - 前置制作组名称
// @namespace    http://tampermonkey.net/
// @version      0.1.1
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
    console.log('updateTorrentListingNameHelper');
    document.querySelectorAll('.torrent-listings-name').forEach((each) => {
      const text = each.innerText;
      if (text[0] !== '[') {
        flag = true;
        for (const separator of separators) {
          let splitTexts = text.split(separator);
          if (splitTexts.length > 1) {
            each.innerText = `[${splitTexts[splitTexts.length - 1].trim()}] ${
              each.innerText
            }`;
            return;
          }
        }
      }
    });
    return flag;
  }

  let interval = undefined;
  const updateDelay = 200;

  function updateTorrentListingName() {
    clearInterval(interval);
    let trueResult = 0;
    let falseResult = 0;
    interval = setInterval(function () {
      const result = updateTorrentListingNameHelper();
      if (result) {
        if (falseResult) {
          trueResult += 1;
        }
      } else {
        falseResult += 1;
      }
      if ((trueResult && falseResult) || trueResult + falseResult > 50) {
        document.querySelectorAll('.pagination a, fas').forEach((each) => {
          each.addEventListener('click', updateTorrentListingName);
        });
        clearInterval(interval);
      }
    }, updateDelay);
  }

  updateTorrentListingName();

  document.querySelectorAll('.pagination a, fas').forEach((each) => {
    each.addEventListener('click', updateTorrentListingName);
  });

  document
    .querySelectorAll('#torrent-advanced-search input[type=checkbox]')
    .forEach((each) => {
      each.addEventListener('click', updateTorrentListingName);
    });

  document
    .querySelectorAll(
      '#torrent-advanced-search input[type=text], #torrent-list-search input[type=search]'
    )
    .forEach((each) => {
      each.addEventListener('keyup', updateTorrentListingName);
    });
})();
