import {toast} from 'react-toastify';
import {getToken} from './cookies';
import {HttpMethod, sendRequest} from '../utils/axios';
import {FormContentType} from "../src/dashboard/InformationTable";
import {GetServerSidePropsContext} from "next";

export const jsonToQueryString = (json: { [name: string]: string }): string => {
    return (
        '?' +
        Object.keys(json)
            .map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
            })
            .join('&')
    );
};

export const fetcher = <T>(url: string) =>
    sendRequest<T>(url, HttpMethod.GET).then((res) => res.data);

export const getDateDiffStr = (d: Date) => {
    const today = new Date();
    const date = new Date(d);
    const diffTime = Math.abs(today.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0 && diffDays <= 1) {
        return 'امروز';
    } else if (diffDays > 1 && diffDays <= 7) {
        return `${diffDays} روز پیش`;
    } else if (diffDays > 7 && diffDays <= 31) {
        const weeks: number = Math.floor(diffDays / 7);
        return `${weeks} هفته پیش`;
    } else if (diffDays > 30 && diffDays <= 365) {
        const months: number = Math.floor(diffDays / 30);
        return `${months} ماه پیش`;
    } else {
        const years: number = Math.floor(diffDays / 365);
        return `${years} سال پیش`;
    }
};
export const webSiteString = (str: string) => {
    if (str.includes('https://')) {
        return str.replace('https://', '').replace('/', '');
    } else {
        return str.replace('http://', '').replace('/', '');
    }
};

export const appendFormData = (keys: Array<string>, obj: any): FormData => {
    let fd = new FormData();
    keys.forEach(buildData);

    function buildData(item: string, index: number) {
        if (obj[keys[index]] && typeof obj[keys[index]] === 'object') {
            if (['file'].includes(item)) fd.append(item, obj[keys[index]].file.originFileObj);
            else if (
                [
                    'thumbnail',
                    'banner',
                    'avatar',
                    'twitter_thumbnail',
                    'image',
                    'picture',
                    'facebook_thumbnail',
                ].includes(item)
            ) {
                fd.append(item, obj[keys[index]].file);
            } else {
                for (let j = 0; j < obj[keys[index]].length; j++) {
                    fd.append(keys[index], obj[keys[index]][j]);
                }
            }
        } else fd.append(item, obj[keys[index]]);
    }

    return fd;
};

// Convert json to form data
export const toFormData = (json: any) => {
    const formData = new FormData();

    for (var prop in json) {
        if (typeof json[prop] === 'object' && 'file' in json[prop]) {
            formData.append(prop, json[prop].file.originFileObj);
        } else {
            formData.append(prop, json[prop]);
        }
    }

    return formData;
};
export const ellipsisText = (str: string, maxlimit: number): string | undefined => {
    if (str != null) {
        if (str.length > maxlimit) {
            for (let i = maxlimit; i > 0; i--) {
                if (str.charAt(i) == ' ') {
                    return str.substring(0, i) + '...';
                }
            }
        } else return str;
    }
};

export const arrayRemove = (arr: Array<any>, value: number | string) => {
    return arr.filter(function (ele) {
        return ele != value;
    });
};

export const catchRequestError = (error: any, hasAuth: boolean = true) => {
    if (
        error?.ErrorCode === 401 &&
        getToken() !== null &&
        window !== undefined &&
        hasAuth === true
    ) {
        window.location.href = '/login';
    }

    if (error?.response) {
        toast.error(error.response.data.detail);
    } else {
        toast.error('خطایی رخ داده است');
    }
};

export function showPrice(price: number) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const mergeArraysById = (arr1: any = [], arr2: any = [], by: string) => {
    let res = [];
    res = arr1.map((obj: any) => {
        const index = arr2.findIndex((el: any) => el[by] == obj[by]);
        const count = index !== -1 ? arr2[index] : {};
        return {
            ...obj,
            count,
        };
    });
    return res;
};

export const downloadFileWithUrl = (props: {
    url: string;
    name: undefined | string;
    isImage?: boolean;
    changeLoading?: (a: boolean) => void;
}) => {
    if (props.changeLoading) props.changeLoading(true);
    const downloadFile = (newUrl: string) => {
        const link = document.createElement('a');
        link.href = newUrl;
        link.setAttribute('download', props.name || 'file'); //or any other extension
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        if (props.changeLoading) props.changeLoading(false);
    };

    if (props.isImage) {
        fetch(props.url, {
            method: 'GET',
            headers: {},
        })
            .then((response) => {
                response.arrayBuffer().then(function (buffer) {
                    props.url = window.URL.createObjectURL(new Blob([buffer]));
                    downloadFile(props.url);
                });
            })
            .catch((err) => {
            });
    } else {
        downloadFile(props.url);
    }
};

export function checkProperties(obj: any) {
    let tempObj: any = {};
    for (let key in obj) {
        if (obj[key] !== null && obj[key] !== '' && obj[key] !== undefined) tempObj[key] = obj[key];
    }
    return tempObj;
}

export function convertNumberToEn(replaceString: string, returnType: 'string' | 'number') {
    const find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], 'g');
        replaceString = replaceString.replace(regex, replace[i]);
    }
    if (returnType == 'number') return parseInt(replaceString);
    else return replaceString;
}

export function convertToEn(replaceString: string) {
    const find = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    const replace = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let regex;
    for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], 'g');
        replaceString = replaceString.replace(regex, replace[i]);
    }
    return parseInt(replaceString);
}

export function containsOnlyNumbers(str: string) {
    return /^\d+$/.test(str);
}

export function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}

export const mergeAndRemoveDuplicates = (arr1: number[], arr2: number[]) => {
    const merged = [...arr1, ...arr2];
    const uniqueMerged = Array.from(new Set(merged)); // Removes duplicate values
    return uniqueMerged;
};

export function isValidDateFormat(dateString: string) {
    // Regular expression for YYYY-MM-DD format
    const regex = /^\d{4}\/\d{2}\/\d{2}$/;
    return regex.test(dateString);
}

export const findIndexOfId = (fromThisArray: FormContentType[], id: number) => {
    let itemIndex: number = 0
    fromThisArray.map((item, index) => {
        if (item.id == id) itemIndex = index
    })
    return itemIndex
}

