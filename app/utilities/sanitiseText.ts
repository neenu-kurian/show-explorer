export function sanitiseText(htmlString: string): string {
  const plainText = htmlString?.replace(/<[^>]+>/g, "");
  return plainText || "";
}
