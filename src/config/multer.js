const multer = require('multer'); // Para trabalhar com arquivos
const path = require('path'); // Resolver melhor os caminhos nos diferentes os
const crypto = require('crypto'); // Gerar hashs

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp'),
  // diskStorage() Onde vai salvar: disco, nuvem
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp'));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    },
  }),
};
