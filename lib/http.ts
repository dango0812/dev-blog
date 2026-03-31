import { omitBy } from 'es-toolkit/object';
import { isEmptyObject, isPlainObject, isUndefined } from 'es-toolkit/predicate';

/** HTTP 메서드 타입 */
export type HttpMethod = 'get' | 'post' | 'patch' | 'put' | 'delete';

class HttpError<T = unknown> extends Error {
  readonly name = 'HttpError' as const;
  readonly status: number;
  readonly data?: T;

  constructor(status: number, data?: T) {
    super(isPlainObject(data) && typeof data.error === 'string' ? data.error : `문제가 발생했어요 ${status}`);
    this.status = status;
    this.data = data;
  }
}

/**
 * HTTP 에러 확인 타입 가드
 * @param error - 확인할 에러 객체
 * @returns {boolean} HTTP 에러 여부
 *
 * @example
 * try {
 *   await http.get('/api/data');
 * } catch (error) {
 *   if (isHttpError(error)) {
 *     console.error(`HTTP Error ${error.status}:`, error.data);
 *   } else {
 *     console.error('Unknown error:', error);
 *   }
 * }
 */
export function isHttpError<T = unknown>(error: unknown): error is HttpError<T> {
  return error instanceof HttpError;
}

interface HttpRequestOptions {
  json?: unknown;
  body?: BodyInit;
  searchParams?: Record<string, string | string[] | undefined>;
  headers?: Record<string, string | undefined>;
}

class Http {
  get<T>(path: string, options?: Omit<HttpRequestOptions, 'json' | 'body'>): Promise<T> {
    return this.request('get', path, options);
  }

  post<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request('post', path, options);
  }

  patch<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request('patch', path, options);
  }

  put<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request('put', path, options);
  }

  delete<T>(path: string, options?: HttpRequestOptions): Promise<T> {
    return this.request('delete', path, options);
  }

  private async request<T>(method: HttpMethod, path: string, options?: HttpRequestOptions): Promise<T> {
    const { url, init } = this.parseRequestOptions(method, path, options);
    const res = await fetch(url, init);

    // 204 No Content인 경우
    if (res.status === 204) {
      return undefined as T;
    }

    const data = await res.json();
    if (!res.ok) {
      throw new HttpError(res.status, data);
    }

    return data as T;
  }

  // 요청 옵션을 파싱하여 URL과 RequestInit 객체 생성
  private parseRequestOptions(method: HttpMethod, path: string, options?: HttpRequestOptions) {
    let url = path;

    if (options?.searchParams) {
      // undefined인 값을 제거한 후 URLSearchParams 객체로 변환하여 쿼리 문자열 생성
      const filtered = omitBy(options.searchParams, isUndefined) as Record<string, string | string[]>;
      const params = new URLSearchParams();

      // 배열인 경우 각 값을 개별적으로 추가, 단일 값인 경우 한 번만 추가
      for (const [key, value] of Object.entries(filtered)) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v));
        } else {
          params.set(key, value);
        }
      }

      const query = params.toString();
      if (query) {
        url = `${path}?${query}`;
      }
    }

    // undefined인 헤더를 제거하여 RequestInit 객체의 headers에 설정
    let headers = omitBy(options?.headers ?? {}, isUndefined) as Record<string, string>;

    let body: BodyInit | undefined;

    if (options?.json !== undefined) {
      body = JSON.stringify(options.json);
      headers = {
        ...headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };
    } else if (options?.body) {
      body = options.body;
    }

    // HTTP 메서드와 body, headers를 포함한 RequestInit 객체 생성
    const init: RequestInit = {
      method: method.toUpperCase(),
    };

    if (body) {
      init.body = body;
    }

    if (!isEmptyObject(headers)) {
      init.headers = headers;
    }

    return { url, init };
  }
}

export const http = new Http();
