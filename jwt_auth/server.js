const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const secretKey = crypto.randomBytes(32).toString('hex');

app.post('/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        const user = users.find(u => u.username === username);

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        const token = jwt.sign({ id: user.username }, secretKey, {
            expiresIn: 86400 // 24 horas
        });

        res.status(200).send({ auth: true, token, username: user.username });
    } catch (error) {
        res.status(500).send('Error en el servidor');
    }
});

app.list



const users = [{
        username: 'ronald',
        password: bcrypt.hashSync('ronald1234', 8)
    },
    {
        username: 'Geampier',
        password: bcrypt.hashSync('jampy', 8)
    }
];