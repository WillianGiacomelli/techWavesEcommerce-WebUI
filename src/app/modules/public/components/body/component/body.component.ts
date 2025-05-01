import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-public-body',
  standalone: false,
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  @ViewChild('swiper') swiper!: ElementRef;

  public products: any[] = [
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
}
