const getResponse = (req, res, data, code = 200) => res.status(code).send({
    status: true,
    message: "successful",
    data,
});
  
const addResponse = (req, res, data, code = 201) => res.status(code).send({
    status: true,
    message: "successful",
    data,
});

const editResponse = (req, res, data, code = 200) => res.status(code).send({
    status: true,
    message: data + " data has been updated",
    // data,
});
  
const deleteResponse = (req, res, data, code = 200) => res.status(code).send({
    status: true,
    message: data + " data has been deleted",
    // data,
});
  
const errorResponse = (
    req,
    res,
    message,
    code = 500,
) => res.status(code).json({
    message: message || 'Something went wrong'
});

module.exports = {
    getResponse,
    addResponse,
    editResponse,
    deleteResponse,
    errorResponse
};