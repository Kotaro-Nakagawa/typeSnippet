function isJSONSchema(obj: any): obj is JSONSchema {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const validTypes = ['string', 'number', 'integer', 'boolean', 'array', 'object', 'null'];

  if (obj.type !== undefined) {
    if (Array.isArray(obj.type)) {
      if (!obj.type.every((type) => validTypes.includes(type))) {
        return false;
      }
    } else if (!validTypes.includes(obj.type)) {
      return false;
    }
  }

  if (obj.type === 'object') {
    if (typeof obj.properties !== 'object' || obj.properties === null) {
      return false;
    }
    for (const key in obj.properties) {
      if (!isJSONSchema(obj.properties[key])) {
        return false;
      }
    }
  }

  if (obj.type === 'array') {
    if (obj.items !== undefined) {
      if (Array.isArray(obj.items)) {
        if (!obj.items.every((item) => isJSONSchema(item))) {
          return false;
        }
      } else if (!isJSONSchema(obj.items)) {
        return false;
      }
    }
  }

  if (obj.type === 'number' || obj.type === 'integer') {
    if (obj.maximum !== undefined && typeof obj.maximum !== 'number') {
      return false;
    }
    if (obj.minimum !== undefined && typeof obj.minimum !== 'number') {
      return false;
    }
  }

  if (obj.required !== undefined) {
    if (!Array.isArray(obj.required) || !obj.required.every((item) => typeof item === 'string')) {
      return false;
    }
  }

  if (obj.additionalProperties !== undefined) {
    if (typeof obj.additionalProperties !== 'boolean' && !isJSONSchema(obj.additionalProperties)) {
      return false;
    }
  }

  if (obj.definitions !== undefined) {
    if (typeof obj.definitions !== 'object' || obj.definitions === null) {
      return false;
    }
    for (const key in obj.definitions) {
      if (!isJSONSchema(obj.definitions[key])) {
        return false;
      }
    }
  }

  if (obj.$schema !== undefined) {
    if (typeof obj.$schema !== 'string') {
      return false;
    }
  }

  return true;
}
