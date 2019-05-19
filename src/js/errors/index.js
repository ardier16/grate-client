/**
 * Network error.
 *
 * @class
 */
export class NetworkError extends Error {
  constructor (message, data) {
    super(message)
    this.data = data
  }
};

/**
 * Request timeout error.
 *
 * @class
 */
export class TimeoutError extends Error {
  constructor (message, data) {
    super(message)
    this.data = data
  }
}

/**
 * Base class for server errors.
 */
export class ServerError extends Error {
  /**
   * Wrap a raw axios error.
   *
   * @param {object} originalError Raw axios response.
   * @param {axios} axiosInstance Axios instance used for request.
   */
  constructor (originalError) {
    super(originalError.message)

    this.originalError = originalError
  }

  /**
   * Response HTTP status.
   */
  get httpStatus () {
    return this.originalError.response.status
  }

  /**
   * Error meta.
   */
  get meta () {
    return this._meta
  }

  /**
   * A short, human-readable summary of the problem.
   */
  get title () {
    return this._title
  }

  /**
   * A human-readable explanation specific to this occurrence of the problem.
   */
  get detail () {
    return this._detail
  }

  get requestPath () {
    return this.originalError.response.request.path
  }
}

/**
 * "Bad Request" error.
 *
 * @export
 * @class
 */
export class BadRequestError extends ServerError {}

/**
 * User is not allowed to perform this action.
 *
 * @export
 * @class
 */
export class NotAllowedError extends ServerError {}

/**
 * Forbidden.
 *
 * @export
 * @class
 */
export class ForbiddenRequestError extends ServerError {}

/**
 * The requested resource was not found.
 *
 * @export
 * @class
 */
export class NotFoundError extends ServerError {}

/**
 * The request could not be completed due to a conflict with the current state of the target resource.
 *
 * @export
 * @class
 */
export class ConflictError extends ServerError {}

/**
 * Internal server error (500)
 *
 * @export
 * @class
 */
export class InternalServerError extends ServerError {}

/**
 * 401 (Unauthorized) error.
 *
 * @class
 */
export class UnauthorizedError extends ServerError {}
