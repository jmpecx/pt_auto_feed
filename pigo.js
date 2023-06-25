import axios from "axios";
import {fileFromPath} from 'formdata-node/file-from-path'
import * as fs from 'node:fs'
import axiosRetry from 'axios-retry';

import * as https from 'https'

const pgApi = axios.create({
    baseURL: 'https://piggo.me/',
    // 禁止重定向
    maxRedirects:0,
    // timeout: 1000,
    headers: {'Cookie': ''},
});
axiosRetry(pgApi, {retries: 7});

const typeMap = {
    'Movies': '401',
    'Documentaries': '404',
    'Animations': '405',
    'TV Series': '402',
    'TV Shows': '403',
    'Music Videos': '406',
    'Sports': '407',
    'Misc': '409',
    'HQ Audio': '408'

//     <option value="0">请选择</option>
//     <option value="401">电影</option>
//     <option value="404">纪录片</option>
//     <option value="405">动漫</option>
//     <option value="402">电视剧</option>
//     <option value="403">综艺</option>
//     <option value="406">MV</option>
//     <option value="407">体育</option>
//     <option value="409">其他</option>
//     <option value="408">音乐</option>
//     <option value="912">有声</option>
// </select>
}
const sourceMap = {
    "Blu-ray": "1",
    "HD DVD": "2",
    "DVD": "3",
    "HDTV": "4",
    "TV": "5",
    "Other": "6",
    "WEB-DL": "7",
    "UHD Blu-ray": "8",
    "Netflix": "9",
    "WEBRip": "10",
}
const teamMap = {
    HDS: 1,
    CHD: 2,
    MySiLU: 3,
    WiKi: 4,
    Other: 5,
    CMCT: 6,
    PigoHD: 7,
    PigoWeb: 8,
    PigoNF: 9,
    PigoAD: 10,
    BeiTai: '11',
}
const mediumMap = {
    "Blu-ray": "1",
    "DVD": "2",
    "Remux": "3",
    "MiniBD": "4",
    "HDTV": "5",
    "DVDR": "6",
    "Encode": "7",
    "CD": "8",
    "Track": "9",
    "UHD": "10",
}

const encodeMap = {
    "H264": "1",
    "X264": "1",
    "VC-1": "2",
    "XVID": "3",
    "MPEG-2": "4",
    "Other": "5",
    "X.265": "6",
    "H.265": "6",
}

const audiocodecMap = {
    "FLAC": "1",
    "APE": "2",
    "DTS": "3",
    "MP3": "4",
    "OGG": "5",
    "AAC": "6",
    "Other": "7",
    "AC3": "8",
    "DTS-HDMA": "9",
    "TrueHD": "10",
    "LPCM": "11",
}
const standardMap = {
    "1080p": "1",
    "1080i": "2",
    "720p": "3",
    "4K": "5",
    "8K": "6",
}

const processingMap = {
    "SDR": "1",
    "HDR10": "2",
    "HDR10+": "3",
    "db": "4",
}

