import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET to /api/v1/status should return status code 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const updatedAt = responseBody.updated_at;
  const parsedUpdatedAt = new Date(updatedAt).toISOString();
  expect(parsedUpdatedAt).toBe(updatedAt);

  expect(responseBody.dependencies.database.version).toEqual("20.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.active_connections).toEqual(1);
});
