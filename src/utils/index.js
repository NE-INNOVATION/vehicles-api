export function createErrorResponse(statusCode, message, headers) {
  return {
    statusCode: statusCode || 501,
    body: JSON.stringify(message),
    headers: { ...headers, "Content-Type": "application/json" },
  };
}

export function createResponse(statusCode, message, headers) {
  return {
    statusCode: statusCode || 200,
    body: JSON.stringify(message),
    headers: { ...headers, "Content-Type": "application/json" },
  };
}
