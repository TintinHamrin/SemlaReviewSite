import { Request, Response } from 'express';
import * as fs from 'fs';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const PORT = process.env.PORT || 3001;

let buttonClicks = 0;
let userCounterMainPage = 0;
let userCounterBakeryPage = {};

// let property: keyof typeof userCounterBakeryPage; // apperantaly needed bc of TS??

export default class Server {
  static app = express();

  static start() {
    this.app.fs.writeFileSync(
      'visit-counter.txt',
      userCounterBakeryPage.toString()
    );

    this.app.get('/most-viewed', (req: Request, res: Response) => {
      console.log('most viewed');
      res.json({ message: 'Hello from server!' });
      // for (let property in userCounterBakeryPage) {
      //   res.send(`${property}: ${userCounterBakeryPage[property]}`);
      // }
    });
    this.app.get('/hello', (req: Request, res: Response) => {
      console.log('website counter');
      res.json({ message: 'Hello from server!' });
    });
    this.app.get(
      '/bakery-visits-count/:placeId',

      (req: Request, res: Response) => {
        console.log('bakery visits count');
        const placeId = req.params.placeId;
        userCounterBakeryPage[placeId] ||= 0;
        userCounterBakeryPage[placeId]++;
        console.log(
          'bakery counter:',
          userCounterBakeryPage[placeId],
          'place Id:',
          placeId
        );
        res.json(userCounterBakeryPage); // there is better methods than get for this for friendliness to read/intent matters/match intent/ its a big subject...
      }
    );
    this.app.get('/button-clicks', function (req, res) {
      buttonClicks++;
      console.log(buttonClicks);
    });
    this.app.get('/visits-count', function (req, res) {
      userCounterMainPage++;
      console.log('counter:', userCounterMainPage);
      res.json({ message: 'Hello from server!' });
    });
    this.app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  }
}
