import ImageQueueManager from "./ImageQueueManager";

export const imageQueueManager = new ImageQueueManager({
  maxConcurrent: 4,
  delayBetween: 100,
});

export { ImageQueueManager };
