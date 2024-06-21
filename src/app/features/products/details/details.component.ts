import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnInit, Signal, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductsService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @Input({ alias: 'id' }) productId!: number;

  private readonly productService = inject(ProductsService);
  private readonly _sanitizer = inject(DomSanitizer);
  cartStore = inject(CartStore);

  product!: Signal<Product | undefined>;
  starsArray = [1, 2, 3, 4, 5]

  ngOnInit(): void {
    this.product = this.productService.getProductById(this.productId);
  }

  onAddToCart(): void {
    this.cartStore.addToCart(this.product() as Product);
  }

  generateSvg(starNumber: number): SafeHtml {
    let svgContent = null;
    const rate = this.product()?.rating.rate || 0;

    if (starNumber <= Math.floor(rate)) {
      svgContent = `<svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              ></path>
            </svg>`;
    } else if (starNumber < rate + 1) {
      svgContent = `<svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <defs>
                <linearGradient id="half_grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="50%" stop-color="currentColor" stop-opacity="1" />
                  <stop offset="50%" stop-color="currentColor" stop-opacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="url(#half_grad)"
              ></path>
            </svg>`;
    } else {
      svgContent = `<svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="w-4 h-4 text-indigo-500"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
              ></path>
            </svg>`;
    }

    return this._sanitizer.bypassSecurityTrustHtml(svgContent)
  }
}
