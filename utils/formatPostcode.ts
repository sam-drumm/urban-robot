export function formatPostcode(postcode: string): string {
  postcode = postcode.replace(/\s+/g, '').toUpperCase();
  return postcode.substring(0, 2) + ' ' + postcode.substring(2);
}