## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Step by step

1. Install Nest CLI globally

   ```bash
   $ npm i -g @nestjs/cli
   ```

2. Install Prisma CLI globally

   ```bash
   $ npm i -g prisma
   ```

3. Install dependencies

   ```bash
   $ npm install
   ```

   or

   ```bash
   $ yarn
   ```

4. Create a new database in SQLITE

   ```bash
   $ yarn migration
   ```

   or

   ```bash
   $ npm run migration
   ```

5. Run the seeders

   ```bash
   $ yarn seed
   ```

   or

   ```bash
   $ npm run seed
   ```

6. Run the app

   ```bash
   # development
   $ yarn dev

   # production 
   $ yarn start
   ```
   or 
   
   ```bash
    # development
    $ npm run dev

    # production
    $ npm run start
    ```
## Routes
- GET api/quiz
- GET api/quiz/:id

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
