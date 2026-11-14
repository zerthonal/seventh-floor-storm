export type DepartureStage = "apartment" | "landing" | "liftOpen" | "descending" | "ground" | "street" | "car" | "starting" | "done";
export type DepartureAction = "leaveApartment" | "callLift" | "descend" | "arrive" | "leaveBuilding" | "enterCar" | "startEngine" | "engineReady";

const steps: Partial<Record<DepartureStage, Partial<Record<DepartureAction, DepartureStage>>>> = {
  apartment: { leaveApartment: "landing" },
  landing: { callLift: "liftOpen" },
  liftOpen: { descend: "descending" },
  descending: { arrive: "ground" },
  ground: { leaveBuilding: "street" },
  street: { enterCar: "car" },
  car: { startEngine: "starting" },
  starting: { engineReady: "done" },
};

export function departureNext(stage: DepartureStage, action: DepartureAction): DepartureStage {
  return steps[stage]?.[action] ?? stage;
}
export function canBeginMainGame(stage: DepartureStage) { return stage === "done"; }