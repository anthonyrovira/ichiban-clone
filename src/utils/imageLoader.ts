/**
 * Generate frame urls
 * @param totalFrames - number of frames
 * @returns array of frame urls
 */
export function generateHeroFrameUrls(totalFrames: number) {
  return Array.from({ length: totalFrames }, (_, i) => {
    const frameNumber = `${(i + 1).toString().padStart(3, "0")}`;
    return `/frames/hero/moto-${frameNumber}.webp`;
  });
}

/**
 * Generate frame urls
 * @param totalFrames - number of frames
 * @returns array of frame urls
 */
export function generateTransmissionFrameUrls(totalFrames: number) {
  return Array.from({ length: totalFrames }, (_, i) => {
    const frameNumber = `${(i + 1).toString().padStart(3, "0")}`;
    return `/frames/transmission/img-${frameNumber}.webp`;
  });
}

/**
 * Generate frame urls
 * @param totalFrames - number of frames
 * @returns array of frame urls
 */
export function generateHeartFrameUrls(totalFrames: number) {
  return Array.from({ length: totalFrames }, (_, i) => {
    const frameNumber = `${(i + 1).toString().padStart(3, "0")}`;
    return `/frames/heart/img-${frameNumber}.webp`;
  });
}
