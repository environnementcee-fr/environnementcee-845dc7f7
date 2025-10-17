import { useEffect, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

interface UseFormPersistenceOptions {
  formKey: string;
  watch: UseFormReturn["watch"];
  setValue: UseFormReturn["setValue"];
  enabled?: boolean;
}

export const useFormPersistence = ({
  formKey,
  watch,
  setValue,
  enabled = true,
}: UseFormPersistenceOptions) => {
  // Save form data to localStorage
  const saveFormData = useCallback(() => {
    if (!enabled) return;
    
    const formData = watch();
    try {
      localStorage.setItem(formKey, JSON.stringify(formData));
      localStorage.setItem(`${formKey}_timestamp`, new Date().toISOString());
    } catch (error) {
      console.warn("Failed to save form data:", error);
    }
  }, [formKey, watch, enabled]);

  // Load form data from localStorage
  const loadFormData = useCallback(() => {
    if (!enabled) return false;

    try {
      const savedData = localStorage.getItem(formKey);
      const timestamp = localStorage.getItem(`${formKey}_timestamp`);
      
      if (savedData && timestamp) {
        const savedDate = new Date(timestamp);
        const now = new Date();
        const hoursDiff = (now.getTime() - savedDate.getTime()) / (1000 * 60 * 60);
        
        // Only restore if saved within last 24 hours
        if (hoursDiff < 24) {
          const data = JSON.parse(savedData);
          Object.keys(data).forEach((key) => {
            setValue(key as any, data[key]);
          });
          return true;
        } else {
          // Clear old data
          clearFormData();
        }
      }
    } catch (error) {
      console.warn("Failed to load form data:", error);
    }
    return false;
  }, [formKey, setValue, enabled]);

  // Clear form data from localStorage
  const clearFormData = useCallback(() => {
    try {
      localStorage.removeItem(formKey);
      localStorage.removeItem(`${formKey}_timestamp`);
    } catch (error) {
      console.warn("Failed to clear form data:", error);
    }
  }, [formKey]);

  // Auto-save on form changes (debounced)
  useEffect(() => {
    if (!enabled) return;

    const subscription = watch(() => {
      const timeoutId = setTimeout(saveFormData, 500);
      return () => clearTimeout(timeoutId);
    });

    return () => subscription.unsubscribe();
  }, [watch, saveFormData, enabled]);

  // Load on mount
  useEffect(() => {
    if (enabled) {
      loadFormData();
    }
  }, [loadFormData, enabled]);

  return {
    saveFormData,
    loadFormData,
    clearFormData,
  };
};
