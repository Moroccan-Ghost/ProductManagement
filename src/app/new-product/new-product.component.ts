import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements  OnInit{
  public productForm!:FormGroup
  constructor(private formbuilder: FormBuilder, private productservice:ProductService, private router:Router) {
  }
  ngOnInit() {
    this.productForm = this.formbuilder.group(
      {
        name:this.formbuilder.control('',[Validators.required]),
        price:this.formbuilder.control('0',[Validators.required]),
        checked:this.formbuilder.control(false),

      }
    )
  }

  saveProduct() {
    let product:Product = this.productForm.value
    this.productservice.saveProduct(product).subscribe(
      {
        next: data => {
            alert(JSON.stringify(data))
            this.router.navigateByUrl("/products")
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }
}
