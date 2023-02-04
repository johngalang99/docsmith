import axios from 'axios';
import crypto from 'crypto';
import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/token', async (req: Request, res: Response) => {
  const email = 'imman.galang@gmail.com';
  const password = 'password';
  const softwareID = 'ac19014a7ac320b86fe7412a1b057691'; // Enter softwareID here

  try {
    const hashedPassword = crypto.createHash('sha512').update(password).digest('hex');

    const response = await axios.post('https://secure.tracksmit.com/api/v1/token', {
      email,
      password: hashedPassword,
      softwareID
    });

    const { data } = response;

    res.json({ token: data.token });
  } catch (error: any) {
    res.json({ error: error.message });
  }
});

app.post('/messages/new', async (req, res) => {
  var username = '6b27bbd6163f76abfbcee8f0f37f5d37';
  var auth = 'Basic ' + Buffer.from(username + ':').toString('base64');

  try {
    const response = await axios.post('http://secure.tracksmit.com/api/v1/messages/new', {
      title: "This is new message title from Hiren testcase",
      physicalParties: [
        {
          firstName: "John",
          lastName: "backham",
          address1: "880 Bergen Avenue,",
          city: "Jersey City",
          state: "NJ",
          postalCode: "07306",
        },
      ],
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth,
      },
    },);

    res.json({ data: response.data });
  } catch (error: any) {
    res.json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
