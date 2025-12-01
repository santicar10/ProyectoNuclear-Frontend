/**
 * Transforma URLs de Dropbox a URLs directas de imagen
 */
export const getDirectImageUrl = (url) => {
  if (!url) return "/placeholder-child.jpg";
  
  if (url.includes('dropbox.com')) {
    return url.replace('dl=0', 'raw=1').replace('dl=1', 'raw=1');
  }
  
  return url;
};