import { createRouter } from "next-connect";
import database from "infra/database.js";
import controller from "infra/controller.js";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function databaseVersion() {
  const result = await database.query("SHOW server_version;");
  const { server_version } = result.rows[0];
  return server_version;
}

async function databaseMaxConnections() {
  const result = await database.query("SHOW max_connections;");
  const { max_connections } = result.rows[0];
  return parseInt(max_connections);
}

async function databaseActiveConnections() {
  const databaseName = process.env.POSTGRES_DB;
  const result = await database.query({
    text: "SELECT COUNT(*)::int AS active_connections FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const { active_connections } = result.rows[0];
  return active_connections;
}

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();
  const version = await databaseVersion();
  const maxConnections = await databaseMaxConnections();
  const activeConnections = await databaseActiveConnections();

  response.json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version,
        max_connections: maxConnections,
        active_connections: activeConnections,
      },
    },
  });
}
