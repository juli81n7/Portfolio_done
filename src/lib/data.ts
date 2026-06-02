// src/lib/portfolioData.ts
import { supabase } from "./supabaseClient";

export async function getProcessedPortfolio() {
  const { data, error } = await supabase.from("portfolio").select("*");

  if (error) {
    throw new Error(error.message);
  }

  // Sort by id ascending, then highlighted descending
  data.sort((a, b) => a.id - b.id);
  data.sort((a, b) => b.highlighted - a.highlighted);

  // Filter active items
  const filteredData = data.filter((item) => item.active);

  // Process tags and remove all <br> tags from string fields
  const processedData = filteredData.map((item) => {
    // Remove all <br> tags from string fields
    const cleanItem = Object.fromEntries(
      Object.entries(item).map(([key, value]) =>
        typeof value === "string"
          ? [key, value.replace(/<br\s*\/?>/gi, "")]
          : [key, value]
      )
    );

    // Process tagClasses
    const tagClasses = Array.isArray(cleanItem.sortingTags)
      ? cleanItem.sortingTags
          .map((tag) => tag.toLowerCase().replace(/\s+/g, ""))
          .join(" ")
      : (cleanItem.sortingTags || "")
          .split(",")
          .map((tag) => tag.toLowerCase().replace(/\s+/g, ""))
          .join(" ");

    return {
      ...cleanItem,
      tagClasses,
    };
  });

  return processedData;
}
