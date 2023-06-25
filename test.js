import * as cheerio from 'cheerio';
import {walkDOM} from "./utils/html2Ubb.js";
import {JSDOM}  from 'jsdom'
import {getBasicInfo} from "./utils/getBasicInfo.js";


function main(){
    const html = `<html xmlns="http://www.w3.org/1999/xhtml"><head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="generator" content="NexusPHP">
<title>备胎 :: 种子详情 "Lifeforce 1985 BluRay 2160p TrueHD Atmos 7 1 x265.10bit HDR-BeiTai" - Powered by NexusPHP</title>
<link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
<link rel="search" type="application/opensearchdescription+xml" title="备胎 Torrents" href="opensearch.php">
<link rel="stylesheet" href="styles/mediumfont.css" type="text/css">
<link rel="stylesheet" href="styles/sprites.css" type="text/css">
<link rel="stylesheet" href="pic/forum_pic/chs/forumsprites.css" type="text/css">
<link rel="stylesheet" href="styles/BlueGene/theme.css" type="text/css">
<link rel="stylesheet" href="styles/BlueGene/DomTT.css" type="text/css">
<link rel="stylesheet" href="styles/curtain_imageresizer.css" type="text/css">
<link rel="stylesheet" href="pic/category/chd/scenetorrents/catsprites.css" type="text/css">
<link rel="alternate" type="application/rss+xml" title="Latest Torrents" href="torrentrss.php">
<script type="text/javascript" src="curtain_imageresizer.js"></script><style type="text/css">body {overflow-y:scroll;}</style>
<script type="text/javascript" src="ajaxbasic.js"></script>
<script type="text/javascript" src="common.js"></script>
<script type="text/javascript" src="domLib.js"></script>
<script type="text/javascript" src="domTT.js"></script>
<script type="text/javascript" src="domTT_drag.js"></script>
<script type="text/javascript" src="fadomatic.js"></script>
</head>
<body>
<table class="head" cellspacing="0" cellpadding="0" align="center">
\t<tbody><tr>
\t\t<td class="clear">
\t\t\t<div class="logo">备胎</div>
\t\t\t<div class="slogan">The Ultimate File Sharing Experience</div>
\t\t</td>
\t\t<td class="clear nowrap" align="right" valign="middle">
\t\t</td>
\t</tr>
</tbody></table>

<table class="mainouter" width="982" cellspacing="0" cellpadding="5" align="center">
\t<tbody><tr><td id="nav_block" class="text" align="center">
<table class="main" width="940" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="embedded"><div id="nav"><ul id="mainmenu" class="menu"><li><a href="index.php">&nbsp;首&nbsp;&nbsp;页&nbsp;</a></li><li><a href="forums.php">&nbsp;论&nbsp;&nbsp;坛&nbsp;</a></li><li><a href="torrents.php">&nbsp;种&nbsp;&nbsp;子&nbsp;</a></li><li><a href="offers.php">&nbsp;候&nbsp;&nbsp;选&nbsp;</a></li><li><a href="upload.php">&nbsp;发&nbsp;&nbsp;布&nbsp;</a></li><li><a href="subtitles.php">&nbsp;字&nbsp;&nbsp;幕&nbsp;</a></li><li><a href="usercp.php">&nbsp;控制面板&nbsp;</a></li><li><a href="topten.php">排&nbsp;行&nbsp;榜</a></li><li><a href="log.php">&nbsp;日&nbsp;&nbsp;志&nbsp;</a></li><li><a href="rules.php">&nbsp;规&nbsp;&nbsp;则&nbsp;</a></li><li><a href="faq.php">&nbsp;常见问题&nbsp;</a></li><li><a href="staff.php">管&nbsp;理&nbsp;组</a></li></ul></div></td></tr></tbody></table>

<table id="info_block" cellpadding="4" cellspacing="0" border="0" width="100%"><tbody><tr>
\t<td><table width="100%" cellspacing="0" cellpadding="0" border="0"><tbody><tr>
\t\t<td class="bottom" align="left"><span class="medium">欢迎回来, <span class="nowrap"><a href="userdetails.php?id=20748" class="ExtremeUser_Name"><b>xqw8889</b></a></span>  [<a href="logout.php">退出</a>]  [<a href="torrents.php?inclbookmarked=1&amp;allsec=1&amp;incldead=0">收藏</a>] <font class="color_bonus">魔力值 </font>[<a href="mybonus.php">使用</a>]: 977,691.2 <font class="color_invite">邀请 </font>[<a href="invite.php?id=20748">发送</a>]: 19<br>

\t<font class="color_ratio">分享率：</font> 5.988  <font class="color_uploaded">上传量：</font> 6.721 TB<font class="color_downloaded"> 下载量：</font> 1.122 TB  <font class="color_active">当前活动：</font> <img class="arrowup" alt="Torrents seeding" title="当前做种" src="pic/trans.gif">1  <img class="arrowdown" alt="Torrents leeching" title="当前下载" src="pic/trans.gif">0&nbsp;&nbsp;<font class="color_connectable">可连接：</font><b><font color="green">是</font></b> <font class="color_slots">连接数：</font>无限制</span></td>

\t<td class="bottom" align="right"><span class="medium">当前时间：12:59<br>

<a href="messages.php"><img class="inbox" src="pic/trans.gif" alt="inbox" title="收件箱&nbsp;(无新短讯)"></a> 4 (0 新)  <a href="messages.php?action=viewmailbox&amp;box=-1"><img class="sentbox" alt="sentbox" title="发件箱" src="pic/trans.gif"></a> 2 <a href="friends.php"><img class="buddylist" alt="Buddylist" title="社交名单" src="pic/trans.gif"></a> <a href="getrss.php"><img class="rss" alt="RSS" title="获取RSS" src="pic/trans.gif"></a>
\t</span></td>
\t</tr></tbody></table></td>
</tr></tbody></table>

</td></tr>

<tr><td id="outer" align="center" class="outer" style="padding-top: 20px; padding-bottom: 20px">
<h1 align="center" id="top">Lifeforce 1985 BluRay 2160p TrueHD Atmos 7 1 x265.10bit HDR-BeiTai&nbsp;&nbsp;&nbsp; <b>[<font class="twoupfree">2X免费</font>]</b></h1>
<table width="940" cellspacing="0" cellpadding="5">
<tbody><tr><td class="rowhead" width="13%">下载</td><td class="rowfollow" width="87%" align="left"><a class="index" href="download.php?id=6113">[BeiTAI].Lifeforce.1985.BluRay.2160p.TrueHD.Atmos.7.1.x265.10bit.HDR-BeiTai.torrent</a>&nbsp;&nbsp;<a id="bookmark0" href="javascript: bookmark(6113,0);"><img class="delbookmark" src="pic/trans.gif" alt="Unbookmarked" title="收藏"></a>&nbsp;&nbsp;&nbsp;由&nbsp;<i>匿名</i>发布于<span title="2023-06-05 19:22:23">15天17时前</span></td></tr><tr><td class="rowhead nowrap" valign="top" align="right">副标题</td><td class="rowfollow" valign="top" align="left">宇宙天魔  英语TrueHD7.1/英简繁双语SUP字幕/章节</td></tr>
<tr><td class="rowhead nowrap" valign="top" align="right">基本信息</td><td class="rowfollow" valign="top" align="left"><b><b>大小：</b></b>23.83 GB&nbsp;&nbsp;&nbsp;<b>类型:</b>&nbsp;Movies&nbsp;&nbsp;&nbsp;<b>媒介:&nbsp;</b>Encode&nbsp;&nbsp;&nbsp;<b>编码:&nbsp;</b>Other&nbsp;&nbsp;&nbsp;<b>制作组:&nbsp;</b>BeiTai</td></tr>
<tr><td class="rowhead nowrap" valign="top" align="right">行为</td><td class="rowfollow" valign="top" align="left"><a title="下载种子" href="download.php?id=6113"><img class="dt_download" src="pic/trans.gif" alt="download">&nbsp;<b><font class="small">下载种子</font></b></a>&nbsp;|&nbsp;<a title="举报该种子违反了规则" href="report.php?torrent=6113"><img class="dt_report" src="pic/trans.gif" alt="report">&nbsp;<b><font class="small">举报种子</font></b></a></td></tr>
<tr><td class="rowhead nowrap" valign="top" align="right">下载链接</td><td class="rowfollow" valign="top" align="left"><a href="https://www.beitai.pt/download.php?id=6113&amp;passkey=ad1d550994d21025dab59b95207d3483">https://www.beitai.pt/download.php?id=6113 [右键复制，已隐藏passkey]</a></td></tr>
<tr><td class="rowhead" valign="top">字幕</td><td class="rowfollow" align="left" valign="top"><table border="0" cellspacing="0"><tbody><tr><td class="embedded">该种子暂无字幕</td></tr></tbody></table><table border="0" cellspacing="0"><tbody><tr><td class="embedded"><form method="post" action="subtitles.php"><input type="hidden" name="torrent_name" value="Lifeforce 1985 BluRay 2160p TrueHD Atmos 7 1 x265.10bit HDR-BeiTai"><input type="hidden" name="detail_torrent_id" value="6113"><input type="hidden" name="in_detail" value="in_detail"><input type="submit" value="上传字幕"></form></td><td class="embedded"><form method="get" action="http://shooter.cn/sub/" target="_blank"><input type="text" name="searchword" id="keyword" style="width: 250px" value=""><input type="submit" value="搜索射手网"></form></td><td class="embedded"><form method="get" action="http://www.opensubtitles.org/en/search2/" target="_blank"><input type="hidden" id="moviename" name="MovieName"><input type="hidden" name="action" value="search"><input type="hidden" name="SubLanguageID" value="all"><input onclick="document.getElementById('moviename').value=document.getElementById('keyword').value;" type="submit" value="搜索Opensubtitles"></form></td>
</tr></tbody></table></td></tr>
<tr><td class="rowhead nowrap" valign="top" align="right"><a href="javascript: klappe_news('descr')"><span class="nowrap"><img class="minus" src="pic/trans.gif" alt="Show/Hide" id="picdescr" title=""> 简介</span></a></td><td class="rowfollow" valign="top" align="left"><div id="kdescr"> <img alt="image" src=" https://iili.io/H4nvz9n.jpg " onload="Scale(this,700,0);" onclick="Preview(this);" height="880" width="700"><br>
<br>
◎译　　名　宇宙天魔/崩裂的地球/撕裂的地球<br>
◎片　　名　Lifeforce<br>
◎年　　代　1985<br>
◎产　　地　英国<br>
◎类　　别　科幻/惊悚/恐怖<br>
◎语　　言　英语<br>
◎上映日期　1985-06-21<br>
◎IMDb评分 &nbsp;6.1/10 from 27155 users<br>
◎IMDb链接 &nbsp;<a class="faqlink" href="https://www.imdb.com/title/tt0089489/">https://www.imdb.com/title/tt0089489/</a><br>
◎豆瓣评分　6.3/10 from 2176 users<br>
◎豆瓣链接　<a class="faqlink" href="https://douban.com/subject/1300305/">https://douban.com/subject/1300305/</a><br>
◎片　　长　116 分钟<br>
◎导　　演　托比·霍珀 Tobe Hooper<br>
◎编　　剧　科林·威尔逊 Colin Wilson / 丹·欧班农 Dan O'Bannon / 唐·雅各比 Don Jakoby / 迈克尔·阿姆斯特朗 Michael Armstrong / Olaf Pooley Olaf Pooley<br>
◎主　　演　Nicholas Ball Nicholas Ball<br>
　　　　 &nbsp;　帕特里克·乔丹 Patrick Jordan<br>
　　　　 &nbsp;　史蒂夫·雷尔斯巴克 Steve Railsback<br>
　　　　 &nbsp;　彼得·弗斯 Peter Firth<br>
　　　　 &nbsp;　约翰·拉尔奎特 John Larroquette<br>
　　　　 &nbsp;　德里克·本菲尔德 Derek Benfield<br>
　　　　 &nbsp;　奥布里·莫里斯 Aubrey Morris<br>
　　　　 &nbsp;　弗兰克·芬莱 Frank Finlay<br>
　　　　 &nbsp;　玛蒂尔达·梅 Mathilda May<br>
　　　　 &nbsp;　帕特里克·康纳 Patrick Connor<br>
　　　　 &nbsp;　朱利安·弗思 Julian Firth<br>
　　　　 &nbsp;　Peter Porteous Peter Porteous<br>
　　　　 &nbsp;　Ken Parry Ken Parry<br>
　　　　 &nbsp;　卡瑟琳·斯科菲尔德 Katherine Schofield<br>
　　　　 &nbsp;　艾玛雅各布丝 Emma Jacobs<br>
　　　　 &nbsp;　Sidney Kean Sidney Kean<br>
　　　　 &nbsp;　克里斯·苏利文 Chris Sullivan<br>
　　　　 &nbsp;　提普·蒂平 Tip Tipping<br>
　　　　 &nbsp;　杰罗姆·威利斯 Jerome Willis<br>
　　　　 &nbsp;　John Woodnutt John Woodnutt<br>
　　　　 &nbsp;　Owen Holder Owen Holder<br>
　　　　 &nbsp;　Ian Cashmore Ian Cashmore<br>
　　　　 &nbsp;　John Golightly John Golightly<br>
　　　　 &nbsp;　迈克尔·戈特哈德 Michael Gothard<br>
　　　　 &nbsp;　John Hallam John Hallam<br>
　　　　 &nbsp;　Edward Evans Edward Evans<br>
　　　　 &nbsp;　Geoffrey Frederick Geoffrey Frederick<br>
　　　　 &nbsp;　John Forbes-Robertson John Forbes-Robertson<br>
　　　　 &nbsp;　帕特里克·斯图尔特 Patrick Stewart<br>
<br>
◎简　　介<br>
<br>
　　<br>
　　宇宙飞船邱吉尔号接近哈雷彗星，欲探知其内部构造。船长汤姆•卡尔森（Steve Railsback 饰）带领一组队员走出船舱，发现彗星内部藏有一艘废弃的飞船，内有多具奇怪生物的干尸以及三个沉睡在水晶棺内的人类。为解开其中奥秘，汤姆下令将他们带回飞船。<br>
　　<br>
　　三十天后，空无一人的邱吉尔号飞临地球，航天总署派出哥伦比亚号与之对接。宇航员在船中发现焚烧的痕迹和那三个沉睡之人，而机组成员全部死亡。回到地球后，三个人中的女性（Mathilda May 饰）突然苏醒，吸取了年轻守卫的精气。之后守卫变成干尸，并最终风化。不久其他两人苏醒，似乎一场灾难正降临地球……<br>
　　<br>
<font face="Lucida Console"><fieldset><legend> 引用 </legend><br>[RELEASE INFORMATION]<br>
RELEASE.NAME...: Lifeforce.1985.BluRay.2160p.TrueHD.Atmos.7.1.x265.10bit.HDR-BeiTai.mkv<br>
RELEASE.TIME...: Jun 5 2023<br>
IMDB.LINK......: <a class="faqlink" href="https://www.imdb.com/title/tt0089489/">https://www.imdb.com/title/tt0089489/</a><br>
IMDB.RATING....: 6.1/10 27K<br>
GENRE..........: Action, Horror, Mystery<br>
RUN.TIME.......: 1:41:33.708 (h:m:s.ms)<br>
VIDEO.CODEC....: HEVC, x265Main10@L5.1@High, 24 fps<br>
x264 LOG.......: Ref=4, B-frame=8, crf=23.5<br>
BIT.RATE.......: 28442 kbps, 23.8 GB <br>
RESOLUTION.....: 3840 x 1634, 2.350: 1<br>
AUDIO1.........: English Dolby TrueHD 7.1 (Atmos) @ 5003 kbps<br>
AUDIO2.........: English Dolby 5.1-EX 5.1 @ 640 kbps<br>
CHAPTERS.......: YES <br>
SUBTiTLES1.....: Eng/SUP <br>
SUBTiTLES2.....: Chs/SUP &nbsp;简体<br>
SUBTiTLES3.....: Cht/SUP &nbsp;繁体<br>
RIP.SOURCE.....: Lifeforce.1985.2160p.UHD.Blu-ray.HEVC.Atmos.TrueHD.7.1-DiY@HDHome<br>
ENCODER........: anonymous<br>
<br>
---[Information] [2023/6/5 7:59:43] x265 [info]: frame I: &nbsp; &nbsp;910, Avg QP:25.66 &nbsp;kb/s: 43188.19<br>
---[Information] [2023/6/5 7:59:43] x265 [info]: frame P: &nbsp;23456, Avg QP:26.32 &nbsp;kb/s: 37794.39<br>
---[Information] [2023/6/5 7:59:43] x265 [info]: frame B: 121883, Avg QP:28.65 &nbsp;kb/s: 26525.81 </fieldset><br></font><br>
<br>
<img alt="image" src=" https://iili.io/H4nUKnj.jpg " onload="Scale(this,700,0);" onclick="Preview(this);" height="2748" width="700"><br>
</div></td></tr>
<tr><td class="rowhead nowrap" valign="top" align="right">种子文件</td><td class="rowfollow" valign="top" align="left"><table><tbody><tr><td class="no_border_wide"><b>文件数：</b>1个文件<br><span id="showfl"><a href="javascript: viewfilelist(6113)">[查看列表]</a></span><span id="hidefl" style="display: none;"><a href="javascript: hidefilelist()">[隐藏列表]</a></span></td><td class="no_border_wide"><b>Hash码:</b>&nbsp;b8a258f6cb85c1b011711f70e71924a349ed27a4</td></tr></tbody></table><span id="filelist"></span></td></tr>
<tr><td class="rowhead nowrap" valign="top" align="right">热度表</td><td class="rowfollow" valign="top" align="left"><table><tbody><tr><td class="no_border_wide"><b>查看: </b>494</td><td class="no_border_wide"><b>点击: </b>641</td><td class="no_border_wide"><b><b>完成:</b> </b><a href="viewsnatches.php?id=6113"><b>465</b>次</a> &lt;--- 点击查看完成详情</td><td class="no_border_wide"><b>最近活动：</b><span title="2023-06-21 12:59:15">&lt; 1分前</span></td></tr></tbody></table></td></tr>
<tr><td class="rowhead nowrap" valign="top" align="right"><span id="seeders"></span><span id="leechers"></span>同伴<br><span id="showpeer"><a href="javascript: viewpeerlist(6113);" class="sublink">[查看列表]</a></span><span id="hidepeer" style="display: none;"><a href="javascript: hidepeerlist();" class="sublink">[隐藏列表]</a></span></td><td class="rowfollow" valign="top" align="left"><div id="peercount"><b>110个做种者</b> | <b>2个下载者</b></div><div id="peerlist"></div></td></tr>
<tr><td class="rowhead nowrap" valign="top" align="right">感谢者</td><td class="rowfollow" valign="top" align="left"><span id="thanksadded" style="display: none;"><input class="btn" type="button" value="感谢表示成功！" disabled="disabled"></span><span id="curuser" style="display: none;"><span class="nowrap"><a href="userdetails.php?id=20748" class="ExtremeUser_Name"><b>xqw8889</b></a></span> </span><span id="thanksbutton"><input class="btn" type="button" id="saythanks" onclick="saythanks(6113);" value="&nbsp;&nbsp;说谢谢&nbsp;&nbsp;"></span>&nbsp;&nbsp;<span id="nothanks"></span><span id="addcuruser"></span><span class="nowrap"><a href="userdetails.php?id=23715" class="User_Name"><b>76165806</b></a></span> <span class="nowrap"><a href="userdetails.php?id=8017" class="InsaneUser_Name"><b>yayayi</b></a></span> <span class="nowrap"><a href="userdetails.php?id=11783" class="VIP_Name"><b>jjldf</b></a></span> <span class="nowrap"><a href="userdetails.php?id=16849" class="ExtremeUser_Name"><b>eden</b></a></span> <span class="nowrap"><a href="userdetails.php?id=8753" class="InsaneUser_Name"><b>bingpotulong</b></a></span> <span class="nowrap"><a href="userdetails.php?id=5511" class="User_Name"><b>skyvip1943</b></a></span> <span class="nowrap"><a href="userdetails.php?id=28131" class="User_Name"><b>njncdri</b></a></span> <span class="nowrap"><a href="userdetails.php?id=6473" class="CrazyUser_Name"><b>newtobt</b></a></span> <span class="nowrap"><a href="userdetails.php?id=20462" class="UltimateUser_Name"><b>mydzzHD</b></a></span> <span class="nowrap"><a href="userdetails.php?id=11919" class="ExtremeUser_Name"><b>junes</b></a></span> <span class="nowrap"><a href="userdetails.php?id=15985" class="UltimateUser_Name"><b>finalfans</b></a></span> <span class="nowrap"><a href="userdetails.php?id=9752" class="VeteranUser_Name"><b>548845550</b></a></span> <span class="nowrap"><a href="userdetails.php?id=21047" class="User_Name"><b>wayen</b></a></span> <span class="nowrap"><a href="userdetails.php?id=1791" class="ExtremeUser_Name"><b>fabregas2</b></a></span> <span class="nowrap"><a href="userdetails.php?id=28225" class="User_Name"><b>f10555</b></a></span> </td></tr>
</tbody></table>
<br><br><h1 align="center" id="startcomments">用户评论</h1>
<p align="center"><font class="gray"><b title="Alt+Pageup">&lt;&lt;&nbsp;上一页</b></font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font class="gray"><b title="Alt+Pagedown">下一页&nbsp;&gt;&gt;</b></font><br><font class="gray"><b>1&nbsp;-&nbsp;3</b></font></p>
<table class="main" width="940" border="0" cellspacing="0" cellpadding="0"><tbody><tr><td class="embedded"><table width="100%" border="1" cellspacing="0" cellpadding="10"><tbody><tr><td class="text">
<div style="margin-top: 8pt; margin-bottom: 8pt;"><table id="cid11033" border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td class="embedded" width="99%">#11033&nbsp;&nbsp;<font color="gray"></font><span class="nowrap"><a href="userdetails.php?id=15985" class="UltimateUser_Name"><b>finalfans</b></a> (<b class="UltimateUser_Name">Ultimate User</b></span>)&nbsp;&nbsp;<font color="gray"></font><span title="2023-06-05 20:37:08">15天16时前</span></td><td class="embedded nowrap" width="1%"><a href="#top"><img class="top" src="pic/trans.gif" alt="Top" title="Top"></a>&nbsp;&nbsp;</td></tr></tbody></table></div><table class="main" width="100%" border="0" cellspacing="0" cellpadding="5">
<tbody><tr>
<td class="rowfollow" width="150" valign="top" style="padding: 0px;"><img src="pic/default_avatar.png" alt="avatar" width="150px" onload="check_avatar(this, 'chs');"></td>
<td class="rowfollow" valign="top"><br>卧草，这片子竟然有UHD!!! 感谢感谢</td>
</tr>
<tr><td class="toolbox"> <img class="f_offline" src="pic/trans.gif" alt="Offline" title="不在线"><a href="sendmessage.php?receiver=15985"><img class="f_pm" src="pic/trans.gif" alt="PM" title="发短讯给finalfans"></a><a href="report.php?commentid=11033"><img class="f_report" src="pic/trans.gif" alt="Report" title="举报该评论"></a></td><td class="toolbox" align="right"><a href="comment.php?action=add&amp;sub=quote&amp;cid=11033&amp;pid=6113&amp;type=torrent"><img class="f_quote" src="pic/trans.gif" alt="Quote" title="引用"></a><a href="comment.php?action=add&amp;pid=6113&amp;type=torrent"><img class="f_reply" src="pic/trans.gif" alt="Add Reply" title="回复"></a></td></tr></tbody></table>
<div style="margin-top: 8pt; margin-bottom: 8pt;"><table id="cid11036" border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td class="embedded" width="99%">#11036&nbsp;&nbsp;<font color="gray"></font><span class="nowrap"><a href="userdetails.php?id=2409" class="InsaneUser_Name"><b>wingstro</b></a> (<b class="InsaneUser_Name">Insane User</b></span>)&nbsp;&nbsp;<font color="gray"></font><span title="2023-06-06 17:28:41">14天19时前</span></td><td class="embedded nowrap" width="1%"><a href="#top"><img class="top" src="pic/trans.gif" alt="Top" title="Top"></a>&nbsp;&nbsp;</td></tr></tbody></table></div><table class="main" width="100%" border="0" cellspacing="0" cellpadding="5">
<tbody><tr>
<td class="rowfollow" width="150" valign="top" style="padding: 0px;"><img src="pic/default_avatar.png" alt="avatar" width="150px" onload="check_avatar(this, 'chs');"></td>
<td class="rowfollow" valign="top"><br>真是有求必应，非常感谢！</td>
</tr>
<tr><td class="toolbox"> <img class="f_offline" src="pic/trans.gif" alt="Offline" title="不在线"><a href="sendmessage.php?receiver=2409"><img class="f_pm" src="pic/trans.gif" alt="PM" title="发短讯给wingstro"></a><a href="report.php?commentid=11036"><img class="f_report" src="pic/trans.gif" alt="Report" title="举报该评论"></a></td><td class="toolbox" align="right"><a href="comment.php?action=add&amp;sub=quote&amp;cid=11036&amp;pid=6113&amp;type=torrent"><img class="f_quote" src="pic/trans.gif" alt="Quote" title="引用"></a><a href="comment.php?action=add&amp;pid=6113&amp;type=torrent"><img class="f_reply" src="pic/trans.gif" alt="Add Reply" title="回复"></a></td></tr></tbody></table>
<div style="margin-top: 8pt; margin-bottom: 8pt;"><table id="cid11037" border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td class="embedded" width="99%">#11037&nbsp;&nbsp;<font color="gray"></font><span class="nowrap"><a href="userdetails.php?id=17921" class="UltimateUser_Name"><b>akiki2020</b></a> (<b class="UltimateUser_Name">Ultimate User</b></span>)&nbsp;&nbsp;<font color="gray"></font><span title="2023-06-06 20:29:57">14天16时前</span></td><td class="embedded nowrap" width="1%"><a href="#top"><img class="top" src="pic/trans.gif" alt="Top" title="Top"></a>&nbsp;&nbsp;</td></tr></tbody></table></div><table class="main" width="100%" border="0" cellspacing="0" cellpadding="5">
<tbody><tr>
<td class="rowfollow" width="150" valign="top" style="padding: 0px;"><img src="https://www.beitai.pt/bitbucket/7617-ivrxcew7136155.jpg" alt="avatar" width="150px" onload="check_avatar(this, 'chs');"></td>
<td class="rowfollow" valign="top"><br>1080p 有加長版</td>
</tr>
<tr><td class="toolbox"> <img class="f_offline" src="pic/trans.gif" alt="Offline" title="不在线"><a href="sendmessage.php?receiver=17921"><img class="f_pm" src="pic/trans.gif" alt="PM" title="发短讯给akiki2020"></a><a href="report.php?commentid=11037"><img class="f_report" src="pic/trans.gif" alt="Report" title="举报该评论"></a></td><td class="toolbox" align="right"><a href="comment.php?action=add&amp;sub=quote&amp;cid=11037&amp;pid=6113&amp;type=torrent"><img class="f_quote" src="pic/trans.gif" alt="Quote" title="引用"></a><a href="comment.php?action=add&amp;pid=6113&amp;type=torrent"><img class="f_reply" src="pic/trans.gif" alt="Add Reply" title="回复"></a></td></tr></tbody></table>
</td></tr></tbody></table>
</td></tr></tbody></table>
<p align="center"><font class="gray"><b>1&nbsp;-&nbsp;3</b></font><br><font class="gray"><b title="Alt+Pageup">&lt;&lt;&nbsp;上一页</b></font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font class="gray"><b title="Alt+Pagedown">下一页&nbsp;&gt;&gt;</b></font></p>
<br><br><table style="border:1px solid #000000;"><tbody><tr><td class="text" align="center"><b>快速评论</b><br><br><form id="compose" name="comment" method="post" action="comment.php?action=add&amp;type=torrent" onsubmit="return postvalid(this);"><input type="hidden" name="pid" value="6113"><br><textarea name="body" cols="100" rows="8" style="width: 450px" onkeydown="ctrlenter(event,'compose','qr')"></textarea><div align="center"><a href="javascript: SmileIT('[em4]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/4.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/4.gif" alt=""></a><a href="javascript: SmileIT('[em5]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/5.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/5.gif" alt=""></a><a href="javascript: SmileIT('[em39]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/39.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/39.gif" alt=""></a><a href="javascript: SmileIT('[em25]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/25.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/25.gif" alt=""></a><a href="javascript: SmileIT('[em11]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/11.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/11.gif" alt=""></a><a href="javascript: SmileIT('[em8]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/8.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/8.gif" alt=""></a><a href="javascript: SmileIT('[em10]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/10.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/10.gif" alt=""></a><a href="javascript: SmileIT('[em15]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/15.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/15.gif" alt=""></a><a href="javascript: SmileIT('[em27]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/27.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/27.gif" alt=""></a><a href="javascript: SmileIT('[em57]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/57.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/57.gif" alt=""></a><a href="javascript: SmileIT('[em42]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/42.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/42.gif" alt=""></a><a href="javascript: SmileIT('[em122]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/122.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/122.gif" alt=""></a><a href="javascript: SmileIT('[em52]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/52.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/52.gif" alt=""></a><a href="javascript: SmileIT('[em28]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/28.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/28.gif" alt=""></a><a href="javascript: SmileIT('[em29]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/29.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/29.gif" alt=""></a><a href="javascript: SmileIT('[em30]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/30.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/30.gif" alt=""></a><a href="javascript: SmileIT('[em176]','comment','body')" onmouseover="domTT_activate(this, event, 'content', '<table><tr><td><img src=\\'pic/smilies/176.gif\\' alt=\\'\\' /></td></tr></table>', 'trail', false, 'delay', 0,'lifetime',10000,'styleClass','smilies','maxWidth', 400);"><img style="max-width: 25px;" src="pic/smilies/176.gif" alt=""></a></div><br><input type="submit" id="qr" class="btn" value="&nbsp;&nbsp;添加&nbsp;&nbsp;"></form></td></tr></tbody></table><p align="center"><a class="index" href="comment.php?action=add&amp;pid=6113&amp;type=torrent">添加评论</a></p>
</td></tr></tbody></table><div id="footer"><div style="margin-top: 10px; margin-bottom: 30px;" align="center"> (c)  <a href="https://www.beitai.pt" target="_self">备胎</a> 2010-2023 Powered by <a href="aboutnexus.php">NexusPHP</a><br><br>[page created in <b> 0.007777 </b> sec with <b>20</b> db queries, <b>33</b> reads and <b>9</b> writes of memcached and <b>671.60 KB</b> ram]</div>
<div style="display: none;" id="lightbox" class="lightbox"></div><div style="display: none;" id="curtain" class="curtain"></div>
<script type="text/javascript">
//<![CDATA[
var maxpage=0;
var currentpage=0;
//]]>
</script>
</div></body></html>`
    const {window} = new JSDOM(html);
    const dom = window.document
    const n = dom.getElementById('kdescr');
    const raw_info = {
        descr: "",
    }
    const x = walkDOM(n,raw_info,'https://www.beitai.pt/details.php?id=6149&hit=1')
    getBasicInfo(html,raw_info)
    console.log(raw_info)
}

main();
