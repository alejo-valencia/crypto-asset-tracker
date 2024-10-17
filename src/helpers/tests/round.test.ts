import roundToNearestHour from "../round";

describe("roundToNearestHour", () => {
  it("should round down to the nearest hour if the time is before the half-hour mark", () => {
    const date = new Date("2024-10-16T14:15:00Z");
    const result = roundToNearestHour(date);

    expect(result.getUTCHours()).toBe(14);
    expect(result.getUTCMinutes()).toBe(0);
    expect(result.getUTCSeconds()).toBe(0);
    expect(result.getUTCMilliseconds()).toBe(0);
  });

  it("should round down to the nearest hour if the time is after the half-hour mark", () => {
    const date = new Date("2024-10-16T14:45:00Z");
    const result = roundToNearestHour(date);

    expect(result.getUTCHours()).toBe(14);
    expect(result.getUTCMinutes()).toBe(0);
    expect(result.getUTCSeconds()).toBe(0);
    expect(result.getUTCMilliseconds()).toBe(0);
  });

  it("should handle edge cases like exactly on the hour", () => {
    const date = new Date("2024-10-16T15:00:00Z");
    const result = roundToNearestHour(date);

    expect(result.getUTCHours()).toBe(15);
    expect(result.getUTCMinutes()).toBe(0);
    expect(result.getUTCSeconds()).toBe(0);
    expect(result.getUTCMilliseconds()).toBe(0);
  });
});
