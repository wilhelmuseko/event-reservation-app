# Event reservation RESTful API
RESTful API for event reservation

## Getting started

### Prerequisites
1. [Node.js v12.0.0](https://nodejs.org/download/release/v12.0.0/)
2. [Postgres 13.x](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
3. [Postman](https://www.postman.com/downloads/)
4. [VS Code](https://code.visualstudio.com/download)

Install the required software.

Check the installed software, execute this command to check.
```
node --version
npm --version
postgres --version
psql --version
```
----------

### Installation
- Clone this repository to your local machine.
- From terminal in the project root, run this command to create the database.\
```python
psql -U postgres -f config/script.sql
```
- Input the password that you set during installation.
- From terminal in the project root, run `npm install` to download the node packages.
- Go to `config/postgres.js` and update the password accordingly.
- To run the project, run command `npm start` and server will start at port 5000.
- Access the API using http://localhost:5000/.
- Read the technical specification file to check the available API for this project.
- You can use Postman to test the API.

