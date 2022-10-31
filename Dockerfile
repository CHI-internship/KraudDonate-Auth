FROM postgres:15.0

ENV POSTGRES_PASSWORD root
ENV POSTGRES_DB auth
ENV PGDATA=/var/lib/postgresql/data/pgdata