# Base image: PostgreSQL 15 on Alpine
FROM postgres:15-alpine

# Copy initialization script
COPY init.sql /docker-entrypoint-initdb.d/init.sql

# Documentation: container listens on port 5432
EXPOSE 5432