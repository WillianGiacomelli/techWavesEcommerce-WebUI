import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutes } from './public.routing';
import { NavbarComponent } from './components/header/components/navbar/navbar.component';
import { HeaderComponent } from './components/header/component/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BodyComponent } from './components/body/component/body.component';
import { SharedModule } from '../../shared/shared.module';
import { MainSectionComponent } from './components/header/components/main/main-section.component';
import { CartBehaviorService } from './state/cart.service';
import { ProducBehaviorService } from './state/product.service';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { IndexedDbService } from '../../core/utils/indexedDB/indexedDb.service';
import { OffersComponent } from './components/body/components/offers/offers.component';
import { ProductCardComponent } from './components/body/components/carousel/components/product/product-card.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent } from './pages/cart/component/cart.component';
import { EmptyCartComponent } from './pages/cart/components/empty-cart/empty-cart.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CarouselComponent } from './components/body/components/carousel/component/carousel.component';
import { SeeAlsoComponent } from './components/body/components/see-also/see-also.component';

const dbConfig: DBConfig  = {
  name: 'dataStore',
  version: 1,
  objectStoresMeta: [
    {
      store: 'productSelected',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'product', keypath: 'name', options: { unique: false } },
      ]
    },
    {
      store: 'cart',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
      ]
    }
]
};

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    BodyComponent,
    ProductCardComponent,
    CartComponent,
    EmptyCartComponent,
    MainSectionComponent,
    ProductDetailComponent,
    OffersComponent,
    CarouselComponent,
    SeeAlsoComponent
  ],
  imports: [
    CommonModule,
    PublicRoutes,
    SharedModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    CartBehaviorService,
    ProducBehaviorService,
    IndexedDbService
  ]
})
export class PublicModule { }
