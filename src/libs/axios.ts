import axios, { type AxiosError, type AxiosInstance, AxiosRequestConfig } from 'axios'

type RequestUrl = string
type RequestBody = unknown
type RequestParams = Omit<AxiosRequestConfig, `baseURL` | `url` | `method`>
type RequestResponse = unknown

// axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  withXSRFToken: true,
  withCredentials: true, // ✅ Required for Laravel session cookies
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

// interceptor - REQUEST

// interceptor - RESPONSE
axiosInstance.interceptors.response.use(
  (res) => {
    // your interceptors logic here to get on protected routes

    return res
  },
  (error: AxiosError) => {
    // your responses error logic here

    return Promise.reject(error)
  },
)

const get = <TypedResponse = RequestResponse>(url: RequestUrl, params?: RequestParams) => {
  return axiosInstance.get<TypedResponse>(url, params)
}

const post = <TypedResponse = RequestResponse, RequestData = RequestBody>(
  url: RequestUrl,
  data: RequestData,
  params?: RequestParams,
) => {
  return axiosInstance.post<TypedResponse>(url, data, params)
}

const put = <TypedResponse = RequestResponse, RequestData = RequestBody>(
  url: RequestUrl,
  data: RequestData,
  params?: RequestParams,
) => {
  return axiosInstance.put<TypedResponse>(url, data, params)
}

const patch = <TypedResponse = RequestResponse, RequestData = RequestBody>(
  url: RequestUrl,
  data: RequestData,
  params?: RequestParams,
) => {
  return axiosInstance.patch<TypedResponse>(url, data, params)
}

// Delete is shortened here 'cuz is a reserved word in TS
const del = <TypedResponse = RequestResponse>(url: RequestUrl, params?: RequestParams) => {
  return axiosInstance.delete<TypedResponse>(url, params)
}

const ServerError = ({ response }: AxiosError): boolean => {
  if (response && response.status === 403) {
    return true
  }

  if (response && response.status >= 500) {
    return true
  }

  return false
}

export {
  axios,
  get,
  post,
  put,
  patch,
  del,
  ServerError,
  axiosInstance,
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type RequestParams,
}
