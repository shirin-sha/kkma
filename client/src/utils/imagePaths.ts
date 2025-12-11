/**
 * Image path utility for converting kkma.net URLs to local public folder paths
 */

/**
 * Converts a kkma.net image URL to a local public folder path
 * @param url - The full kkma.net URL or local path
 * @returns Local public folder path
 */
export function getImagePath(url: string): string {
  // If already a local path, return as-is
  if (url.startsWith('/') || url.startsWith('./')) {
    return url;
  }

  // Extract filename from kkma.net URL
  const urlMatch = url.match(/wp-content\/uploads\/[\d\/]+\/(.+)$/);
  if (!urlMatch) {
    // If not a kkma.net URL, return as-is
    return url;
  }

  const filename = urlMatch[1];
  
  // Map different image types to folders
  if (filename.includes('LOGO')) {
    return `/images/logo/${filename}`;
  }
  
  if (filename.includes('page-title')) {
    return `/images/page-title/${filename}`;
  }
  
  if (filename.includes('MEMBER-PRIVILEGES')) {
    return `/images/member-privileges/${filename}`;
  }
  
  if (filename.includes('CLASSIFIEDS')) {
    return `/images/classifieds/${filename}`;
  }
  
  if (filename.includes('CONTACT-PAGE') || filename.includes('download-bg')) {
    return `/images/contact/${filename}`;
  }
  
  if (filename.startsWith('KKMA-') && (filename.includes('.jpg') || filename.includes('.png'))) {
    // People images (KKMA-NAME.jpg)
    return `/images/people/${filename}`;
  }
  
  // Default to images folder
  return `/images/${filename}`;
}

/**
 * Common image paths
 */
export const ImagePaths = {
  logo: '/images/logo/KKMA-LOGO-WITH-TEXT-1.png',
  pageTitle: '/images/page-title/KKMA-page-title.jpg',
  contactBg: '/images/contact/download-bg-2.jpg',
  contactPage: '/images/contact/KKMA-CONTACT-PAGE.jpg',
  classifiedsDefault: '/images/classifieds/KKMA-CLASSIFIEDS.jpg',
} as const;


