interface ILoaderPlugin {
  onFileDownload: Function;
  onAllDone: Function;
  onProgress: Function;

  addImages(urls: string[]): void;
  addAtlases(urls: string[]): void;
  addVideos(urls: string[]): void;
  addHtmls(urls: string[]): void;
  download(): void;
  init(): void;
}

export default ILoaderPlugin;
