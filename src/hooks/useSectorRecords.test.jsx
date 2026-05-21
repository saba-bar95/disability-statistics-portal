import { act, renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useSectorRecords from "./useSectorRecords";

vi.mock("../services/recordsApi", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    fetchRecordsByCategory: vi.fn(),
    fetchRecordsByCategoryAndSubCategory: vi.fn(),
  };
});

import {
  fetchRecordsByCategory,
  fetchRecordsByCategoryAndSubCategory,
} from "../services/recordsApi";

const discoveryPayload = [
  { ID: 1, sub_category: 10 },
  { ID: 2, sub_category: 20 },
];

describe("useSectorRecords", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    fetchRecordsByCategory.mockResolvedValue(discoveryPayload);
    fetchRecordsByCategoryAndSubCategory.mockImplementation(
      (_categoryId, subCategoryId) =>
        Promise.resolve(
          discoveryPayload.filter((r) => r.sub_category === subCategoryId),
        ),
    );
  });

  it("discovers subcategories and merges selected records", async () => {
    const { result } = renderHook(() => useSectorRecords(1, "ka"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.availableSubCategoryIds).toEqual([10, 20]);
    expect(result.current.selectedSubCategoryIds).toEqual([10, 20]);
    expect(result.current.records.map((r) => r.ID).sort()).toEqual([1, 2]);
  });

  it("toggleSubCategory adds and removes subcategory selection", async () => {
    const { result } = renderHook(() => useSectorRecords(1, "ka"));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.toggleSubCategory(10);
    });

    expect(result.current.selectedSubCategoryIds).toEqual([20]);
    expect(result.current.records.map((r) => r.ID)).toEqual([2]);

    act(() => {
      result.current.toggleSubCategory(10);
    });

    expect(result.current.selectedSubCategoryIds).toEqual([10, 20]);
  });
});
