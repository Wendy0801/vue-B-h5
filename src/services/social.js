// 第三方分享和登陆
var env = process.env.NODE_ENV
var wxShareSignUrl = ''
if (env === 'development') {
    wxShareSignUrl = 'http://testsmi.assets.smi170.com/communication/wx/getWXShare'
}
else if (env === 'production') {
    // wxShareSignUrl = 'http://10049.smi170.com/communication/wx/getWXShare'
    wxShareSignUrl = 'http://testws.xingmeihui.com/smiweb/api/wx/getWXShare'
}
const WX_SHARE_SIGNURL = wxShareSignUrl

import api from '@/services/api';
import cookie from '@/services/cookie'

window['wxVerify'] = false; // 微信是否通过验证,可以调用jssdk
const jsApiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'onMenuShareQZone',
    'hideMenuItems',
    'showMenuItems',
    'startRecord',
    'stopRecord',
    'onVoiceRecordEnd',
    'playVoice',
    'onVoicePlayEnd',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'previewImage',
    'scanQRCode'
];

const social = {
    init() {
        var _sdkScriipt = document.createElement('script');
        _sdkScriipt.src = 'http://m.fans.smi170.com/static/lib/jweixin-1.0.0.js';
        document.body.appendChild(_sdkScriipt);
        _sdkScriipt.onload = () => {
            this.verify();
        }
    },
    getChannelType: function () {
        var fromType = '';
        var origin = location.origin
        if (origin === 'http://xmlife.smi170.com') {
            fromType = 'SMI_LIFE'
        }
        else {
            fromType = 'SMI_COMMUNICATION'
        }
        return fromType
    },
    verify: function () {
        if (!wxVerify) {
            let link = encodeURIComponent(window.location.href.split('#')[0]);
            api.post({
                'ext': WX_SHARE_SIGNURL,
                'appId': this.getChannelType(),
                'url': link,
            }).then(res => {
                // alert('配置微信分享')
                window['wx'].config({
                    'debug': false,
                    'appId': res.entity.appid,
                    'timestamp': res.entity.timestamp,
                    'nonceStr': res.entity.nonceStr,
                    'signature': res.entity.signature,
                    'jsApiList': jsApiList
                });

                window['wx'].ready(function () {
                    window['wxVerify'] = true;
                });

                window['wx'].error(function (res) {
                    console.log('验证失败')
                    window['wxVerify'] = false;
                });
            })
                .catch(error => {
                    console.log(error)
                    console.log('出错了')
                })
        }
    },
    shareConfig: function (data) {
        let type = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"]; // 默认需要设置的分享类别
        // console.log(cookie)
        // cookie.set({
        //     type:'SMI_COMMUNICATION'
        // })
        var fromType = '';
        if (window.location.href.indexOf('type') > -1) {
            fromType = wxCommon.getQueryStringRegExp('type').split('#')[0];
        } else if (window.location.href.indexOf('state') > -1) {
            fromType = wxCommon.getQueryStringRegExp('state').split('#')[0];
        } else {
            fromType = cookie.get('type') || 'SMI_COMMUNICATION';
        }
        data.link = data.link + '?type=' + this.getChannelType()

        if (window.wx) {  // 微信 分享
            console.log(data)
            window['wx'].ready(function () {
                for (let attr of type) {
                    window['wx'][attr](data);
                }
            });
        }
        if (window.setShareInfo) {  // qq 分享
            window.setShareInfo({
                title: data.title,
                summary: data.desc,
                pic: data.imgUrl,
                url: data.link
            });
        }
    },
    scanQrCode(type = 1) {
        return new Promise((resolve, reject) => {
            if(!window.wx){
                reject('微信扫码调起失败')
            }
            window['wx'].scanQRCode({
                needResult: type, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
                success: function (res) {
                    resolve(res.resultStr)
                    // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                }
            });
        })
    },
    signService: function () { },
    // 查看图片
    previewImage(pCurrent, pUrls) {
        window['wx'].previewImage({
            'current': pCurrent, // 当前显示图片的http链接
            'urls': pUrls // 需要预览的图片http链接列表
        });
    }
}

export default social
