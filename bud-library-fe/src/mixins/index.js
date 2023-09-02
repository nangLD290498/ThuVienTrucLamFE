import axios from "axios";
// import { mapState } from 'vuex';
import { router } from '../router';
// import { store } from '../store';

export const showRequireLoginModal = () => {
    // reset info login
    // store.dispatch('Account/logout');

    // check if router is Admin then redirect to '/' not show login modal
    // if(router.currentRoute.matched.some(m => m.meta.requiresAdmin))
    //     router.push("/");
    // else
    if(document.getElementById("opn-require-login-modal-button"))
        document.getElementById("opn-require-login-modal-button").click();
    else {
        router.push("/");
    }
}

export const redirectToForbiddenPage = () => {
    router.push("/403");
}

export const displayStandardBookSize = (standardBookSize) => {
    if(standardBookSize)
        return standardBookSize.width + 'x' +  standardBookSize.height + '' + standardBookSize.unit_of_length;
    return '';
}

export const isset = (object) => {
    if (typeof object === "undefined" || object == null) {
        return false;
    }
    return true;
}

const host = window.location.protocol + "//" + window.location.host;

function getProvinces() {
    const provinces = localStorage.getItem("provinces");
    if (provinces) {
        try {
            return JSON.parse(provinces);
        } catch (e) {
        }
    }
}

async function fetchProvinces() {
    if (localStorage.getItem("provinces")) {
        try {
            return;
        } catch (e) {
        }
    }

    const fetch_url = `${host}/provinces?pagination=false`;
    await axios
        .get(fetch_url)
        .then((response) => {
            let provinces = response.data.data;
            localStorage.setItem("provinces", JSON.stringify(provinces));

            return provinces;
        })
        .finally(() => {});
}

function getDistricts() {
    const districts = localStorage.getItem("districts");
    if (districts) {
        try {
            return JSON.parse(districts);
        } catch (e) {
        }
    }

    return [];
}

async function fetchDistricts() {
    if (localStorage.getItem("districts")) {
        try {
            return;
        } catch (e) {
        }
    }

    const fetch_url = `${host}/districts?pagination=false`;
    await axios
        .get(fetch_url)
        .then((response) => {
            let districts = response.data.data;
            localStorage.setItem("districts", JSON.stringify(districts));

            return districts;
        })
        .finally(() => {});
}

function getCommunes() {
    const communes = localStorage.getItem("communes");
    if (communes) {
        try {
            return JSON.parse(communes);
        } catch (e) {
        }
    }

    return [];
}

async function fetchCommunes() {
    if (localStorage.getItem("communes")) {
        try {
            return;
        } catch (e) {
        }
    }

    const fetch_url = `${host}/communes?pagination=false`;
    await axios
        .get(fetch_url)
        .then((response) => {
            let communes = response.data.data;
            localStorage.setItem("communes", JSON.stringify(communes));

            return communes;
        })
        .finally(() => {});
}

async function fetchAddressInfos() {
    await fetchProvinces();
    await fetchDistricts();
    await fetchCommunes();
}

