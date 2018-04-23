//url สำหรับยิงไป server
//export const URL = 'http://172.17.3.49:8080/spin/';
export const URL = 'http://10.1.87.224:9090/spin-s/';

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

export let WorkingTime = [0, 30, 100, 130, 200, 230, 300, 330, 400, 430, 500, 530, 600, 630, 700, 730, 800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200, 1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630, 1700, 1730, 1800, 1830, 1900, 1930, 2000, 2030, 2100, 2130, 2200, 2230, 2300, 2330]
