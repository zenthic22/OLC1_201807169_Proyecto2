import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LeerComponent } from './components/leer/leer.component';
//import { AnalizadoresService } from './services/analizadores.service';
import { HttpClientModule } from '@angular/common/http';
//import { ObtenerComponent } from './components/obtener/obtener.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LeerComponent,
    //ObtenerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  /*providers: [
    AnalizadoresService

  ],*/
  bootstrap: [AppComponent]
})
export class AppModule { }