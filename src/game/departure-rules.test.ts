import { describe, expect, it } from "vitest";
import { departureNext, canBeginMainGame, type DepartureStage } from "./departure-rules";

describe("departure before the main game", () => {
  it("leaving the apartment leads to the landing, not the main game", () => {
    expect(departureNext("apartment", "leaveApartment")).toBe("landing");
    expect(canBeginMainGame("landing")).toBe(false);
  });
  it("requires taking the lift before leaving the building", () => {
    expect(departureNext("landing", "leaveBuilding")).toBe("landing");
    expect(departureNext("landing", "callLift")).toBe("liftOpen");
    expect(departureNext("liftOpen", "descend")).toBe("descending");
    expect(departureNext("descending", "arrive")).toBe("ground");
  });
  it("requires reaching the street before entering the car", () => {
    expect(departureNext("ground", "enterCar")).toBe("ground");
    expect(departureNext("ground", "leaveBuilding")).toBe("street");
    expect(departureNext("street", "enterCar")).toBe("car");
  });
  it("only starts the main game after the engine starts", () => {
    for (const stage of ["apartment", "landing", "liftOpen", "descending", "ground", "street", "car", "starting"] as DepartureStage[]) {
      expect(canBeginMainGame(stage)).toBe(false);
    }
    expect(departureNext("car", "startEngine")).toBe("starting");
    expect(departureNext("starting", "engineReady")).toBe("done");
    expect(canBeginMainGame("done")).toBe(true);
    expect(departureNext("street", "startEngine")).toBe("street");
  });
});