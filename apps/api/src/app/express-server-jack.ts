import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import { pokemon } from '../assets/pokemon';

export const expressServerJack = express();

expressServerJack.use('/assets', express.static(path.join(__dirname, 'assets')));
expressServerJack.use(cors());

expressServerJack.get('/api', (req, res) => {
  res.send({ server: 'expressServerJack' });
});
expressServerJack.get('/pokemon', (_, res) => {
  res.send(pokemon);
});
expressServerJack.get('/search', (req, res) => {
  const searchString = (req.query.q as string).toLowerCase();
  res.set('Access-Control-Allow-Origin', '*');
  res.send(
    pokemon.filter(({ name: { english } }) =>
      english.toLowerCase().includes(searchString ?? '')
    )
  );
});

