export const generateSlug = (text:string | null) => {
  if (!text) return '';
  
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars (except -)
    .replace(/\-\-+/g, '-')         // Replace multiple — with single -
    .replace(/^-+/, '')             // Trim — from start
    .replace(/-+$/, '');            // Trim — from end
};