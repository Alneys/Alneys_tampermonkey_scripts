// ==UserScript==
// @name         MonikaDesign - 前置制作组名称
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  MonikaDesign - 前置制作组名称
// @author       Alneys
// @match        https://monikadesign.uk/torrents?*
// @match        https://monikadesign.uk/torrents
// @match        https://monikadesign.uk/torrents/similar/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=monikadesign.uk
// @grant        none
// @run-at       document-end
// @require      https://cdn.bootcss.com/jquery/3.7.1/jquery.min.js
// ==/UserScript==

(function () {
  'use strict';

  const separators = ['0-', '1-', '2.0 ', '2.1 ', '5.1', 'Atmos-'];

  function updateTorrentListingNameHelper() {
    let flag = false;
    console.log('updateTorrentListingNameHelper');
    $('.torrent-listings-name').each(function () {
      const text = this.innerText;
      if (text[0] !== '[') {
        flag = true;
        for (const separator of separators) {
          let splitTexts = text.split(separator);
          if (splitTexts.length > 1) {
            this.innerText = `[${splitTexts[splitTexts.length - 1]}] ${
              this.innerText
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
        trueResult += 1;
      } else {
        falseResult += 1;
      }
      if ((trueResult && falseResult) || trueResult + falseResult > 50) {
        $('.pagination a').click(function () {
          updateTorrentListingName();
        });
        clearInterval(interval);
      }
    }, updateDelay);
  }

  updateTorrentListingName();

  $('.pagination a').click(function () {
    updateTorrentListingName();
  });

  $('#torrent-advanced-search input[type=checkbox]').click(function () {
    updateTorrentListingName();
  });

  $(
    '#torrent-advanced-search input[type=text], #torrent-list-search input[type=search]'
  ).keyup(function () {
    updateTorrentListingName();
  });
})();
