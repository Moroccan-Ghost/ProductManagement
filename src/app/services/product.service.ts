import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  updateProduct(product: Product): Observable<Product> {
      return this.http.put<Product>(`http://localhost:8089/products/${product.id}`,product)
  }
  getProductById(productId: number) : Observable<Product>{
      return this.http.get<Product>(`http://localhost:8089/products/${productId}`)
  }

  constructor(private http:HttpClient) { }

  public searchProducts(keyword:string="", page : number = 1 , size : number = 4){
    return  this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe:'response'})
  }

  public checkProducts(product:Product):Observable<Product>{
    return  this.http.patch<Product>(`http://localhost:8089/products/${product.id}`, {checked:product.checked})
  }


  public deleteProduct(product: Product) {
    return this.http.delete<Product>(`http://localhost:8089/products/${product.id}`)
  }

  public saveProduct(product: Product) {
    product.price = parseFloat(String(product.price))
    if(product.checked !=true) product.checked=false
    return this.http.post<Product>('http://localhost:8089/products',product)
  }
}
