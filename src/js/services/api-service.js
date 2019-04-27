import axios from 'axios'

const methods = Object.freeze({
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
  GET: 'GET',
  DELETE: 'DELETE',
})

const MIME_TYPE_JSON_API = 'application/json'
const MIME_TYPE_FORM_DATA = 'multipart/form-data'

const HEADER_CONTENT_TYPE = 'Content-Type'
const HEADER_ACCEPT = 'Accept'
const HEADER_TOKEN = 'x-access-token'

export class ApiService {
  constructor ({ axios, apiUrl, storageUrl }) {
    this._axios = axios
    this._apiUrl = apiUrl
    this._storageUrl = storageUrl
  }

  static getInstance ({ apiUrl, storageUrl }) {
    return new ApiService({
      apiUrl,
      storageUrl,
      axios: axios.create(),
    })
  }

  get ({ endpoint, query, token }) {
    return this._call({
      method: methods.GET,
      token,
      endpoint,
      query,
    })
  }

  post ({ endpoint, data, token }) {
    return this._call({
      method: methods.POST,
      endpoint,
      token,
      data,
    })
  }

  patch ({ endpoint, data, token }) {
    return this._call({
      method: methods.PATCH,
      token,
      endpoint,
      data,
    })
  }

  put ({ endpoint, data, token }) {
    return this._call({
      method: methods.PUT,
      token,
      endpoint,
      data,
    })
  }

  delete ({ endpoint, data, token }) {
    return this._call({
      method: methods.DELETE,
      token,
      endpoint,
      data,
    })
  }

  async uploadDocument (document) {
    const formData = new FormData()
    formData.append('image', document)

    const config = {
      baseURL: this._apiUrl,
      data: formData,
      method: methods.POST,
      url: 'documents',
      headers: { [HEADER_CONTENT_TYPE]: MIME_TYPE_FORM_DATA },
    }

    let response
    try {
      response = await this._axios(config)
    } catch (e) {
      throw e
    }

    return `${this._storageUrl}${response.data.path}`
  }

  /**
   * Performs a request
   *
   * @param {object} opts
   * @param {string} opts.endpoint - endpoint where to make the call to, e.g. `/posts`
   * @param {object} opts.data - request data (for POST/PUT requests)
   * @param {object} opts.query - request query params
   * @param {string} opts.method - HTTP method of request
   * @param {bool} [opts.token] - authentication token
   *
   * @private
   */
  async _call (opts) {
    let config = {
      baseURL: this._apiUrl,
      params: opts.query || {},
      paramsSerializer: function (params) {
        return Object.entries(params)
          .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
          .join('&')
      },
      data: opts.data || {},
      method: opts.method,
      url: opts.endpoint,
      headers: {
        [HEADER_CONTENT_TYPE]: MIME_TYPE_JSON_API,
        [HEADER_ACCEPT]: MIME_TYPE_JSON_API,
      },
    }

    if (opts.token) {
      config.headers[HEADER_TOKEN] = opts.token
    }

    let response
    try {
      response = await this._axios(config)
    } catch (e) {
      throw e
    }

    return response.data
  }
}
