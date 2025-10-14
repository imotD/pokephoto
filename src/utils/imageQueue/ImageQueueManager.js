class ImageQueueManager {
  constructor({ maxConcurrent = 4, delayBetween = 100 } = {}) {
    this.maxConcurrent = maxConcurrent;
    this.delayBetween = delayBetween;
    this.queue = [];
    this.active = 0;
    this.loadedUrls = new Set(); // Cache untuk avoid double load
  }

  async loadImage(url, maxRetries = 3) {
    // Jika sudah pernah berhasil di-load, skip
    if (this.loadedUrls.has(url)) {
      return { success: true, cached: true };
    }

    return new Promise((resolve) => {
      this.queue.push({
        url,
        maxRetries,
        retryCount: 0,
        resolve,
      });
      this.process();
    });
  }

  async process() {
    // Jika sudah max concurrent, stop
    if (this.active >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    this.active++;
    const { url, maxRetries, retryCount, resolve } = this.queue.shift();

    try {
      // Attempt load image
      await this.attemptLoad(url);

      // Success - cache dan resolve
      this.loadedUrls.add(url);
      this.active--;
      resolve({ success: true, attempts: retryCount + 1 });

      // Process next in queue
      if (this.queue.length > 0) {
        await this.sleep(this.delayBetween);
      }
      this.process();
    } catch (error) {
      // Failed - check retry count
      if (retryCount < maxRetries) {
        // Calculate exponential backoff delay
        const backoffDelay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s, 8s

        console.warn(
          `Image load failed: ${url}. Retry ${
            retryCount + 1
          }/${maxRetries} after ${backoffDelay}ms`
        );

        // Put back in queue dengan retry count + 1
        this.active--;
        await this.sleep(backoffDelay);
        this.queue.unshift({
          url,
          maxRetries,
          retryCount: retryCount + 1,
          resolve,
        });
        this.process();
      } else {
        // Max retries reached - give up
        console.error(`Image load failed permanently: ${url}`);
        this.active--;
        resolve({ success: false, attempts: retryCount + 1 });
        this.process();
      }
    }
  }

  attemptLoad(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      // Timeout 10 detik per attempt
      const timeout = setTimeout(() => {
        reject(new Error(`Timeout loading ${url}`));
      }, 10000);

      img.onload = () => {
        clearTimeout(timeout);
        resolve();
      };

      img.onerror = () => {
        clearTimeout(timeout);
        reject(new Error(`Failed to load ${url}`));
      };

      img.src = url;
    });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default ImageQueueManager;
