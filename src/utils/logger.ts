/**
 * Helper utility to log messages with file/component tag labels in React Native terminal logs.
 */
export const log = (tag: string, message: any, ...additional: any[]) => {
  console.log(`[${tag}]`, message, ...additional);
};

export const logWarn = (tag: string, message: any, ...additional: any[]) => {
  console.warn(`[${tag}]`, message, ...additional);
};

export const logError = (tag: string, message: any, ...additional: any[]) => {
  console.error(`[${tag}]`, message, ...additional);
};
