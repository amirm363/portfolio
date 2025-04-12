"use server";

import { UserConfig } from "@/lib/types/user.types";
import { userConfig } from "@/mock-db";
import { unstable_cache } from "next/cache";

// Create a cached version of the getUserConfig function
const getCachedUserConfig = unstable_cache(
  async (userId: string, select?: Partial<Record<keyof UserConfig, boolean>>) => {
    try {
      console.log("EXPENSIVE OPERATION LOG");
      return await userConfig.findUnique(userId, select);
    } catch (error) {
      console.error("Error fetching user config:", error);
      throw new Error("Failed to get user config");
    }
  },
  // Cache key generation function - this creates unique keys based on arguments
  ["user-config"],
  // Cache options
  {
    revalidate: 3600, // Cache for 1 hour (in seconds)
    tags: ["user-config"], // Add a tag for cache invalidation
  }
);

export async function getInfo(select?: Partial<Record<keyof UserConfig, boolean>>) {
  const userId = process.env.USER_ID;
  if (!userId) {
    return undefined;
  }

  try {
    // Use the cached function
    const user = await getCachedUserConfig(userId, select);
    console.log("🚀 ~ get-info.action.ts:8 ~ getInfo ~ user:", user);
    return user;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
