const user = require('../user');

class UserController {
  post(request, response) {
    request.on('data', async (data) => {
      const body = JSON.parse(data);
      const result = await user.create(body);
      return response.end(JSON.stringify(result));
    });
  }

  async get(request, response) {
    const result = await user.findAll();
    return response.end(JSON.stringify(result));
  }

  put(request, response) {
    const paramsSplit = request.url.split('/');
    const id = paramsSplit[2];

    request.on('data', async (data) => {
      const body = JSON.parse(data);

      try {
        await user.update(body, id);
        return response.end(
          JSON.stringify({message: 'Usuario alterado com sucesso!'})
        );
      } catch (err) {
        return response.end(JSON.stringify({message: err.message}));
      }
    });
  }
}

module.exports = {UserController};