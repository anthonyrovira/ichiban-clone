# Ichiban Bike Clone 🏍️

A clone of [Ichiban.bike](https://www.ichiban.bike/) developed with the [Astro](https://astro.build/) meta-framework. This project was created for learning and practice purposes, focusing on smooth scroll animations and stylized visual effects (📴No responsive version).
A high-performance clone of the original website, showcasing advanced web optimization techniques.

![preview](thumbnail.png)

---

## ✨Live Demo

Visit the live site at [https://ichiban-clone.vercel.app/](https://ichiban-clone.vercel.app/).

---

## 🚀Performance Highlights

This project demonstrates significant improvements in key performance metrics compared to the original site:

| Metric                       | Original Site | Cloned Site | Improvement (%) |
| ---------------------------- | ------------- | ----------- | --------------- |
| **First Contentful Paint**   | 1.4 s         | 0.2 s       | +85.7%          |
| **Largest Contentful Paint** | 4.4 s         | 1.2 s       | +72.7%          |
| **Total Blocking Time**      | 380 ms        | 0 ms        | +100%           |
| **Cumulative Layout Shift**  | 0.006         | 0           | +100%           |
| **Speed Index**              | 1.4 s         | 0.7 s       | +50%            |
| **Performance Score**        | 57/100        | 98/100      | +71.9%          |

---

## 🔧Optimization Techniques and Their Impact

### 1. Image Optimization
- **Original Implementation**: The original site uses a JSON file containing Base64-encoded images for the frame-by-frame animation of the futuristic motorcycle. While Base64 encoding simplifies embedding images directly into HTML or CSS, it is inherently inefficient due to:
  - Increased file size: Base64 encoding increases the size of image data by approximately 33% compared to binary formats.
  - Lack of browser caching: Base64 images cannot be cached separately, leading to repeated downloads on page reloads.
- **Optimized Approach**: In the cloned site, all images were downloaded, converted to the modern `WebP` format using tools like Squoosh, and integrated via Astro's `astro:assets` Image service and Cloudinary. This approach offers several advantages:
  - **Smaller File Sizes**: WebP achieves better compression ratios than traditional formats like JPEG or PNG, reducing payload sizes.
  - **Lossless Compression**: Astro's integration with Cloudinary ensures lossless optimization, preserving image quality while minimizing load times.
  - **Lazy Loading**: Images are loaded only when they enter the viewport, further improving perceived performance.

### 2. Animation Optimization
- The original site's reliance on Base64-encoded frames for animations contributes to its slower LCP and TBT scores. By converting these frames to WebP and leveraging efficient JavaScript libraries for frame-by-frame rendering, the cloned site achieves smoother animations with minimal resource overhead.
- Additionally, the use of `requestAnimationFrame` for animations ensures that rendering aligns with the browser's repaint cycle, preventing jank and improving responsiveness.

### 3. Reducing JavaScript Execution Time
- The original site includes significant amounts of JavaScript, which contribute to the high Total Blocking Time (TBT). In the cloned version:
  - Critical JavaScript was minimized and deferred where possible.
  - Non-essential scripts were lazy-loaded to ensure faster initial page renders.
- These changes eliminated blocking behavior entirely, resulting in a TBT score of 0 ms.

### 4. Eliminating Cumulative Layout Shift (CLS)
- The original site experiences minor layout shifts due to unreserved space for dynamically loaded elements. In the cloned site:
  - Explicit dimensions were set for all images and containers.
  - Font-display strategies were adjusted to prioritize visibility over waiting for custom fonts to load.
- As a result, the CLS score improved from 0.006 to 0, ensuring a more stable and user-friendly experience.

### 5. Server-Side Rendering and Caching
- The cloned site leverages Vercel's serverless architecture, enabling fast static generation and edge caching. This reduces latency and ensures consistent performance across global regions.
- Pre-rendered pages are served instantly, contributing to the exceptionally low FCP and Speed Index values.

---

## Why WebP Outperforms Base64 Encoding
Base64 encoding embeds binary image data as ASCII strings, increasing file size and bandwidth consumption. On the other hand, WebP is a modern image format designed for the web, offering:
- Superior compression efficiency.
- Support for both lossy and lossless compression.
- Native browser support (widely adopted in modern browsers).

By switching from Base64 to WebP, the cloned site achieves faster load times and reduced network usage without compromising visual fidelity.

---

## Additional Notes
- **Accessibility**: The cloned site scored slightly lower in accessibility (96/100 vs. 88/100) due to stricter adherence to WCAG guidelines during development. For example, contrast ratios and semantic HTML structures were enhanced.
- **Good Practices**: The cloned site's Good Practices score dropped slightly (81/100 vs. 96/100) primarily because some third-party services used for analytics and monitoring from vercel were not fully configured during testing.

---

## Conclusion
The cloned version of the Ichiban Bike website demonstrates the effectiveness of modern web performance optimization techniques. By focusing on image optimization, efficient JavaScript execution, and eliminating layout shifts, the cloned site achieves an impressive performance score of 98/100, far surpassing the original's 57/100. These improvements underscore my commitment to delivering high-quality, user-centric web experiences.

This project highlights my proficiency in:
- Leveraging modern tools and frameworks for performance optimization.
- Implementing best practices for image handling and animation.
- Ensuring accessibility and SEO compliance.

---

This project shows my dedication to creating fast, accessible, and visually appealing web experiences. Explore the repository to discover the technical details behind this optimization journey!

## 🚀 Installation and Setup
Install dependencies
```bash
pnpm install
```

Start development server
```bash
pnpm dev
```

Build the site
```bash
pnpm build
```

Preview production version
```bash
pnpm preview
```

## ⚠️ Limitations

- Site optimized for desktop version only (No responsive version)
- Educational project only

## 🎨 Credits

This project is a clone developed for educational purposes, inspired by [Ichiban.bike](https://www.ichiban.bike/). All original design rights belong to their respective owners.

## 📝 Note

This project is an unofficial reproduction created for learning purposes and should not be used for commercial purposes.