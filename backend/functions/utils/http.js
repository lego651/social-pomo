exports.success = (res, data=null, message="successful", status_code=200) => {
  return res.status(status_code).json({
    success: true,
    message,
    status_code,
    data
  })
};

exports.fail = (res, data=null, message="something went wrong", status_code=400) => {
  return res.status(status_code).json({
    success: false,
    message,
    status_code,
    data
  })
};