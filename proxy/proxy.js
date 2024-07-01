const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

app.get('/contacts', (req, res) => {
  const options = {
    url: 'https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts?limit=20',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

// Endpoint para obtener un contacto por ID
app.get('/contacts/:id', (req, res) => {
  const options = {
    url: 'https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/' + req.params.id,
    headers: {
      'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

app.get('/contacts/phone/:id', (req, res) => {
  const options = {
    url: 'https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/' + req.params.id + '/phones/1',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
      console.log(res);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

app.get('/contacts/email/:id', (req, res) => {
  const options = {
    url: 'https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/' + req.params.id + '/emails/0',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
      console.log(res);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

app.get('/contacts/existPhone/:id', (req, res) => {
  const options = {
    url: 'https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/' + req.params.id + '/phones',
    headers: {
      'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
      console.log(res);
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

// Endpoint para eliminar contacto por ID
app.delete('/contacts/:id', (req, res) => {
  const options = {
    method: 'DELETE',
    url: 'https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/' + req.params.id,
    headers: {
      'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
      'Content-Type': 'application/json'
    }
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 204) {
      res.send('Contacto eliminado correctamente');
    } else {
      res.status(response.statusCode).send(error);
    }
  });
});

app.post('/contacts', async (req, res) => {
  try {
      const options = {
          method: 'POST',
          url: 'https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts',
          headers: {
              'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
              'Content-Type': 'application/json'
          },
          json: req.body
      };

      request(options, (error, response, body) => {
          if (!error && response.statusCode == 201) {
              res.status(201).send('Contacto creado correctamente');
          } else {
              res.status(response.statusCode).send(error || body);
          }
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
  }
});

app.patch('/contacts/:id', async (req, res) => {
  try {
    const options = {
      method: 'PATCH',
      url: 'https://imaginecx--tst2.custhelp.com/services/rest/connect/v1.3/contacts/' + req.params.id,
      headers: {
        'Authorization': 'Basic ' + Buffer.from('ICXCandidate:Welcome2024').toString('base64'),
        'Content-Type': 'application/json'
      },
      json: req.body
    };

    request(options, (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send('Contacto actualizado correctamente');
      } else {
        res.status(response.statusCode).send(error || body);
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});
