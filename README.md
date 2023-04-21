# Broken Office (Back-end)

Broken Office is a mobile first application that reports problems and damaged items in the offices or homes of "Globers" (workers of Globant) using geolocation and machine learning (with a trained AI).

## Features

The project includes the following features:

- Four types of users: 
  - Standard: Can create a report and see the history of his reports.
  - Service: Can resolve reports and see the reports where he worked on.
  - Admin: CRUD of the company offices and CRUD of users (expect other admins).
  - SuperAdmin: CRUD of the company offices and CRUD of users (including admins).
- Every user can create a report and see the history of his reports.
- At the report creation you can add a picture and with machine learning an AI will analyze the photo and determine the type of product broken.
- At the report creation the picture is stored using [Google Cloud Storage](https://cloud.google.com/storage) 
- At the report creation you can be geolocalized using [Google Geolocation API](https://developers.google.com/maps/documentation/geolocation/overview?hl=en)
- At the report creation the closest offices will be determine using [MongoDB Geospacial Queries](https://www.mongodb.com/docs/manual/geospatial-queries/)
- 

- See all the available smartphones
- Allow users to create an account and log in
- Fill the cart and make the checkout to buy any smartphone available (receiving an email after the successful purchase)
- Special type of user, the admin
- Admins can edit categories, delete/add products, see all the client orders
- Admins can delete users, or promote them to be admin

## Technologies Used

The project was built using the following technologies:

- Node.js
- Express
- PostgreSQL - Sequelize
- JWT
- Nodemailer
- React (Vite.js)
- Redux
- MUI
- Device Specs API

## Getting Started

To run the project, follow these steps:

1. Clone the repository
2. Register for a free API key on the [Device Specs Website](https://www.device-specs.io/categories/smartphones)
3. Replace the `API_KEY` variable in a `.env` file with your API key
4. Run in your terminal the following commands:

cd back | cd front
--------|---------
npm i   | npm i
npm run server   | npm run dev

## Credits

This project was created by:

* Guido Bonesi
* Cristian Blanco
* Pedro Fanelli
* Matias Orlando
* German Cuevas 

