import {FunctionBinding, Model, RequestPipelineMutationOperation, ServerlessFunction} from '../../../types/types'
import {FunctionPopupState} from './FunctionPopup'
import {keysChanged} from '../../../utils/change'
export function getEmptyFunction(models: Model[]): ServerlessFunction {
  return {
    id: '',
    name: '',
    type: 'AUTH0',
    webhookUrl: '',
    webhookHeaders: '',
    _webhookHeaders: {
      'Content-Type': 'application/json',
    },
    inlineCode,
    auth0Id: '',
    logs: {
      edges: [],
    },
    binding: 'TRANSFORM_ARGUMENT',
    operation: 'CREATE',
    stats: undefined,
    isActive: true,
    modelId: models[0].id,
  }
}

const inlineCode = `module.exports = function (event) {
  return {event: event}
}
`

export function updateInlineCode(state: ServerlessFunction, inlineCode: string): ServerlessFunction {
  return {
    ...state,
    inlineCode,
  }
}

export function updateName(state: ServerlessFunction, name: string): ServerlessFunction {
  return {
    ...state,
    name,
  }
}

export function updateBinding(state: ServerlessFunction, binding: FunctionBinding): ServerlessFunction {
  return {
    ...state,
    binding,
  }
}

export function updateModel(state: ServerlessFunction, modelId: string): ServerlessFunction {
  return {
    ...state,
    modelId,
  }
}

export function updateAuth0Id(state: ServerlessFunction, auth0Id: string): ServerlessFunction {
  return {
    ...state,
    auth0Id,
  }
}

export function updateOperation(
  state: ServerlessFunction,
  operation: RequestPipelineMutationOperation,
): ServerlessFunction {
  return {
    ...state,
    operation,
  }
}

export function updateWebhookUrl(state: ServerlessFunction, webhookUrl: string): ServerlessFunction {
  return {
    ...state,
    webhookUrl,
  }
}

export function updateWebhookHeaders(state: ServerlessFunction, _webhookHeaders: {[key: string]: string}):
ServerlessFunction {
  return {
    ...state,
    _webhookHeaders,
  }
}

export function isValid(state: FunctionPopupState) {
  if (!state.fn.webhookUrl && !state.fn.inlineCode) {
    return false
  }
  return true
}

export function didChange(before: ServerlessFunction, after?: ServerlessFunction) {
  if (!after) {
    return false
  }
  return keysChanged(before, after, [
    'name', 'isActive', 'binding', 'operation',
    'type', 'url', 'headers', 'inlineCode', 'auth0Id',
  ])
}
