// ==UserScript==
// @name         Copy github file to clipboard
// @namespace    github
// @version      0.1
// @description  Add copy github file text to clipboard
// @author       adong
// @match        http://.*github.com/.*
// @include      *github.com*
// @include      *git.corp.yahoo.com*
// @grant        none
// ==/UserScript==

(function() {
    // copied from http://stackoverflow.com/a/36640126/2305243
    function CopyToClipboard(selector) {
        var range;
        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(document.querySelector(selector));
            range.select().createTextRange();
            document.execCommand("Copy");

        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(document.querySelector(selector));
            window.getSelection().addRange(range);
            document.execCommand("Copy");
            alert("text copied");
        }
    }


    var copyButton = document.createElement('button');
    copyButton.classList = 'btn btn-sm BtnGroup-item copy-file-another';
    copyButton.textContent = 'Copy Text';

    copyButton.addEventListener('click', function(e) {
        e.preventDefault();
        CopyToClipboard('.blob-wrapper.data.type-javascript');
        // var copyArea = document.querySelector('.blob-wrapper.data.type-javascript');
        // var copyAreaContent = copyArea.textContent;
        // copyArea.select();

        // try {
        //   var successful = document.execCommand('copy');
        //   var msg = successful ? 'successful' : 'unsuccessful';
        //   console.log('Copying text command was ' + msg);
        // } catch (err) {
        //   console.log('Oops, unable to copy');
        // }

    });


    var targetButtonGroupClass = '.BtnGroup.float-right';
    var targetButtonGroup = document.querySelector(targetButtonGroupClass);
    if (targetButtonGroup) {
        targetButtonGroup.appendChild(copyButton);
    } else {
        console.error('Please file a bug, or make a PR. ');
    }

})();