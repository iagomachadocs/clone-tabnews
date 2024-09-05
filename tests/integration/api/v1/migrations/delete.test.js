test("DELETE to /api/v1/migrations should return status code 405", async () => {
  const migrationsResponse = await fetch(
    "http://localhost:3000/api/v1/migrations",
    { method: "DELETE" },
  );
  expect(migrationsResponse.status).toBe(405);

  const statusResponse = await fetch("http://localhost:3000/api/v1/status");
  const statusBody = await statusResponse.json();

  expect(statusBody.dependencies.database.active_connections).toBe(1);
});
