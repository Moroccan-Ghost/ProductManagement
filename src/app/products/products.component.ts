import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products : Array<Product> = []
  public keyword : string = ""
  totalPages:number = 0
  pageSize:number = 3
  currentPage:number=1
  constructor(private productService:ProductService, private router :Router) {

  }

  ngOnInit() {
    this.searchProducts()
  }

  searchProducts(){
    this.productService.searchProducts(this.keyword,this.currentPage,this.pageSize)
      .subscribe(
        {
          next : (resp) => {
            this.products= resp.body as Product[]
            let totalProducts:number = parseInt(resp.headers.get('x-total-count')!)
            this.totalPages = Math.ceil(totalProducts/this.pageSize)
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

    handleGotoPage(page: number) {
    this.currentPage = page
    this.searchProducts()
  }

  handleEditProduct(product : Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`)
  }
}
