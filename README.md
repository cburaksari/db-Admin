# DBAdmin Project
With this project, using the table information added to the datatable, tables can be updated, deleted, and added to the database in real time. Also columns can be specified.
Every operation affects the database.

## Important Note :
```shell
Before entering the pgadmin console, the user must run the script.sql file located in the main folder. Otherwise, database errors may occur.
```

## DB and Backend and Frontend infos
```shell
Spring info-port : 8081
PgAdmin info-port : 16543:80
Postgresql info-port : 5432:5432

- POSTGRESQL HOST=dbadmin-postgres
- POSTGRESQL DB=dbadmin
- POSTGRESQL USER=dbadmin
- POSTGRESQL PASSWORD=dbadmin

- PGADMIN PASSWORD=postgres

- frontend base URL = http://localhost:8081/..

```

## Prerequisites
* `Database` - PostgreSQL, PGAdmin
* `Backend` - Spring Boot
* `Frontend` - Angular, Typescript
* `OS-Level Virtualization` - Docker
* `ORM` - Spring Data JPA

### Running the services

```shell
docker-compose up --build
```

### Things to do
When the user adds a new table from the interface, a table with this name is created in the database. The same actions will be provided 
when the table is updated and deleted.
