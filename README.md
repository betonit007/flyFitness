# Fly-Fitness

![Project Image](https://res.cloudinary.com/dbb1t68vt/image/upload/v1606335518/flyfit_ps4rg7.png)

> Fly Fitness - Ecommerce Website, http://flyfitness.herokuapp.com/
---

### Table of Contents

- [Description](#description)
- [How To Use](#how-to-use)
- [References](#references)
- [License](#license)
- [Author Info](#author-info)

## Description

Fly Fitnes is a MERN stack, ecommerce website that utilizes Redux along with its new hooks: useSelector and useDispatch.

#### Technologies

- MERN Stack - Mongo, Express, React and Node.js
- Redux - is an open-source JavaScript library for managing application state. 
- Paypal API

[Back To The Top](#Fly-Fitness)

---

## How To Use

#### Installation, in root directory run
```terminal 
    npm install
```


## Prerequirements
- [MongoDB](https://mongodb.com)
- [PayPal](https://developer.paypal.com/home)

### Prepare your credentials, run the following scripts in the root directory:

You need to add a JWT_SECRET in .env to connect to MongoDB

```terminal
$ echo "JWT_SECRET=YOUR_JWT_SECRET" >> ./.env
```

Secondly, you will need a MongoUri
```terminal
$ echo "MONGO_URI=YOUR_MONGO_URI" >> ./.env
```

Then, enter the crendentials for Paypal
```terminal
$ echo -e "PAYPAL_CLIENT_ID=YOUR_PAYPAL_CLIENT_ID" >> ./.env
```

Set your environment for developement purposes
```terminal
$ echo "NODE_ENV=development" >> ./.env
```

And finally, set your PORT
```terminal
$ echo "PORT=5000" >> ./.env
```

## Start
```terminal
$ npm run dev
```


[Back To The Top](#Fly-Fitness)

---
## References
[Github Repo](https://github.com/betonit007/mernChat)

[Back To The Top](#Fly-Fitness)

---

## License

MIT License

Copyright (c) [2020] [Tim Nagorski]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#Fly-Fitness)

---

## Author Info

- Github - [betonit007](https://github.com/betonit007)
- LinkedIn - [Tim Nagorski](https://www.linkedin.com/in/tim-nagorski-7a188091/)
- Website - [The Fly Dev](https://theflydev.com)

[Back To The Top](#Fly-Fitness)
