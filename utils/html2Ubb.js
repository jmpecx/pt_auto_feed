
export function rgb_2_hex(data) {
    if (data.match(/rgb\((.*)\)/)){
        data = data.match(/rgb\((.*)\)/)[1];
        data = data.split(',');
        let color = '#';
        for (let iii=0; iii<data.length; iii++){
            var color_tmp = parseInt(data[iii]).toString(16);
            if (color_tmp.length < 2) {
                color_tmp = '0' + color_tmp;
            }
            color += color_tmp;
        }
        return color;
    } else {
        return data;
    }
}
export function walkDOM(n,raw_info,site_url) {
    do {
        if (n.nodeName == 'FONT') {
            if (n.color != '') {
                n.innerHTML = '[color=' + n.color + ']' + n.innerHTML + '[/color]';
            }
            if (n.size != '') {
                n.innerHTML = '[size=' + n.size + ']' + n.innerHTML + '[/size]';
            }
            if (n.face != '') {
                n.innerHTML = '[font=' + n.face + ']' + n.innerHTML + '[/font]';
            }
        } else if (n.nodeName == 'SCRIPT'){
            n.innerHTML = '';
        } else if (n.nodeName == 'SPAN') {
            if (n.style.color != '') {
                n.innerHTML = '[color=' + rgb_2_hex(n.style.color) + ']' + n.innerHTML + '[/color]';
            }
        } else if (n.nodeName == 'U'){
            n.innerHTML = '[u]' + n.innerHTML + '[/u]';
        } else if (n.nodeName == 'A') {
            if (n.innerHTML != "" && n.href) {
                if (site_url.match(/http(s*):\/\/chdbits.co\/details.php.*/i)) {
                    if (!n.innerHTML.match(/pic\/hdl\.gif/g)) {
                        n.innerHTML = '[url=' + n.href + ']' + n.innerHTML + '[/url]';
                    }
                } else {
                    n.innerHTML = '[url=' + n.href + ']' + n.innerHTML + '[/url]';
                }
            }
        } else if (n.nodeName == 'TABLE') {
            if (n.innerHTML != "") {
                if (site_url.match(/http(s*):\/\/totheglory.im.*|bwtorrents.tv/i)) {
                    n.innerHTML = '[quote]' + n.innerHTML + '[/quote]';
                } else if (site_url.match(/u2.dmhy/)) {
                    n.innerHTML = '';
                }
            }
        } else if (n.nodeName == 'P') {
            if (n.innerHTML != "") {
                if (site_url.match(/http(s*):\/\/totheglory.im.*/i)) {
                    n.innerHTML = '';
                } else if (site_url.match(/hdroute/i) && n.className == 'quoted') {
                    n.innerHTML = '[quote]' + n.innerHTML + '[/quote]';
                }
            }
        } else if (n.nodeName == 'FIELDSET' || n.nodeName == 'BLOCKQUOTE') {
            if (!site_url.match(/hudbt/i) || n.nodeName != 'BLOCKQUOTE'){
                n.innerHTML = '[quote]' + n.innerHTML + '[/quote]';
            }
            if (n.nodeName == 'FIELDSET' && n.textContent.match(/(温馨提示|郑重声明|您的保种|商业盈利|相关推荐|自动发布|仅供测试宽带|不用保种|本站仅负责连接|感谢发布者|转载请注意礼节)/g)) {
                n.innerHTML = '';
            }
        } else if (n.nodeName == 'DIV' && n.innerHTML == '代码') {
            n.innerHTML = '';
            n.nextSibling.innerHTML = '[quote]' + n.nextSibling.innerHTML + '[/quote]';
        } else if (n.nodeName == 'DIV' && n.className == 'quoted' && site_url.match(/digitalcore/)) {
            n.innerHTML = '[quote]' + n.innerHTML + '[/quote]';
        } else if (n.nodeName == 'B') {
            n.innerHTML = '[b]' + n.innerHTML + '[/b]';
        } else if (n.nodeName == 'DIV' && site_url.match(/npupt/) && n.className == 'well small') {
            n.innerHTML = '';
        } else if (n.nodeName == '#text' && site_url.match(/npupt/)) {
            n.data = n.data.replace(/^ +| +$/g, '');
        } else if (n.nodeName == 'BR') {
            if (site_url.match(/u2.dmhy.org|ourbits.club|totheglory.im.*|blutopia.cc.*|desitorrents.tv|hudbt|cinemageddon|hdpost.top|asiancinema.me|hd-olimpo.club|digitalcore.club|bwtorrents.tv|myanonamouse/i)) {
                n.innerHTML = '\r\n';
            }
        } else if (n.nodeName == 'LEGEND') {
            n.innerHTML = '';
        } else if (n.nodeName == 'IMG') {
            if (site_url.match(/http(s*):\/\/chdbits.co\/details.php.*/i)) {
                if (!n.src.match(/pic\/hdl\.gif/g)) {
                    raw_info.descr = raw_info.descr + '[img]' + n.src + '[/img]';
                }
            } else if (site_url.match(/http(s*):\/\/club.hares.top\/details.php.*/i)) {
                if ($(n).attr('lay-src') !== undefined) {
                    raw_info.descr = raw_info.descr + '[img]' + $(n).attr('lay-src') + '[/img]';
                } else {
                    raw_info.descr = raw_info.descr + '[img]' + n.src + '[/img]';
                }
            } else if (site_url.match(/http(s*):\/\/www.tjupt.org\/details.php.*/i)) {
                if ($(n).attr('data-src') !== undefined) {
                    raw_info.descr = raw_info.descr + '[img]' + $(n).attr('data-src') + '[/img]';
                } else {
                    raw_info.descr = raw_info.descr + '[img]' + n.src + '[/img]';
                }
            } else {
                raw_info.descr = raw_info.descr + '[img]' + n.src + '[/img]';
            }
        } else if (n.nodeName=='DIV' && site_url.match(/pthome|audiences/i) && n.className == 'codemain') {
            if (raw_info.name.match(/-ADE|-ADWeb/) && raw_info.descr.match(/General/)) {
                n.innerHTML = '';
            } else if (n.parentNode.className == 'hide' || site_url.match(/pthome/i)) {
                if (!n.innerHTML.match(/^\[quote\]/)) {
                    n.innerHTML = '[quote]' + n.innerHTML + '[/quote]';
                }
            } else {
                n.innerHTML = '';
            }
        } else if (n.nodeName=='TT' && site_url.match(/cinematik/i)) {
            n.innerHTML = '[quote]' + n.innerHTML + '[/quote]';
        } else if (n.nodeName=='TD' && site_url.match(/cinematik/i) && n.style.border == "1px dotted rgb(0, 0, 0)") {
            n.innerHTML = '[quote]' + n.innerHTML + '[/quote]';
        } else if (n.nodeName == 'TD' && n.innerHTML.match(/此处包含部分隐藏内容/)) {
            n.innerHTML = '';
        } else if (n.nodeName == 'TD' && site_url.match(/tjupt/i) && n.innerHTML.match(/General/)) {
            n.innerHTML = '[quote]' + n.innerHTML + '[/quote]';
        }
        if (n.hasChildNodes()) {
            walkDOM(n.firstChild,raw_info,site_url);
        } else {
            raw_info.descr = raw_info.descr + n.textContent;
        }
        n = n.nextSibling;
    } while (n);
    return raw_info.descr;
}
