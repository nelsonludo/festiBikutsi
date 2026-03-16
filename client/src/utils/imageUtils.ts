/**
 * Formats an image or video URL.
 * If the URL is already an external link (starts with http), it returns it as-is.
 * If the URL starts with /uploads, it returns it as-is.
 * Otherwise, it prepends /uploads/ to the URL.
 * 
 * @param url The image or video URL from the database
 * @returns The formatted URL
 */
export const formatImageUrl = (url?: string): string => {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  if (url.startsWith("/uploads")) return url;
  return `/uploads/${url}`;
};
