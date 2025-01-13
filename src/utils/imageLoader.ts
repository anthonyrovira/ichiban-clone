/**
 * Generate frame urls
 * @param totalFrames - number of frames
 * @returns array of frame urls
 */
export function generateFrameUrls(totalFrames: number) {
  return Array.from({ length: totalFrames }, (_, i) => {
    const frameNumber = `${(i + 1).toString().padStart(3, "0")}`;
    return `/frames/moto-${frameNumber}.webp`;
  });
}
