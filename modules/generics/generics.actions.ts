export function actionTypes(entityName: string) {
  entityName = entityName.replace(/([A-Z])/g, '_$1').toUpperCase()

  return {
    // Update resources, metadata, and lists synchronously
    UPDATE: `UPDATE_${entityName}`,
    // Remove resources from the store synchronously
    DELETE: `DELETE_${entityName}`,

    // The following action types are to support CRUD`ing resources
    // asynchronously using requests
    GET_PENDING: `GET_${entityName}_PENDING`,
    GET_FAILED: `GET_${entityName}_FAILED`,
    GET_SUCCEEDED: `GET_${entityName}_SUCCEEDED`,
    GET_IDLE: `GET_${entityName}_IDLE`,

    GETBYID_PENDING: `GET_${entityName}_PENDING`,
    GETBYID_FAILED: `GET_${entityName}_FAILED`,
    GETBYID_SUCCEEDED: `GET_${entityName}_SUCCEEDED`,
    GETBYID_IDLE: `GET_${entityName}_IDLE`,

    CREATE_PENDING: `CREATE_${entityName}_PENDING`,
    CREATE_FAILED: `CREATE_${entityName}_FAILED`,
    CREATE_SUCCEEDED: `CREATE_${entityName}_SUCCEEDED`,
    CREATE_IDLE: `CREATE_${entityName}_IDLE`,


    UPDATE_PENDING: `UPDATE_${entityName}_PENDING`,
    UPDATE_FAILED: `UPDATE_${entityName}_FAILED`,
    UPDATE_SUCCEEDED: `UPDATE_${entityName}_SUCCEEDED`,
    UPDATE_IDLE: `UPDATE_${entityName}_IDLE`,

    DELETE_PENDING: `DELETE_${entityName}_PENDING`,
    DELETE_FAILED: `DELETE_${entityName}_FAILED`,
    DELETE_SUCCEEDED: `DELETE_${entityName}_SUCCEEDED`,
    DELETE_IDLE: `DELETE_${entityName}_IDLE`,
  }
}

export function getPending(entityName) {
  const request = {
    method: 'get',
    path: `/${entityName}`,
    headers: []
  };

  return {
    type: actionTypes(entityName).GET_PENDING,
    payload: request
  };
}

export function getFailed(entityName, error) {
  return {
    type: actionTypes(entityName).GET_FAILED,
    payload: error
  };
}

export function getSucceeded(entityName, entities) {
  return {
    type: actionTypes(entityName).GET_SUCCEEDED,
    payload: entities
  };
}


export function getIdle(entityName) {
  return {
    type: actionTypes(entityName).GET_IDLE,
  }
}

export function createPending(entityName: string, props) {
  const request = {
    method: 'post',
    data: props,
    path: `/${entityName}`,
    headers: []
    // headers: {
    //   'Authorization': `Bearer ${tokenFromStorage}`
    // }
  };

  return {
    type: actionTypes(entityName).CREATE_PENDING,
    payload: request
  };
}

export function createSucceeded(entityName: string, entity) {
  return {
    type: actionTypes(entityName).CREATE_PENDING,
    payload: entity
  };
}

