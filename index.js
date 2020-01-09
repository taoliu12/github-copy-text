// ==UserScript==
// @name         Copy github file to clipboard
// @description  Add copy github file text to clipboard
// @namespace    org.adong
// @version      0.1
// @author       adong
// @homepageURL  https://github.com/ldong/github-copy-text
// @supportURL   https://github.com/ldong/github-copy-text/README.md
// @match        *://github.com/*
// @match        *://www.github.com/*
// @include      /^https?://git\.corp.*/.*$/
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    // copied from http://stackoverflow.com/a/36640126/2305243
    function CopyToClipboard(node) {
        debugger
        var range;
        var selection;
        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select().createTextRange();
            document.execCommand("Copy");

        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(node);
            selection = window.getSelection()
            selection.removeAllRanges();  //https://stackoverflow.com/questions/43260617/selection-addrange-is-deprecated-and-will-be-removed-from-chrome
            selection.addRange(range);

            document.execCommand("Copy");
            alert("text copied");
        }
    }


    var copyButton = document.createElement('button');
    copyButton.classList = 'btn btn-sm BtnGroup-item copy-file-another';
    copyButton.textContent = 'Copy Text';

    copyButton.addEventListener('click', function(e) {
        e.preventDefault();
        var copyContentNode = document.querySelector(".Box-body.p-0.blob-wrapper.data.type-text")
        CopyToClipboard(copyContentNode);
    });

    var targetButtonGroup = document.querySelector('.d-flex.py-1.py-md-0.flex-auto.flex-order-1.flex-md-order-2.flex-sm-grow-0.flex-justify-between')
    if (targetButtonGroup) {
        targetButtonGroup.appendChild(copyButton);
    } else {
        console.error('Please file a bug, or make a PR. ');
    }

})();