function number_format (number, decimals, dec_point, thousands_sep) {
    // Strip all characters but numerical ones.
    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function (n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function isNumeric(num){
    return !isNaN(num)
}

function round2Decimal(num) {
    return isNumeric(num) ? Math.round(num * 100) / 100 : 0;
}

function romanize (num) {
    if (isNaN(num))
        return NaN;
    var digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
            "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
            "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
    while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
    return Array(+digits.join("") + 1).join("M") + roman;
}

/**
 * Handle money
 *
 */

const ChuSo = new Array(" không ", " một ", " hai ", " ba ", " bốn ", " năm ", " sáu ", " bảy ", " tám ", " chín ");
const Tien = new Array("", " nghìn", " triệu", " tỷ", " nghìn tỷ", " triệu tỷ");

function readThreeNumberCharacter(baso) {
    var tram;
    var chuc;
    var donvi;
    var KetQua = "";
    tram = parseInt(baso / 100);
    chuc = parseInt((baso % 100) / 10);
    donvi = baso % 10;
    if (tram == 0 && chuc == 0 && donvi == 0) return "";
    if (tram != 0) {
        KetQua += ChuSo[tram] + " trăm ";
        if ((chuc == 0) && (donvi != 0)) KetQua += " linh ";
    }
    if ((chuc != 0) && (chuc != 1)) {
        KetQua += ChuSo[chuc] + " mươi";
        if ((chuc == 0) && (donvi != 0)) KetQua = KetQua + " linh ";
    }
    if (chuc == 1) KetQua += " mười ";
    switch (donvi) {
        case 1:
            if ((chuc != 0) && (chuc != 1)) {
                KetQua += " mốt ";
            } else {
                KetQua += ChuSo[donvi];
            }
            break;
        case 5:
            if (chuc == 0) {
                KetQua += ChuSo[donvi];
            } else {
                KetQua += " lăm ";
            }
            break;
        default:
            if (donvi != 0) {
                KetQua += ChuSo[donvi];
            }
            break;
    }
    return KetQua;
}

function convertMoneyFromNumberToVietnamese(SoTien) {
    var lan = 0;
    var i = 0;
    var so = 0;
    var KetQua = "";
    var tmp = "";
    var ViTri = new Array();
    if (SoTien < 0) return "Số tiền âm !";
    if (SoTien == 0) return "Không đồng !";
    if (SoTien > 0) {
        so = SoTien;
    } else {
        so = -SoTien;
    }
    if (SoTien > 8999999999999999) {
        //SoTien = 0;
        return "Số quá lớn!";
    }
    ViTri[5] = Math.floor(so / 1000000000000000);
    if (isNaN(ViTri[5]))
        ViTri[5] = "0";
    so = so - parseFloat(ViTri[5].toString()) * 1000000000000000;
    ViTri[4] = Math.floor(so / 1000000000000);
    if (isNaN(ViTri[4]))
        ViTri[4] = "0";
    so = so - parseFloat(ViTri[4].toString()) * 1000000000000;
    ViTri[3] = Math.floor(so / 1000000000);
    if (isNaN(ViTri[3]))
        ViTri[3] = "0";
    so = so - parseFloat(ViTri[3].toString()) * 1000000000;
    ViTri[2] = parseInt(so / 1000000);
    if (isNaN(ViTri[2]))
        ViTri[2] = "0";
    ViTri[1] = parseInt((so % 1000000) / 1000);
    if (isNaN(ViTri[1]))
        ViTri[1] = "0";
    ViTri[0] = parseInt(so % 1000);
    if (isNaN(ViTri[0]))
        ViTri[0] = "0";
    if (ViTri[5] > 0) {
        lan = 5;
    } else if (ViTri[4] > 0) {
        lan = 4;
    } else if (ViTri[3] > 0) {
        lan = 3;
    } else if (ViTri[2] > 0) {
        lan = 2;
    } else if (ViTri[1] > 0) {
        lan = 1;
    } else {
        lan = 0;
    }
    for (i = lan; i >= 0; i--) {
        tmp = readThreeNumberCharacter(ViTri[i]);
        KetQua += tmp;
        if (ViTri[i] > 0) KetQua += Tien[i];
        if ((i > 0) && (tmp.length > 0)) KetQua += ','; //&& (!string.IsNullOrEmpty(tmp))
    }
    if (KetQua.substring(KetQua.length - 1) == ',') {
        KetQua = KetQua.substring(0, KetQua.length - 1);
    }
    KetQua = KetQua.substring(1, 2).toUpperCase() + KetQua.substring(2);
    return KetQua; //.substring(0, 1);//.toUpperCase();// + KetQua.substring(1);
}

function getResourceFromS3(s3ImageLink) {
    let host = window.location.protocol + "//" + window.location.host;
    let hostS3 = host + '/s3-resource?url=';
    return hostS3 + s3ImageLink;
}

function genRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function contractCodeSuffix() {
    let contract_code_suffix = localStorage.getItem("contract_code_suffix");
    if (typeof contract_code_suffix === 'undefined' || contract_code_suffix == '' || contract_code_suffix == null) {
        contract_code_suffix = '';
    } else if (contract_code_suffix.length == 1) {
        contract_code_suffix = '-0' + (parseInt(contract_code_suffix) + 1);
    } else if (contract_code_suffix.length >= 2) {
        contract_code_suffix = '-' + (parseInt(contract_code_suffix) + 1);
    }

    return contract_code_suffix;
}

function getDate(dateTime) {
    let date = new Date(dateTime).getDate();
    return (date < 10 ? '0' : '') + date;
}

function getMonth(dateTime) {
    let month = new Date(dateTime).getMonth() + 1;
    return (month < 10 ? '0' : '') + month;
}

function getYear(dateTime) {
    return new Date(dateTime).getFullYear();
}

function formatDateToDDMMYYYY(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return dd + '-' + mm + '-' + yyyy;
}

function formatDateToHHMMDDMMYYYY(date) {
    const yyyy = date.getFullYear();
    let mm = date.getMonth() + 1; // Months start at 0!
    let dd = date.getDate();
    let hh = date.getHours();
    let MM = date.getMinutes();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hh < 10) hh = '0' + hh;
    if (MM < 10) MM = '0' + MM;

    return hh + ':' + MM + ' ' +dd + '-' + mm + '-' + yyyy;
}

export default {
    data: function () {
        return {
        }
    },
    // computed : mapState({
    //     loginedUser: state => state.Account.user,
    // }),
    created() {
        // getAddressInfos();
    },
    methods: {
        isset,
        getProvinces,
        getDistricts,
        getCommunes,
        number_format,
        round2Decimal,
        romanize,
        convertMoneyFromNumberToVietnamese,
        fetchAddressInfos,
        getResourceFromS3,
        genRandomString,
        contractCodeSuffix,
        isNumeric,
        getDate,
        getMonth,
        getYear,
        formatDateToDDMMYYYY,
        formatDateToHHMMDDMMYYYY,
        showRequireLoginModal,
        displayStandardBookSize,
        redirectToForbiddenPage,
        $can(permissionName) {
            return true;
            if(this.loginedUser && this.loginedUser.permissions)
                return this.loginedUser.permissions.includes(permissionName);

            return false;
        },
        $role(roles) {
            return true;
            let hasRole = false;
            if(this.loginedUser && this.loginedUser.roles) {
                roles.forEach(role => {
                    if(this.loginedUser.roles.includes(role)) hasRole = true;
                });
            }

            return hasRole;
        },
    }
};
