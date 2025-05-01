import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  standalone: false,
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  public products: Product[] = [
    {
      id:1,
      title: "Monitor gamer",
      price: 2500,
      description:"Monitor gamer Acer 180FPS",
      image: "https://img.freepik.com/fotos-gratis/vista-do-monitor-de-exibicao-de-video-do-computador_23-2150757345.jpg?semt=ais_hybrid"
    },
    {
      id:2,
      title: "Iphone 16",
      price: 4600,
      description:"Iphone 16 128GB",
      image: "https://img.freepik.com/fotos-gratis/vista-do-monitor-de-exibicao-de-video-do-computador_23-2150757345.jpg?semt=ais_hybrid"
    },
    {
      id:3,
      title: "Iphone 16",
      price: 4600,
      description:"Iphone 16 128GB",
      image: "https://img.freepik.com/fotos-gratis/vista-do-monitor-de-exibicao-de-video-do-computador_23-2150757345.jpg?semt=ais_hybrid"
    },
    {
      id:4,
      title: "Iphone 16",
      price: 4600,
      description:"Iphone 16 128GB",
      image: "https://img.freepik.com/fotos-gratis/vista-do-monitor-de-exibicao-de-video-do-computador_23-2150757345.jpg?semt=ais_hybrid"
    },
  ];

  public currentIndex = 0;
  public itemsPerSlide = 3;
  public totalSlides: number;

  constructor() {
    this.totalSlides = Math.ceil(this.products.length / this.itemsPerSlide);
    console.log(this.totalSlides)
  }

  ngOnInit(): void {
    this.updateItemsPerSlide();
    window.addEventListener('resize', () => this.updateItemsPerSlide());
  }

  updateItemsPerSlide(): void {
    const width = window.innerWidth;
    if (width < 640) {
      this.itemsPerSlide = 1;
    } else if (width < 1024) {
      this.itemsPerSlide = 2;
    } else {
      this.itemsPerSlide = 3;
    }
    this.totalSlides = Math.ceil(this.products.length / this.itemsPerSlide);
    this.currentIndex = Math.min(this.currentIndex, this.totalSlides - 1);
  }

  prevSlide(): void {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.totalSlides - 1;
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex < this.totalSlides - 1) ? this.currentIndex + 1 : 0;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  getVisibleProducts(): Product[] {
    const visibleProducts: Product[] = [];
    const startIndex = this.currentIndex * this.itemsPerSlide;

    for (let i = 0; i < this.itemsPerSlide; i++) {
      const productIndex = (startIndex + i) % this.products.length;
      visibleProducts.push(this.products[productIndex]);
    }

    return visibleProducts;
  }

}
