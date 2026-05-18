import { useCallback, useEffect, useState } from "react";
import {
  fetchRecordsByCategory,
  fetchRecordsByCategoryAndSubCategory,
  getUniqueSubCategoryIds,
  mergeRecordsById,
} from "../services/recordsApi";

function scopeKey(categoryId, language) {
  return `${categoryId ?? ""}:${language}`;
}

export default function useSectorRecords(categoryId, language = "ka") {
  const hasCategory = categoryId != null;
  const currentScopeKey = scopeKey(categoryId, language);

  const [records, setRecords] = useState([]);
  const [availableSubCategoryIds, setAvailableSubCategoryIds] = useState([]);
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
  const [isDiscoveringSubCategories, setIsDiscoveringSubCategories] =
    useState(hasCategory);
  const [isFetchingRecords, setIsFetchingRecords] = useState(false);
  const [error, setError] = useState(null);

  const [prevScopeKey, setPrevScopeKey] = useState(currentScopeKey);
  if (currentScopeKey !== prevScopeKey) {
    setPrevScopeKey(currentScopeKey);
    setRecords([]);
    setAvailableSubCategoryIds([]);
    setSelectedSubCategoryIds([]);
    setError(null);
    setIsDiscoveringSubCategories(hasCategory);
    setIsFetchingRecords(false);
  }

  const selectedKey = selectedSubCategoryIds.join(",");
  const [prevSelectedKey, setPrevSelectedKey] = useState(selectedKey);
  if (selectedKey !== prevSelectedKey) {
    setPrevSelectedKey(selectedKey);
    if (hasCategory && selectedSubCategoryIds.length > 0) {
      setIsFetchingRecords(true);
      setError(null);
    }
  }

  // Discover subcategories for this sector (all selected by default).
  useEffect(() => {
    if (!hasCategory) {
      return;
    }

    let isMounted = true;

    fetchRecordsByCategory(categoryId, language)
      .then((data) => {
        if (!isMounted) {
          return;
        }
        const ids = getUniqueSubCategoryIds(data);
        setAvailableSubCategoryIds(ids);
        setSelectedSubCategoryIds(ids);
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }
        setAvailableSubCategoryIds([]);
        setSelectedSubCategoryIds([]);
        setError(err);
        if (import.meta.env.DEV) {
          console.error("[recordsApi] subcategory discovery failed:", err);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsDiscoveringSubCategories(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId, language, hasCategory]);

  // Fetch records for each selected subcategory: /records/{category}/{subcategory}.
  useEffect(() => {
    if (!hasCategory || selectedSubCategoryIds.length === 0) {
      return;
    }

    let isMounted = true;

    Promise.all(
      selectedSubCategoryIds.map((subCategoryId) =>
        fetchRecordsByCategoryAndSubCategory(
          categoryId,
          subCategoryId,
          language,
        ),
      ),
    )
      .then((groups) => {
        if (!isMounted) {
          return;
        }
        setRecords(mergeRecordsById(groups));
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }
        setRecords([]);
        setError(err);
        if (import.meta.env.DEV) {
          console.error("[recordsApi] sector fetch failed:", err);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsFetchingRecords(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId, language, selectedSubCategoryIds, hasCategory]);

  const toggleSubCategory = useCallback((subCategoryId) => {
    setSelectedSubCategoryIds((current) =>
      current.includes(subCategoryId)
        ? current.filter((id) => id !== subCategoryId)
        : [...current, subCategoryId].sort((a, b) => a - b),
    );
  }, []);

  const isSubCategorySelected = useCallback(
    (subCategoryId) => selectedSubCategoryIds.includes(subCategoryId),
    [selectedSubCategoryIds],
  );

  const isLoading = isDiscoveringSubCategories || isFetchingRecords;
  const visibleRecords =
    !hasCategory || selectedSubCategoryIds.length === 0 ? [] : records;

  return {
    records: visibleRecords,
    availableSubCategoryIds,
    selectedSubCategoryIds,
    setSelectedSubCategoryIds,
    toggleSubCategory,
    isSubCategorySelected,
    isLoading,
    error,
    categoryId,
  };
}
