const jsonResponse = (data, message, status) => {
  return {
    status,
    data,
    message,
  };
};
const successResponse = (data) => {
  return jsonResponse(data, "Success", 1);
};

module.exports = {
  jsonResponse,
  successResponse,
};
