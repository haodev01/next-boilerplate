/* eslint-disable @typescript-eslint/no-explicit-any */
import { envConfigs } from '@/configs';
import CryptoJS from 'crypto-js';
export function createTripleDES(message: string, secureCode = '') {
  if (!secureCode) {
    secureCode = envConfigs.SECURE_CODE as string;
  }
  const keyHex = CryptoJS.MD5(CryptoJS.enc.Utf8.parse(secureCode));
  const encrypted = CryptoJS.TripleDES.encrypt(message, keyHex, {
    iv: keyHex,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });

  return encrypted.toString();
}
export function encodeFormData(url: string, data: any) {
  const formData: any = {};
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'data') {
      formData['data'] = createTripleDES(
        JSON.stringify(data.data),
        process.env.SECURE_CODE,
      );
    } else {
      formData[key] = value;
    }
  });

  return formData;
}
const paramsSecures: any = {
  '/api/v1/login': ['email', 'password'],
};
export function createSignHash(url: any, data: any = {}, accessToken = '') {
  const arrStr: any[] = [];
  url = url.replaceAll('/', '');
  paramsSecures[url].forEach((key: number) => {
    arrStr.push(data[key]);
  });
  let message = (arrStr.toString() as any).replaceAll(',', '|');
  if (accessToken) {
    message = `${accessToken}|${message}`;
  }

  return CryptoJS.enc.Base64.stringify(
    CryptoJS.HmacSHA1(message, CryptoJS.MD5(message)),
  );
}
