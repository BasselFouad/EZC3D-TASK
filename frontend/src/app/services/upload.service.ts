import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url = 'http://localhost:3000'; // your server local path

  constructor(private http: HttpClient) { }

  public upload(assetFile: File): Observable<any>
  {
  let formData = new FormData();
  formData.append("assetFile",assetFile);
  return this.http.post(`${this.url}/upload`, formData);


  }
}
