import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor() { }

  /**
   * Loads an image URL and returns a style string for background-image CSS
   * Returns fallback if the image cannot be loaded
   */
  public loadProfilePicture(personId: number): Promise<string> {
    const url = `https://localhost:7101/account/profile-picture/${personId}`;
    return this.loadImageWithFallback(url, "url(../../assets/profile-picture-placeholder.jpg)");
  }

  /**
   * Loads a banner image URL and returns a style string for background-image CSS
   * Returns gradient fallback if the image cannot be loaded
   */
  public loadBanner(userId: number): Promise<string> {
    const url = `https://localhost:7101/account/banner/${userId}`;
    return this.loadImageWithFallback(url, "linear-gradient(to right bottom, #be1ae1, #8a62ff, #4a85ff, #009eff)");
  }

  /**
   * Generic method to load an image and return a CSS style string
   */
  public loadImageWithFallback(url: string, fallbackStyle: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(`url('${url}')`);
      };
      img.onerror = () => {
        resolve(fallbackStyle);
      };
      img.src = url;
    });
  }

  /**
   * Adds a timestamp to invalidate cache when loading updated images
   */
  public getTimestampedUrl(baseUrl: string): string {
    const timestamp = new Date().getTime();
    return `${baseUrl}?t=${timestamp}`;
  }
}
