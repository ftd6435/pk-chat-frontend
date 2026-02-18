import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {
  
  uploadProfilePhoto(file: File): Observable<string> {
    // Validate file
    if (!this.isValidImage(file)) {
      return throwError(() => new Error('Invalid image file'));
    }
    
    // For now, return local preview URL
    return of(URL.createObjectURL(file));
    
    // TODO: Implement actual upload to backend
    // return this.http.post<{url: string}>('/api/upload/profile', formData)
    //   .pipe(map(response => response.url));
  }
  
  uploadCoverPhoto(file: File): Observable<string> {
    // Validate file
    if (!this.isValidImage(file)) {
      return throwError(() => new Error('Invalid image file'));
    }
    
    // For now, return local preview URL
    return of(URL.createObjectURL(file));
    
    // TODO: Implement actual upload to backend
    // return this.http.post<{url: string}>('/api/upload/cover', formData)
    //   .pipe(map(response => response.url));
  }
  
  private isValidImage(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }
  
  resizeImage(file: File, maxWidth: number, maxHeight: number): Observable<Blob> {
    return new Observable(observer => {
      const reader = new FileReader();
      
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            
            canvas.toBlob((blob) => {
              if (blob) {
                observer.next(blob);
                observer.complete();
              } else {
                observer.error(new Error('Failed to create blob'));
              }
            }, file.type);
          }
        };
        
        img.src = e.target?.result as string;
      };
      
      reader.readAsDataURL(file);
    });
  }
}
