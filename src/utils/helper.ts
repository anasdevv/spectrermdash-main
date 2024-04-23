/**
 * Capitalizes first letter of each word in a file name separated by hyphens.
 *
 * @param {string} fileName - The file name to capitalize.
 * @returns {string} The capitalized file name.
 */
export const capitalizeFileName = (fileName: string) => {
  return fileName
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const filenames = [
  "barry",
  "berrien",
  "branch",
  "calhoun",
  "cass",
  "kalamazoo",
  "st-joesph",
];
