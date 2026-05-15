import { useCallback, useEffect, useState } from "react";
import {
  fetchRecordsByCategory,
  fetchRecordsByCategoryAndSubCategory,
  getUniqueSubCategoryIds,
  mergeRecordsById,
} from "../services/recordsApi";

export default function useSectorRecords(categoryId, language = "ka") {
  const [records, setRecords] = useState([]);
  const [availableSubCategoryIds, setAvailableSubCategoryIds] = useState([]);
  const [selectedSubCategoryIds, setSelectedSubCategoryIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Discover subcategories for this sector (all selected by default).
  useEffect(() => {
    if (categoryId == null) {
      setAvailableSubCategoryIds([]);
      setSelectedSubCategoryIds([]);
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
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId, language]);

  // Fetch records for each selected subcategory: /records/{category}/{subcategory}.
  useEffect(() => {
    if (categoryId == null) {
      setRecords([]);
      setIsLoading(false);
      return;
    }

    if (selectedSubCategoryIds.length === 0) {
      setRecords([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

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
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId, language, selectedSubCategoryIds]);

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

  return {
    records,
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
