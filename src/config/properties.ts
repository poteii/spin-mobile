//url สำหรับยิงไป server
export const URL = 'http://10.1.87.2:8081/';

//default ต่างๆที่ใช้ในระบบ เกี่ยวกับ auth
export const Default = {
    USR: btoa('spin:username'),
    PWD: btoa('spin:password'),
    RMB: btoa('spin:rememberme'),
    YES: btoa('spin:yes'),
    NO: btoa('spin:no'),
    ACTOKN: btoa('spin:access_token'),
    TOKNTY: btoa('spin:token_type'),
    RFTOKN: btoa('spin:refresh_token'),
    RFPWD: btoa('spin:refresh_pwd')
}

//สถานะแสดงการทำงาน
export const Status = {
    SUCCESS: 'success',
    ERROR: 'error'
}

//intial ภาษาของโปรแกรม
export var Locale = 'th'

//format เกี่ยวกับ ปฏิทิน
export const Format = {
    DATE_DB: 'YYYYMMDD',
    DATE_PIK: 'dd/mm/yy',
    DATE_PIKC: 'DD MMMM',
    DATE_PIKR: 'MMDD',
    DDDD: 'dddd',
    DD: 'DD',
    MMMM: 'MMMM',
    MMM: 'MMM',
    MM: 'MM',
    YYYY: 'YYYY',
}