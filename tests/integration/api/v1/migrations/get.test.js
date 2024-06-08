import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await database.clearDatabase();
});

test("GET to /api/v1/migrations should return status code 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);

  const statusResponse = await fetch("http://localhost:3000/api/v1/status");
  const statusBody = await statusResponse.json();

  expect(statusBody.dependencies.database.active_connections).toBe(1);
});
