const axios = require("axios");

const forwardRequest = async (req, res, targetUrl) => {
  try {
    const { method, headers, body, params } = req;

    const response = await axios({
      method,
      url: `${targetUrl}${req.originalUrl}`,
      /* headers: {
        ...headers,
      }, */
      data: body,
      params,
    });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.status).json({ error: err.message });
  }
};

module.exports = forwardRequest;
