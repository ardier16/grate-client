import * as errors from '@/js/errors'
import { Bus } from '@/js/helpers/event-bus'

import safeGet from 'lodash/get'

const STATUS_CODES = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalError: 500,
}

export class ErrorHandler {
  static process (error, translationId = '') {
    const parsedError = this._parseError(error)
    const msgTrId = translationId ||
      ErrorHandler._getTranslationId(parsedError)
    Bus.error(msgTrId)
  }

  static _parseError (error) {
    const status = safeGet(error, 'response.status')

    switch (status) {
      case STATUS_CODES.badRequest:
        error = new errors.BadRequestError(error)
        break
      case STATUS_CODES.unauthorized:
        error = new errors.NotAllowedError(error)
        break
      case STATUS_CODES.forbidden:
        error = new errors.ForbiddenRequestError(error)
        break
      case STATUS_CODES.notFound:
        error = new errors.NotFoundError(error)
        break
      case STATUS_CODES.conflict:
        error = new errors.ConflictError(error)
        break
      case STATUS_CODES.internalError:
        error = new errors.InternalServerError(error)
        break
      default:
        error = new errors.ServerError(error)
    }

    return error
  }

  static _getTranslationId (error) {
    let translationId

    switch (error.constructor) {
      case errors.NetworkError:
        translationId = 'errors.network'
        break
      case errors.TimeoutError:
        translationId = 'errors.timeout'
        break
      case errors.InternalServerError:
        translationId = 'errors.internal'
        break
      case errors.BadRequestError:
        translationId = 'errors.bad-request'
        break
      case errors.NotAllowedError:
        translationId = 'errors.not-allowed'
        break
      case errors.ForbiddenRequestError:
        translationId = 'errors.forbidden'
        break
      case errors.NotFoundError:
        translationId = 'errors.not-found'
        break
      case errors.ConflictError:
        translationId = 'errors.conflict'
        break
      case errors.UnauthorizedError:
        translationId = 'errors.unauthorized'
        break
      default:
        translationId = 'errors.default'
    }

    return translationId
  }
}
