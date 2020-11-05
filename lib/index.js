const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bent = require('bent');
const Cep = require('./Cep');

app.use(bodyParser.json());

mongoose.connect('mongodb://root:root@localhost:27017/cep_cache?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/cep/:cep', async (req, res) => {
    const cached = await Cep.findOne({ zipcode: req.params.cep });

    if (cached) {
        return res.status(200).json({ info: cached });
    }

    const { cep, uf, cidade, bairro, logradouro } = await bent('GET', 'http://cep.la', 'json', { Accept: 'application/json' })(`/${req.params.cep}`);
    const created = await Cep.create({ zipcode: cep, state: uf, city: cidade, neighborhood: bairro, comp: logradouro });
    return res.status(201).json({ info: created });
});

module.exports = app;
