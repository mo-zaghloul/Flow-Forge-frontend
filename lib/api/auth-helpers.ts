import { auth } from "@clerk/nextjs/server";

/**
 * Get auth headers for server-side API requests
 * Use in Server Components, Server Actions, and API Routes
 */
export async function getServerAuthHeaders(): Promise<Record<string, string>> {
  const { getToken, userId } = await auth();
  const token = await getToken();

  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (userId) {
    headers["X-User-Id"] = userId;
  }

  return headers;
}

/**
 * Get auth headers for client-side API requests
 * Use in Client Components ('use client')
 */
export async function getClientAuthHeaders(
  getToken: () => Promise<string | null>,
  userId: string | null | undefined
): Promise<Record<string, string>> {
  const token = await getToken();

  const headers: Record<string, string> = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (userId) {
    headers["X-User-Id"] = userId;
  }

  return headers;
}
