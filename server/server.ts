import { Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');

const PORT = process.env.PORT || 3001;

let buttonClicks = 0;
let userCounterMainPage = 0;
let userCounterBakeryPage = 0;
export default class Server {
  static app = express();

  static start() {
    this.app.get('/hello', (req: Request, res: Response) => {
      res.json({ message: 'Hello from server!' });
    });
    this.app.get('/bakery-visits-count', (req: Request, res: Response) => {
      userCounterBakeryPage = userCounterBakeryPage + 1;
      console.log('bakery counter:', userCounterBakeryPage);
      res.send(userCounterBakeryPage.toString()); // there is better methods than get for this for friendliness to read/intent matters/match intent/ its a big subject...
    });
    this.app.get('/button-clicks', function (req, res) {
      buttonClicks = buttonClicks + 1;
      console.log(buttonClicks);
    });
    this.app.get('/m', function (req, res) {
      userCounterMainPage = userCounterMainPage + 1;
      console.log('counter:', userCounterMainPage);
    });
    this.app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  }
}
