# Broken Office (Back-end) 
https://d1w75bllqpy7f0.cloudfront.net/

Broken Office is a mobile first application that reports problems and damaged items in the offices or homes of "Globers" (workers of Globant) using geolocation and machine learning (with a trained AI).

## Features

The project includes the following features:

- Four types of users: 
  - Standard: Can create a report and see the history of his reports
  - Service: Can resolve reports and see the reports where he worked on
  - Admin: CRUD of the company offices and CRUD of users (except other admins)
  - SuperAdmin: CRUD of the company offices and CRUD of users (including admins)
- Every User can create a report and see the history of his reports
- Every User can edit his profile and password, storing his profile picture using [Google Cloud Storage](https://cloud.google.com/storage) 
- At the report creation you can add a picture and with machine learning an AI will analyze the photo and determine the type of product broken
- At the report creation the picture is stored using [Google Cloud Storage](https://cloud.google.com/storage) 
- At the report creation you can be geolocalized using [Google Geolocation API](https://developers.google.com/maps/documentation/geolocation/overview?hl=en)
- At the report creation the closest offices will be determine using [MongoDB Geospacial Queries](https://www.mongodb.com/docs/manual/geospatial-queries/)
- The report will be assigned to the Service working on the chosen office with the least amount of active reports
- If the report is created by a Service User in an office where he also works on, then he won't be assigned his own report to solve it
- If the report is created successfully, an email will be sent using [Nodemailer](https://nodemailer.com/about/)
- After the report is created, and the Service User accept it, a live chat can be generated between them using [Socket.IO](https://socket.io/)
- The report can be shared to any email
- When the report is finished (resolved or rejected) an email is sent to the Standard User
- If you forget your password, you can write your email, and if it's a valid email and exists in the DB, a link will be generated and sent to your email. The link will contain a token and will be valid for just 2 hours (using [MongoDB TTL](https://www.mongodb.com/docs/manual/tutorial/expire-data/)). After the password is changed, you will recieve an email with that information. 
- PWA (Progressive web app) was implemented, so if you logged in and lose internet connection, you will still be able to see information on the web app

## Technologies Used

The project was built using the following technologies:

- Node.js
- Express
- MongoDB Atlas - Mongoose
- JWT
- Nodemailer
- Google Cloud Storage and Maps
- React 
- Redux
- MUI
- Socket.IO
- PWA
- Deploy using AWS 

## Getting Started

To run the project, follow these steps:

1. Clone this repository and the [back-end repo](https://github.com/pedrofanelli/BrokenOffice-back)
2. Register and create a new Cluster using [MongoDB Atlas](https://www.mongodb.com/atlas/database)
3. Register in the [Google Cloud Website](https://cloud.google.com/)
4. Create a new Bucket in Google Cloud Storage and a Service Account (linked to your own)
5. Enable the API Geolocation in Google Cloud
6. To use Nodemailer, generate a KEY in your gmail account from which you want to send the emails
7. Register 
8. 
9. 
10. Replace the `API_KEY` variable in a `.env` file with your API key
11. Run in your terminal the following commands:

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