function get_label(my_string) {
    var name = my_string.split('#seperator#')[0];
    var labels = {
        'gy': false,
        'yy': false,
        'zz': false,
        'diy': false,
        'hdr10': false,
        'db': false,
        'hdr10plus': false,
        'yz': false
    };

    if (my_string.match(/([简繁].{0,12}字幕|[简繁中].{0,3}字|DIY.{1,5}字|内封.{0,3}[繁中字])|(Text.*?#\d+[\s\S]*?Chinese|subtitles.*chs|subtitles.*mandarin|subtitle.*chinese)/i)) {
        labels.zz = true;
    }
    if (my_string.match(/(英.{0,12}字幕|英.{0,3}字|内封.{0,3}英.{0,3}字)|(Text.*?#\d+[\s\S]*?English|subtitles.*eng|subtitle.*english)/i)) {
        labels.yz = true;
    }

    if (my_string.match(/([^多]国.{0,3}语|国.{0,3}配|台.{0,3}语|台.{0,3}配)|(Audio.*Chinese|Audio.*mandarin)/i)) {
        var sub_str = my_string.match(/([^多]国.{0,3}语|国.{0,3}配|台.{0,3}语|台.{0,3}配)|(Audio.*Chinese|Audio.*mandarin)/i)[0];
        if (!sub_str.match(/国家/)) {
            labels.gy = true;
        }
    }
    if (my_string.match(/(粤.{0,3}语|粤.{0,3}配|Audio.*cantonese)/i)) {
        labels.yy = true;
    }
    if (name.match(/DIY|-.*?@(MTeam|CHDBits|HDHome|OurBits|HDChina|Language|TTG|Pter|HDSky|Audies|CMCT|Dream|Audies)/i)) {
        labels.diy = true;
    }
    if (my_string.match(/HDR10\+/)) {
        labels.hdr10plus = true;
    } else if (my_string.match(/HDR10/)) {
        labels.hdr10 = true;
    }
    if (my_string.match(/Dolby Vision|杜比视界/i)) {
        labels.db = true;
    }


    return labels;
};

function getTagByDesc(raw_info) {
    const ret = [];
    const label_str = raw_info.small_descr + raw_info.name + '#seperator#' + raw_info.descr + raw_info.full_mediainfo;
    const labels = get_label(label_str);
    if (raw_info.descr.match(/◎语.*?言\s*汉语普通话/)) {
        // 国语
        // ret.push(5);
        labels.gy = true;
    }
    if (raw_info.name.match(/(x|H)(264|265)/i)) {
        labels.diy = false;
    }
    if ((raw_info.name.match(/S\d+/) && !raw_info.name.match(/S\d+E\d+/)) || (raw_info.name.match(/Complete/i) && raw_info.type == '剧集')) {
        // 完结
        labels.complete = true;
    } else {
        labels.complete = false;
    }
    if (raw_info.descr.match(/Presentation Graphics.*Chinese/)) {
        labels.zz = true;
    }
    if (labels.diy) {
        ret.push(4);
    }
    if (labels.zz) {
        ret.push(6)
    }
    if (labels.yy) {
        // 粤语不处理
        // ret.push()
    }
    if (labels.yz) {
        // 英语不处理
    }
    if (labels.gy) {
        // 国语
        ret.push(5)
    }
    if (labels.complete) {
        ret.push(13);
    }
    if (labels.db) {
        // 杜比世界
        ret.push(9)
        raw_info.processing_sel = 'db'
    }
    if (labels.hdr10) {
        ret.push(7)
        raw_info.processing_sel = 'HDR10'
    }
    if (labels.hdr10plus) {
        ret.push(7)
        raw_info.processing_sel = 'HDR10+'
    }
    if (raw_info.descr.match(/SDR/i) && raw_info.standard_sel === '4K') {
        raw_info.processing_sel = 'SDR'
    }
    // 统一添加 beitai
    ret.push(22);
    return ret
}

function tryUpdateDesc(rawInfo) {
    // 如果里面包含裂的图，就重新下载
    const desc = rawInfo.descr;
}
export async function publish(rawInfo) {
    // console.log(rawInfo)
    // 根据rowInfo，构建payload
    const data =
        {
            file: fs.createReadStream(rawInfo.torrent_url),
            name: rawInfo.name, small_descr: rawInfo.small_descr,
            descr: rawInfo.descr,
            type: rawInfo.type ? typeMap[rawInfo.type] ?? '' : '',
            'source_sel[4]': rawInfo.source_sel ? sourceMap[rawInfo.codec_sel] ?? '0' : '0',
            'medium_sel[4]': rawInfo.medium_sel ? mediumMap[rawInfo.medium_sel] ?? '0' : '0',
            'codec_sel[4]': rawInfo.codec_sel ? encodeMap[rawInfo.codec_sel] ?? '5' : '5',
            'audiocodec_sel[4]': rawInfo.audiocodec_sel ? audiocodecMap[rawInfo.audiocodec_sel] ?? '7' : '7',
            'standard_sel[4]': rawInfo.standard_sel ? standardMap[rawInfo.standard_sel] ?? '0' : '0',
            'team_sel[4]': rawInfo.team_sel ? teamMap[rawInfo.team_sel] ?? '0' : '0',
            'processing_sel[4]': rawInfo.processing_sel ? processingMap[rawInfo.processing_sel] ?? '0' : '0',
            'tags[4]': getTagByDesc(rawInfo),
            url: rawInfo.url,
            pt_gen: rawInfo.dburl,
            //         'uplver': 'yes', // 匿名发布,
            //         small_descr:'',
            //         url:'',
            // pt_gen:'',
            //     price:'',
            //         color: 0,
            // font: 0,
            // size: 0,
            // descr: '11',
            technical_info: rawInfo.full_mediainfo,
            //         type: 401,
            // 'source_sel[4]': 0,
            // 'medium_sel[4]': 0,
            // 'codec_sel[4]': 0,
            // "audiocodec_sel[4]": 0,
            // "standard_sel[4]": 0,
            // "team_sel[4]": 0,
            // "processing_sel[4]": 0,
            // "source_sel[5]": 0,
            // "medium_sel[5]": 0,
            // "codec_sel[5]": 0,
            // "audiocodec_sel[5]": 0,
            // "standard_sel[5]": 0,
            // "team_sel[5]": 0,
            // "processing_sel[5]": 0,
            // "pos_state": 'normal',
            // pos_state_until:
            //     uplver: yes
        }
// console.log(data)
    return await pgApi.post('takeupload.php', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}
