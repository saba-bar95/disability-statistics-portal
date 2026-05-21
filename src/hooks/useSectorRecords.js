import { useCallback, useEffect, useMemo, useState } from "react";
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

  const [cacheBySubCategory, setCacheBySubCategory] = useState({});
  const [availableSubCategoryIds, setAvailableSubCategoryIds] = useState([]);
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
  const [isDiscoveringSubCategories, setIsDiscoveringSubCategories] =
    useState(hasCategory);
  const [error, setError] = useState(null);

  const [prevScopeKey, setPrevScopeKey] = useState(currentScopeKey);
  if (currentScopeKey !== prevScopeKey) {
    setPrevScopeKey(currentScopeKey);
    setCacheBySubCategory({});
    setAvailableSubCategoryIds([]);
    setSelectedSubCategoryIds([]);
    setError(null);
    setIsDiscoveringSubCategories(hasCategory);
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

  // Fetch only subcategories that are selected but not yet cached.
  useEffect(() => {
    if (!hasCategory || selectedSubCategoryIds.length === 0) {
      return;
    }

    const missingIds = selectedSubCategoryIds.filter(
      (id) => cacheBySubCategory[id] == null,
    );
    if (missingIds.length === 0) {
      return;
    }

    let isMounted = true;

    Promise.all(
      missingIds.map((subCategoryId) =>
        fetchRecordsByCategoryAndSubCategory(
          categoryId,
          subCategoryId,
          language,
        ).then((data) => ({ subCategoryId, data })),
      ),
    )
      .then((results) => {
        if (!isMounted) {
          return;
        }
        setCacheBySubCategory((prev) => {
          const next = { ...prev };
          for (const { subCategoryId, data } of results) {
            next[subCategoryId] = data;
          }
          return next;
        });
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }
        setError(err);
        if (import.meta.env.DEV) {
          console.error("[recordsApi] sector fetch failed:", err);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [
    categoryId,
    language,
    hasCategory,
    selectedSubCategoryIds,
    cacheBySubCategory,
  ]);

  const records = useMemo(() => {
    if (!hasCategory || selectedSubCategoryIds.length === 0) {
      return [];
    }
    const groups = selectedSubCategoryIds
      .map((id) => cacheBySubCategory[id])
      .filter((group) => Array.isArray(group));
    if (groups.length === 0) {
      return [];
    }
    return mergeRecordsById(groups);
  }, [hasCategory, selectedSubCategoryIds, cacheBySubCategory]);

  const isFetchingRecords = useMemo(() => {
    if (!hasCategory || selectedSubCategoryIds.length === 0) {
      return false;
    }
    return selectedSubCategoryIds.some((id) => cacheBySubCategory[id] == null);
  }, [hasCategory, selectedSubCategoryIds, cacheBySubCategory]);

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

  const isLoading =
    isDiscoveringSubCategories ||
    (selectedSubCategoryIds.length > 0 &&
      records.length === 0 &&
      isFetchingRecords);

  return {
    records,
    availableSubCategoryIds,
    selectedSubCategoryIds,
    setSelectedSubCategoryIds,
    toggleSubCategory,
    isSubCategorySelected,
    isLoading,
    isFetchingRecords,
    error,
    categoryId,
  };
}
