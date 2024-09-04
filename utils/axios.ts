import axios, {AxiosResponse} from 'axios';
import {getToken} from './cookies';
import {jsonToQueryString} from './functions';
import {GetServerSidePropsContext} from "next";

// export const backendUrl = "http://192.168.1.129:8003"
export const backendUrl = process.env.NEXT_PUBLIC_API_URL;
export const frontendUrl = process.env.NEXT_PUBLIC_FRONT_URL;

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}

export const sendRequest = <T = { [key: string]: any }>(
    url: string,
    method: HttpMethod = HttpMethod.GET,
    params?: { [name: string]: any },
    hasFile: boolean = false,
    bearerToken?: string | null,
): Promise<AxiosResponse<T>> => {
    let token: string | null;

    if (bearerToken) {
        token = bearerToken;
    } else {
        token = getToken();
    }

    let headers: { [name: string]: string } = {
        'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
    };

    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    let options: { [name: string]: any } = {
        headers,
        method,
    };

    if (params) {
        if (method === HttpMethod.GET) {
            url += Object.keys(params).length ? jsonToQueryString(params) : '';
        } else {
            options.body = params;
        }
    }

    return new Promise((resolve, reject) => {
        axios({
            ...options,
            url: url.startsWith('http') ? url : backendUrl + url,
            data: params,
        })
            .then((res) => resolve(res))
            .catch((err) => {
                console.log('------>', err.response)
                if (err.response && err.response.data) {
                    if (err.response.status == 401) {
                        window.location.replace(frontendUrl + '/logout');
                    }
                }
                reject(err);
            });
    });
};

export const serverSideFetch = async <T>(
    context: GetServerSidePropsContext,
    url: string,
    params?: {
        [name: string]: any;
    }
) => {
    const token = getToken(context.req.cookies);

    try {
        const res = await sendRequest<T>(url, HttpMethod.GET, params, false, token);
        return {
            props: {
                data: res.data,
            },
        };
    } catch (err) {

        return {
            props: {
                data: null,
            },
        };
    }
};