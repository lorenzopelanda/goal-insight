# Goal Insight
## Description

This is a university project developed during my Bachelor's degree program. It is a full-stack web application designed for football fans to follow their favorite players and teams.

The project includes both front-end and back-end components, featuring:

- A **single-page front-end** built with **HTML, CSS, JavaScript, and Bootstrap**.
- Two databases:
  - **MongoDB** for managing large volumes of data.
  - **PostgreSQL** for handling smaller structured datasets.
- Four servers:
  - A **Spring Boot server** connected to the PostgreSQL database.
  - An **Express.js server** connected to the MongoDB database.
  - A **main Express.js server** that communicates with the other servers and serves data to the front-end in JSON format.
  - An **Express.js server with Socket.IO** to manage a live chat between users.

The servers exchange data using JSON, allowing users to view requested information seamlessly and interact with other fans through the integrated chat feature.

This project was created to practice the integration of multiple technologies and databases within a scalable web application architecture while applying principles of clean code and effective teamwork.

