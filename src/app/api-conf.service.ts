import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiConfService {

  API_BASE_URL = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { } //injection of httpclient in constructor


//get API call to Backend- here using get method to 
get(url: string){
  return this.httpClient.get(`${this.API_BASE_URL}/${url}`); //'' to avoid string concatenation
}//http://localhost:3000/tasklists/

//here for url - dynamic syntax, special comma, the one next to delete; http://localhost:3000/tasklists/
post(url: string, data: Object){
  return this.httpClient.post(`${this.API_BASE_URL}/${url}`, data);
}

put(url: string, data: Object){
  return this.httpClient.put(`${this.API_BASE_URL}/${url}`, data);//
}

delete(url: string){//this and get dont need payload
  return this.httpClient.delete(`${this.API_BASE_URL}/${url}`); 
}



}