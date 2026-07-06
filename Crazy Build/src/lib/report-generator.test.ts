import { describe, expect, it } from "vitest";
import { formatBytes } from "./report-generator";

describe("formatBytes", () => {
  it("formats byte sizes into human-readable strings", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(1024)).toBe("1 KB");
    expect(formatBytes(1536)).toBe("1.5 KB");
    expect(formatBytes(1024 * 1024 * 2)).toBe("2 MB");
  });
});
