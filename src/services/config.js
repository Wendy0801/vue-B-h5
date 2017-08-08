let reqUrl = ''
var env = process.env.NODE_ENV


const VERSION = 'V1'
if (env === 'development') { // 本地调试接口
  // reqUrl = `http://192.168.68.23:33002/api-shop/${VERSION}/`
  // reqUrl = `http://192.168.23.231:33002/api-shop/${VERSION}/`
  reqUrl = `http://192.168.68.25:33002/api-shop/${VERSION}/`
}
else if (env === 'production') {  // 线上接口
  reqUrl = `http://192.168.68.25:33002/api-shop/${VERSION}/`
  // reqUrl = `http://192.168.68.23:33002/api-shop/${VERSION}/`
}

export const API_ROOT = reqUrl
export const CONTENT_TYPE = 'application/x-www-form-urlencoded'
