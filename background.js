let _bON = false; // ボタンのOFF/OFF状態(true...ON状態, false...OFF状態)

// ニコニコプレイヤーにボタンのDOMを挿入
function insertBtnToPlayer() {

    // ボタンの挿入箇所
    let settingMenu = document.querySelector('.___comment-button___FCHFf');
    if(settingMenu != null)
    {
        let p1 = document.createElement('div');
        p1.innerHTML = '<button class="progress-btn" aria-label="シークバー無効化" type="button" data-toggle-mode="state" data-toggle-state="true">' +
            '<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><path class="st0" d="M375.898,119.898H136.102C60.938,119.898,0,180.836,0,256s60.938,136.102,136.102,136.102h239.797 C451.062,392.102,512,331.164,512,256S451.062,119.898,375.898,119.898z M136.102,340.258c-46.461,0-84.258-37.797-84.258-84.258 c0-46.453,37.797-84.258,84.258-84.258s84.258,37.805,84.258,84.258C220.359,302.461,182.562,340.258,136.102,340.258z"></path></g></svg>' +
            '</button>' +
            '<style>' +
            '.progress-btn:before {background-color: #252525;border-radius: 2px;bottom: 100%;box-shadow: 0 0 2px 0 rgb(0 0 0 / 50%);box-sizing: border-box;color: #fff;content: attr(aria-label);display: block;font-size: 12px;left: 50%;letter-spacing: normal;line-height: 1;opacity: 0;padding: 6px 8px;pointer-events: none;position: absolute;text-align: center;transform: translate(-50%);transition: opacity .12s ease;white-space: nowrap;z-index: 10000;}'+
            '.progress-btn:enabled:hover:before,'+
            '.progress-btn:not([aira-disabled]:enabled:disabled):hover:before,'+
            '[data-input-mode=keyboard] .progress-btn:enabled:focus:before {opacity: 1;}' +
            '.progress-btn{ cursor: pointer; background-color: transparent;border: 0;height: 36px;margin: 0;overflow: visible;padding: 0;position: relative;width: 32px; }' +
            '.progress-btn svg {    height: var(--player-controller-icon-butoon-icon-size,16px);vertical-align: bottom;width: var(--player-controller-icon-butoon-icon-size,16px); }' +
            '.progress-btn svg path {    fill: #fffcfc; transition: fill .12s ease;}' +
            '.progress-btn:hover svg path {fill: #1f7cff;}' +
            '.progress-btn:before { background-color: #252525;border-radius: ' +
            '2px;bottom: 100%;box-shadow: 0 0 2px 0 rgb(0 0 0 / 50%);box-sizing: border-box;color: #fff;content: attr(aria-label);display: block;font-size: 12px;left: 50%;letter-spacing: normal;line-height: 1;' +
            'opacity: 0;padding: 6px 8px;pointer-events: none;position: absolute;text-align: center;transform: translate(-50%);transition: opacity .12s ease;white-space: nowrap;z-index: 10000; }' +
            '.progress-btn.ON svg path {fill: #088700;}' +
            '</style>';
        
        // ボタンの挿入
        settingMenu.parentNode.prepend(p1);
    }
}


// 挿入したボタンのクリックイベントハンドラ
function toggleBtnClick() {
    
    if(_bON == false) {
        _bON = true;
        
        // シークバーを探す
        let elements = document.querySelectorAll('input[type="range"]');
        if(elements != null) {
            let len = elements.length;
            for (let i = 0; i < len; i++) {
                let attrName = elements[i].getAttribute("name");
                if (attrName == null) {
                    // シークバーのDOMにdisableを設定
                    elements[i].disabled = true;
                }
            }

            // ボタンをON状態に
            let btn = document.querySelector('.progress-btn');
            btn.classList.add("ON");

            // シークバーにマウスカーソルをホバーしたときの時刻表示を非表示に
            document.querySelector('.___seek-information___2iaHV').style.display ="none";
            
            // ストレージにボタンの状態を保存
            chrome.storage.local.set({"onon": "ON"}, function() {
                console.log('Value is set to ' + "ON");
              });

        }
    
    } else {
        _bON = false;

        // シークバーを探す
        let elements = document.querySelectorAll('input[type="range"]');
        if(elements != null){
            let len = elements.length;
            for (let i = 0; i < len; i++) {
                let attrName = elements[i].getAttribute("name");
                if (attrName == null) {
                    // シークバーのDOMにdisableを解除
                    elements[i].disabled = false;
                }
            }

            // ボタンをOFF状態に
            let btn = document.querySelector('.progress-btn');
            btn.classList.remove("ON");

            // シークバーにマウスカーソルをホバーしたときの時刻表示を表示に
            document.querySelector('.___seek-information___2iaHV').style.display ="block";

            // ストレージにボタンの状態を保存
            chrome.storage.local.set({"onon": "OFF"}, function() {
                console.log('Value is set to ' + "OFF");
              });            
        }
    }
}

// ニコニコプレイヤーにボタンを追加
insertBtnToPlayer();

// 追加したボタンにclickイベント設定
let button = document.querySelector('.progress-btn');
if(button != null){
    button.addEventListener('click', toggleBtnClick);
}

// 前回起動時のボタンのON/OFF状態を読み込みONならばボタンをON状態にする
chrome.storage.local.get("onon", function (value) {
    if(value.onon == "ON") {
        toggleBtnClick();
    }
});
