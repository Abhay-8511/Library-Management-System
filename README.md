# Library-Management-System

New Problems,New Solution.

This is a Library Management API Backend for the Management of Users and Books Using ExpressJS.

# Routes and the End-Points

## /users
GET: Get all the list of users in the system
POST: Create/Register a new user

## /users/{id}
GET: Get a user by their ID
PUT: Updating a user by their ID
DELETE: Deleting a user by their ID (check if the user still has an issued book) && {is there any fine/penalty to be collected}

## /users/subscription-details/{id}
GET: Get a user subscription details by their ID
    >> Date of subscription
    >> Valid till?
    >> Fine if any?



## /books
GET: Get all the books in the system
POST: Add a new book to the system

## /books/{id}
GET: Get a book by its ID
PUT: Update a book by its ID
DELETE: Delete a book byits ID

## /books/issued
GET:Get all the issued books

## /books/issued/withFine
GET: Get all issued books with their fine amount

## Subscription Types
    >> Silver (3 months)
    >> Gold (6 months)
    >> Platinum (12 months)

> > If a user missed the renewal date, then user should be collected with $100
> > If a user misses the subscription, then user is expected to pay $100
> > If a user misses the both renewal date & subscription, then the collected amount should be $200

## Commands:
npm init
npm i express
npm i nodemon --save-dev 

npm run dev - to start the application

To restore Node Modules files and package-lock-.json ----> npm i/npm install