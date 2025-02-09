import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicModule } from './public/public.module';
import { ModulesRoutes } from './modules.routing';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ModulesRoutes,
    PublicModule
  ],
  exports:[]
})
export class ModulesModule { }
