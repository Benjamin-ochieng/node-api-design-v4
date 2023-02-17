import request from "supertest";
import app from "../server";

describe("api authentication", () => {
  const can = {
    name: "pamplemousse",
    ounces: 12,
  };
  describe("demo test", () => {
    it("should pass string check", () => {
      expect(typeof can.name).toBe("string");
    });

    it("should pass number check", () => {
      expect(typeof can.ounces).toBe("number");
    });
  });
  describe("api auth", () => {
    it("should be locked for unauthenticated requets", async () => {
      const res = await request(app).get("/api/products");
      expect(res.statusCode).toBe(401);
    });
  });
});
