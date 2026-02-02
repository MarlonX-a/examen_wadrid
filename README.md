# Instrucciones para levantar los proyectos

Este repositorio contiene varios servicios que tu amigo puede ejecutar localmente. A continuación están los requisitos y los pasos para levantar cada proyecto.

**Requisitos**
- Node.js 18+ y npm (o yarn)
- Docker y docker-compose (para la base de datos, RabbitMQ y n8n)

**1) Arrancar servicios con Docker (base de datos y microservicio)**

Desde la raíz del repo ejecuta (levanta Postgres, RabbitMQ y el `microservicio`):

```bash
docker-compose up --build
```

El `microservicio` se expone en el puerto 3003 (según `docker-compose.yml`). Si prefieres levantar solo la base de datos y RabbitMQ para ejecutar los servicios en modo desarrollador, puedes editar el `microservicio` en su carpeta y usar su `.env` local.

**2) Levantar `microservicio` en modo desarrollo (local)**

```bash
cd microservicio
npm install
# Asegúrate de tener la BD y RabbitMQ levantados (por docker-compose)
npm run start:dev
```

Si quieres usar Docker solo para la DB/RabbitMQ y ejecutar el microservicio localmente, corre primero `docker-compose up -d postgres rabbitmq` desde la raíz.

**3) Levantar `graph` (GraphQL) en modo desarrollo**

```bash
cd graph
npm install
npm run start:dev
```

`graph` es un proyecto NestJS; por defecto Nest muestra el puerto en la consola (generalmente 3000 si no está cambiado).

**4) Levantar `rest` (API REST) en modo desarrollo**

```bash
cd rest
npm install
npm run start:dev
```

`rest` es otro servicio NestJS; revisa la consola para ver el puerto en el que corre.

**5) `dominio`**

La carpeta `dominio` contiene documentación y notas (ver `dominio/revisalo.md`). No es un servicio ejecutable.

**6) n8n**

En la carpeta `n8n` hay un `docker-compose.yml`. Para levantar n8n ejecuta:

```bash
cd n8n
docker-compose up -d
```

Esto levantará la interfaz de n8n (revisa el `docker-compose.yml` dentro de `n8n` para puerto/credenciales).

**Consejos / Notas**
- Si utilizas Windows, abre PowerShell o WSL para ejecutar los comandos Docker y npm.
- Si falta alguna variable de entorno, revisa `microservicio/.env` y crea una copia local antes de iniciar.
- Para ver logs de un contenedor Docker:

```bash
docker-compose logs -f microservicio
```

**Resumen rápido**
- Levantar DB y RabbitMQ (desde la raíz): `docker-compose up --build`
- Ejecutar `microservicio` local: `cd microservicio && npm install && npm run start:dev`
- Ejecutar `graph`: `cd graph && npm install && npm run start:dev`
- Ejecutar `rest`: `cd rest && npm install && npm run start:dev`
- Levantar `n8n`: `cd n8n && docker-compose up -d`

Si quieres, puedo también crear scripts en la raíz para facilitar el arranque (por ejemplo `scripts/start-all.sh` o `docker-compose.override.yml`). ¿Deseas que lo haga?
