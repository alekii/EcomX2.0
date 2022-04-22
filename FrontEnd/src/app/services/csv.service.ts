import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CsvService {

  constructor(private httpClient: HttpClient) { }
   
  //reads csv then converts it into json data that we'll use in app
  public readCsv(){
   const ob$ = this.httpClient.get('/assets/data/products.csv', { responseType: 'text' })
   return ob$
  }

}