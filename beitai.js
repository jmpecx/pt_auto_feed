import axios from 'axios'
import * as cheerio from 'cheerio';
import {JSDOM} from "jsdom";
import {walkDOM} from "./utils/html2Ubb.js";
import {getBasicInfo} from "./utils/getBasicInfo.js";
import * as fsp from 'node:fs/promises';
import * as fs from 'node:fs';
import axiosRetry from 'axios-retry';

//
const site_url = 'https://www.beitai.pt/details.php?id=6149&hit=1';


const btApi = axios.create({
    baseURL: 'https://www.beitai.pt/',
    // timeout: 1000,
    headers: {'Cookie': ''}
});
axiosRetry(btApi, {retries: 3});


export async function getList(page = 0) {
    console.log(`开始处理第${page}页`)
    const url = `torrents.php?inclbookmarked=0&incldead=1&spstate=0&page=${page}`
    // 访问它，获取整个帖子列表
    const listResp = await btApi.get(url);
    const $ = cheerio.load(listResp.data);
    //
    console.log(`获取成功，开始分析第${page}页`)
    // 开始获取列表，存储到数组之中.
    const hrefList = $('.torrentname a[href*="details.php"]')

    // console.log(hrefList)
    return hrefList.map((x, x1) => {
        const href = $(x1).attr('href');
        return href
    })
}

function get_medium(result) { //媒介
    if (result.match(/(Webdl|Web-dl|WEB)/i)) {
        result = 'WEB-DL';
    } else if (result.match(/(UHDTV)/i)) {
        result = 'UHDTV';
    } else if (result.match(/(HDTV)/i)) {
        result = 'HDTV';
    } else if (result.match(/(Remux)/i) && !result.match(/Encode/)) {
        result = 'Remux';
    } else if (result.match(/(Blu-ray|.MPLS|Bluray原盘)/i) && !result.match(/Encode/i)) {
        result = 'Blu-ray';
    } else if (result.match(/(UHD|UltraHD)/i) && !result.match(/Encode/i)) {
        result = 'UHD';
    } else if (result.match(/(Encode|BDRIP|webrip|BluRay)/i) || result.match(/(x|H).?(264|265)/i)) {
        result = 'Encode';
    } else if (result.match(/(DVDRip|DVD)/i)) {
        result = 'DVD';
    } else if (result.match(/TV/)) {
        result = 'TV';
    } else if (result.match(/VHS/)) {
        result = 'VHS';
    } else {
        result = '';
    }
    return result;
}

function codec_sel(result) {
    if (result.match(/(H264|H\.264|AVC)/i)) {
        result = 'H264';
    } else if (result.match(/(HEVC|H265|H\.265)/i)) {
        result = 'H265';
    } else if (result.match(/(VVC|H266|H\.266)/i)) {
        result = 'H266';
    } else if (result.match(/(X265)/i)) {
        result = 'X265';
    } else if (result.match(/(X264)/i)) {
        result = 'X264';
    } else if (result.match(/(VC-1)/i)) {
        result = 'VC-1';
    } else if (result.match(/(MPEG-2)/i)) {
        result = 'MPEG-2';
    } else if (result.match(/(MPEG-4)/i)) {
        result = 'MPEG-4';
    } else if (result.match(/(XVID)/i)) {
        result = 'XVID';
    } else if (result.match(/(VP9)/i)) {
        result = 'VP9';
    } else if (result.match(/DIVX/i)) {
        result = 'DIVX';
    } else {
        result = '';
    }

    return result;
}

function audiocodec_sel(result) { //音频编码
    if (result.match(/(DTS-HDMA:X 7\.1|DTS.?X.?7\.1)/i)) {
        result = 'DTS-HDMA:X 7.1';
    } else if (result.match(/(DTS-HD.?MA)/i)) {
        result = 'DTS-HDMA';
    } else if (result.match(/(DTS-HD.?HR)/i)) {
        result = 'DTS-HDHR';
    } else if (result.match(/(DTS-HD)/i)) {
        result = 'DTS-HD';
    } else if (result.match(/(DTS-X)/i)) {
        result = 'DTS-X';
    } else if (result.match(/(LPCM)/i)) {
        result = 'LPCM';
    } else if (result.match(/(DD|AC3|AC-3|Dolby Digital)/i)) {
        result = 'AC3';
    } else if (result.match(/(Atmos)/i)) {
        result = 'Atmos';
    } else if (result.match(/(AAC)/i)) {
        result = 'AAC';
    } else if (result.match(/(TrueHD)/i)) {
        result = 'TrueHD';
    } else if (result.match(/(DTS)/i)) {
        result = 'DTS';
    } else if (result.match(/(Flac)/i)) {
        result = 'Flac';
    } else if (result.match(/(APE)/i)) {
        result = 'APE';
    } else if (result.match(/(MP3)/i)) {
        result = 'MP3';
    } else if (result.match(/(WAV)/i)) {
        result = 'WAV';
    } else if (result.match(/(OPUS)/i)) {
        result = 'OPUS';
    } else if (result.match(/(OGG)/i)) {
        result = 'OGG';
    } else {
        result = '';
    }
    if (result.match(/AUDiO CODEC/i) && result.match(/-WiKi/)) {
        result = result.match(/AUDiO CODEC.*/)[0];
        result = audiocodec_sel(result);
    }
    return result;
}

