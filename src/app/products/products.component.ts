import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products : Array<Product> = []
  public keyword : string = ""
  constructor(private productService:ProductService) {

  }

  ngOnInit() {
    this.getProducts()
  }

  getProducts(){
    this.productService.getProducts(1,2)
      .subscribe(
        {
          next : data => {
            this.products = data
          },
          error: err => {
            console.log(err)
          }
        }
      )
  }


  handleCheckProduct(product: Product) {
    product.checked = !product.checked
    this.productService.checkProducts(product)
      .subscribe(
        {
          next : updatedProduct => {
            this.products.map((p)=>{
              if(p.id==product.id){
                return updatedProduct
              }else{
                return p
              }
            })
          },
          error: err => {
            console.log(err)
          }
        }
      )
  }

  handleDeleteProduct(product: Product) {
    if(confirm("Are you sure to Delete ?"))
    this.productService.deleteProduct(product).subscribe(
      {
        next: value => {
          this.products = this.products.filter((p => p.id!=product.id))
        }
      }
    )
  }

  searchProducts() {
    this.productService.searchProducts(this.keyword).subscribe(
      {
        next: data=>{
          this.products =data
        },
        error: err => console.log(err)
      }
    )
  }
}
