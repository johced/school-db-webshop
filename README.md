# School project - 3 team members

Heroku: https://school-db-webshop.herokuapp.com/

Note: In order to be able to add/edit products on our Heroku page, we have to manually give your user an admin role in the database. 

## Important note

If you want to clone repo and try it out on localhost, do so from develop branch.

We have developed the project in localhost environment, when deploying to Heroku, we needed to add uploads folder and change some links. Hence we chose to only work with feature/branches -> develop and then work directly within main when updating live/Heroku deployment. 

## Background

Simple webshop with CRUD functionality.
Part of Agile course -> SCRUM - we are using Asana for the scrumboard. 

## Work process

1. Allways work in a feature/branch
2. Before pushing feature/branch and merging to develop - go through our SCRUM board together
3. camelCase on routes and functions.

## Setup

1. Clone our repo
2. Set up your .env file with: 
  - PORT
  - MONGO_URI (you need MongoDB) 
  - SECRET_KEY (whatever)
  - USERMAIL (for reset password and payment, if you use some other mailservice - add correct information in controllers)
  - USERPASSWORD (your email password) 
  - STRIPE_SECRET_KEY (your testing key from STRIPE, don't forget to update the "open" key in checkout.ejs row 60) 
 
3. npm init
4. npm run devStart (to run localserver and nodemon) 
5. npm run index-css (to run node-sass-middleware)


## Extra notes 

We have followed what we think is a good MVC structure, so that it is easy to work with the project. When using populate and have controller over shoppingcart and admins added products, we found that having three model worked the best for us. We use a cart, product and user model in the project. 

This is not a design competition site, but it looks ok for a backend project. :-) 

