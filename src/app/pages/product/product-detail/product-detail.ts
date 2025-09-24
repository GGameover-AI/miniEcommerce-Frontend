import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product-service';
import { ProductModel } from '../../../models/product-model';
import { CurrencyPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, NgFor],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  ngOnInit(): void {
    this.getProduct()
  }



  productSelected: ProductModel | undefined



  show() {
    console.log(this.productSelected)
  }

  getProduct() {
    const productID: string = this.route.snapshot.paramMap.get('id')!
    this.productService.originProduct$.subscribe(p => {
      this.productSelected = p.find(e => e.id === productID)
    }
    )
  }

  //Review
  reviewer = [
    {
      img: "https://shorturl.asia/BIziK",
      comment: "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do."
    },
    {
      img: "https://shorturl.asia/BIziK",
      comment: "Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi."
    },
    {
      img: "https://shorturl.asia/BIziK",
      comment: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
    },
    {
      img: "https://shorturl.asia/BIziK",
      comment: "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia."
    },
    {
      img: "https://shorturl.asia/BIziK",
      comment: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque."
    },
    {
      img: "https://shorturl.asia/BIziK",
      comment: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium."
    }
  ];
}