function standard_sel(result) {
    if (result.match(/(4320p|8k)/i)) {
        result = '8K';
    } else if (result.match(/(1080p|2K)/i)) {
        result = '1080p';
    } else if (result.match(/(720p)/i)) {
        result = '720p';
    } else if (result.match(/(1080i)/i)) {
        result = '1080i';
    } else if (result.match(/(576p|480p)/i)) {
        result = 'SD';
    } else if (result.match(/(1440p)/i)) {
        result = '144Op';
    } else if (result.match(/(2160p|4k)/i)) {
        result = '4K';
    } else {
        result = '';
    }
    return result;
}

export async function parseTorrent(url) {
    //
    const idArray = url.match(/id=(\d+)/);
    if (!idArray || idArray.length !== 2) {
        throw new Error(`${url} 格式有误，获取id失败`)
    }
    const id = idArray[1];
    const cachePath = './cache/' + id + '.json'
    if (fs.existsSync(cachePath)) {
        return JSON.parse(fs.readFileSync(cachePath))
    }
    // 尝试从缓存读取.
    const details = await btApi.get(url);
    const $ = cheerio.load(details.data);
    // 获取到页面详情，开始解析.

//需要从源网页获取的信息，有些可能没有
    const raw_info = {
        //填充类信息
        'name': '', //主标题
        'small_descr': '', //副标题
        'url': '', //imdb链接
        'dburl': '', //豆瓣链接
        'descr': '', //简介
        'log_info': '',  //音乐特有
        'tracklist': '', //音乐特有
        'music_type': '', //音乐特有
        'music_media': '', //音乐特有
        'edition_info': '',//音乐特有
        'music_name': '', //音乐特有
        'music_author': '', //音乐特有
        'animate_info': '', //动漫特有|针对北邮人北洋U2的命名方式
        'anidb': '', //动漫特有
        'torrentName': '', //动漫辅助
        'images': [], // 截图

        'torrent_name': '', // 用于转发内站
        'torrent_url': '',  // 用于转发内站

        //选择类信息
        'type': '',  //type:可取值——电影/纪录/体育/剧集/动画/综艺……
        'source_sel': '', //来源(地区)：可取值——欧美/大陆/港台/日本/韩国/印度……
        'standard_sel': '',  //分辨率：可取值——4K/1080p/1080i/720p/SD
        'audiocodec_sel': '',  //音频：可取值——AAC/AC3/DTS…………
        'codec_sel': '', //编码：可取值——H264/H265……
        'medium_sel': '', //媒介：可取值——web-dl/remux/encode……
        'team_sel': '',
        'processing_sel': 'SDR', //画质 默认sedr
        //其他
        'origin_site': '', //记录源站点用于跳转后识别
        'origin_url': '', //记录源站点用于跳转后识别
        'golden_torrent': false, //主要用于皮转柠檬, 转过去之后会变成字符串
        'mediainfo_cmct': '', //适用于春天的info
        'imgs_cmct': '', //适用于春天的截图
        'full_mediainfo': '', //完整的mediainfo有的站点有长短两种，如：铂金家、猫、春天
        'subtitles': [], //针对皮转海豹，字幕

        'youtube_url': '', //用于发布iTS
        'ptp_poster': '',  //用于发布iTS
        'comparisons': '', //用于海豹
        'version_info': '', //用于海豹
        'multi_mediainfo': '', //用于海豹
        'labels': 0
    };
    // 标题.
    raw_info.title = $('#top').contents().filter((i, c) => {
        return c.nodeType === 3;
    }).text().trim();

    raw_info.name = raw_info.title;
    // 描述.
    const {window} = new JSDOM(details.data);
    const dom = window.document
    const n = dom.getElementById('kdescr');
    raw_info.descr = walkDOM(n, raw_info, 'https://www.beitai.pt/details.php?id=6149&hit=1')
    raw_info.descr = raw_info.descr.replace(/\[\/img\]\n\n/g, '[/img]\n');
    const mediaInfo = raw_info.descr.match(/\[quote\]([\w\W]+?)\[\/quote\]/g);
    if (mediaInfo?.length > 0) {
        raw_info.full_mediainfo = mediaInfo.join('\n\n')
        raw_info.full_mediainfo = raw_info.full_mediainfo.replaceAll('[quote]', '').replace('[/quote]', '')
        raw_info.descr = raw_info.descr.replace(/\[quote\]([\w\W]+?)\[\/quote\]/g, "")
    }
    // --
    raw_info.torrent_name = $('a[href*="download.php"]:contains(torrent)').text();
    const torrent_url = $('a[href*="download.php"]:contains(torrent)').attr('href');
    const path = './data/' + raw_info.torrent_name
    if (!fs.existsSync(path)) {
        // 下载种子.
        const res = await btApi.get(torrent_url, {
            responseType: "arraybuffer"
        })
        // 保存到本地
        await fsp.writeFile('./data/' + raw_info.torrent_name, res.data)
    }
    raw_info.torrent_url = path
    // 接下来选择类型
    // 填充基本信息.
    getBasicInfo(details.data, raw_info)
    // 完成
    //补充豆瓣和imdb链接
    if (raw_info.url === ''){
        const url = raw_info.descr.match(/http(s*):\/\/www.imdb.com\/title\/tt(\d+)/i);
        if (url){
            raw_info.url = url[0] + '/';
        }
    }
    if (raw_info.dburl === ''){
        const dburl = raw_info.descr.match(/http(s*):\/\/.*?douban.com\/subject\/(\d+)/i);
        if (dburl){
            raw_info.dburl = dburl[0] + '/';
        }
    }
    raw_info.url = raw_info.url.split('?').pop();
    // 获取媒介信息
    raw_info.medium_sel = get_medium(raw_info.title)
    if (raw_info.medium_sel === 'Blu-ray' && raw_info.name.match(/UHD|2160P/i)) {
        raw_info.medium_sel = 'UHD';
    }
    //如果没有编码信息
    if (raw_info.codec_sel === '') {
        raw_info.codec_sel = codec_sel(raw_info.name);
    }

    //没有音频编码, 从标题获取，最后从简介获取
    if (raw_info.audiocodec_sel === '') {
        raw_info.audiocodec_sel = audiocodec_sel(raw_info.name);
        if (raw_info.audiocodec_sel === '') {
            raw_info.audiocodec_sel = audiocodec_sel(raw_info.descr);
        }
    }
    //
    //没有分辨率
    if (raw_info.standard_sel === '') {
        raw_info.standard_sel = standard_sel(raw_info.name);
    }
    if (raw_info.standard_sel == '') {
        try {
            var height = raw_info.descr.match(/Height.*?:(.*?)pixels/i)[1].trim();
            if (height == '480' || height == '576') {
                raw_info.standard_sel = 'SD';
            } else if (height == '720') {
                raw_info.standard_sel = '720p';
            } else if (height == '1 080') {
                raw_info.standard_sel = '1080p';
                if (raw_info.descr.match(/Scan.*?type.*?(Interleaved|Interlaced)/i)) {
                    raw_info.standard_sel = '1080i';
                }
            } else if (height == '2 160') {
                raw_info.standard_sel = '4K';
            }
        } catch (err) {
        }
    }

    if (raw_info.standard_sel == '1080p') {
        if (standard_sel(raw_info.name) == '1080i') {
            raw_info.standard_sel = '1080i';
        } else if (raw_info.descr.match(/1080i|Scan.*?type.*?(Interleaved|Interlaced)/)) {
            raw_info.standard_sel = '1080i';
        }
    }

    if (raw_info.name.match(/Remux/i)) {
        raw_info.medium_sel = 'Remux';
    }

    if (raw_info.name.match(/webrip/i)) {
        raw_info.medium_sel = 'WEB-DL';
    }
    // if (raw_info.edition_info.medium_sel()) {
    //     if (raw_info.edition_info.medium_sel() != 'Blu-ray' || raw_info.descr.match(/mpls/i)) {
    //         raw_info.medium_sel = raw_info.edition_info.medium_sel();
    //     } else if (raw_info.edition_info.medium_sel() == 'Blu-ray' && raw_info.edition_info.match(/mkv/i)) {
    //         raw_info.medium_sel = 'Encode';
    //     }
    // }

    if (raw_info.codec_sel == 'H265' && raw_info.name.match(/x265/i)) {
        raw_info.codec_sel = 'X265';
    }
    if (!raw_info.codec_sel) {
        if (raw_info.descr.match(/Writing library.*(x264|x265)/)) {
            raw_info.codec_sel = raw_info.descr.match(/Writing library.*(x264|x265)/)[1].toUpperCase();
            if (raw_info.name.match(/H.?26[45]/)) {
                raw_info.name = raw_info.name.replace(/H.?26[45]/i, raw_info.codec_sel.toLowerCase())
            }
        } else if (raw_info.descr.match(/Video[\s\S]*?Format.*?HEVC/i)) {
            raw_info.codec_sel = 'H265';
        } else if (raw_info.descr.match(/Video[\s\S]*?Format.*?AVC/i)) {
            raw_info.codec_sel = 'H264';
        } else if (raw_info.descr.match(/XviD/i)) {
            raw_info.codec_sel = 'XVID';
        } else if (raw_info.descr.match(/DivX/i)) {
            raw_info.codec_sel = 'DIVX';
        } else if (raw_info.descr.match(/Video[\s\S]*?Format.*?MPEG Video[\s\S]{1,10}Format Version.*?Version 4/i)) {
            raw_info.codec_sel = 'MPEG-4';
        } else if (raw_info.descr.match(/Video[\s\S]*?Format.*?MPEG Video[\s\S]{1,10}Format Version.*?Version 2/i)) {
            raw_info.codec_sel = 'MPEG-2';
        }
    }
    // 保存缓存
    fs.writeFileSync(cachePath, JSON.stringify(raw_info))

    return raw_info;
}

export function run() {

}

export function auto_feed() {

}
