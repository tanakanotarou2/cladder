import { AxiosError } from 'axios';

const NON_FIELD_ERROR_KEY = 'nonFieldErrors';

export class ErrorHandler {
  beAbleToHandle(error: any): boolean {
    throw new Error('beAbleToHandle を実装してください');
  }

  handle(error: any) {
    throw new Error('handle を実装してください');
  }
}

type FieldError = { [key: string]: string[] | FieldError[] }

export class FormError {
  fieldErrors: FieldError;
  nonFieldErrors: string[] | null;

  constructor(fieldErrors: FieldError, nonFieldMessages: string[] | null = null) {
    this.fieldErrors = fieldErrors;
    this.nonFieldErrors = nonFieldMessages;
  }
}

export class SingleErrorHandler extends ErrorHandler {
  beAbleToHandle(error: AxiosError): boolean {
    const data: any = error?.response?.data;
    if (!data) return false;
    return data.hasOwnProperty('detail') && typeof data.detail === 'string';
  }

  handle(error: AxiosError): FormError {
    // @ts-ignore
    return new FormError({}, [error.response!.data.detail]);
  }
}

export class FieldErrorHandler extends ErrorHandler {
  data: Object | null = null;

  beAbleToHandle(error: any): boolean {
    const data = error?.response?.data;
    const detail = error?.response?.data?.detail;
    if (!data || !!Array.isArray(data)) return false;
    if (!!detail) return false;
    const dataType = typeof data;

    if (dataType === 'object') {
      this.data = data;
      return true;
    }
    return false;
  }

  handle(error: AxiosError): FormError {
    // @ts-ignore
    const fieldErrors = Object.fromEntries(Object.entries(this.data!).filter(([key]) => key !== NON_FIELD_ERROR_KEY));
    // @ts-ignore
    const nonFieldErrors = this.data![NON_FIELD_ERROR_KEY] || null;
    return new FormError(fieldErrors, nonFieldErrors);
  }
}

/*
 * API のエラーに関する前処理
 *
 * API からのエラーメッセージがある場合は FormErrors を、
 * (通信エラーなどで) APIからのエラーメッセージがない場合は null を返します。
 */
export const preprocessApiError = (error: AxiosError): FormError | null => {
  const simpleErrorHandler = new SingleErrorHandler();
  const fieldErrorHandler = new FieldErrorHandler();

  if (error.response && !(400 <= error.response.status && error.response.status < 500)) {
    console.debug('error', error);
  }

  if (fieldErrorHandler.beAbleToHandle(error)) return fieldErrorHandler.handle(error);
  if (simpleErrorHandler.beAbleToHandle(error)) return simpleErrorHandler.handle(error);
  return null;
};

/*
 * hookform/error-message でレンダリングするためのフォーマットに整形
 */
export const reformatToHookFormStyle = (errors: FormError) => {
  const res = Object();
  for (const [fieldName, msgs] of Object.entries(errors.fieldErrors)) {
    const fieldErrors = Object();
    msgs.forEach((msg, i) => {
      if (typeof msg === 'string') {
        fieldErrors[`api_error_${i}`] = msg;
      }
    });
    // Note: メッセージが 1 件の場合は、{'message': msg} とすれば、フィールドの hint に表示することも可能
    res[fieldName] = { types: fieldErrors };
  }
  return res;
};
