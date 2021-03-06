import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductComponent } from './product/product.component';
import { InventoryService } from './product/inventory.service';
import { ModalOpenInventory } from './product/inventory-modal'
import { ModalFinishSale } from './product/finish-sale-modal'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    ModalOpenInventory,
    ModalFinishSale
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FormsModule,
    CurrencyMaskModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    NgbModule
  ],
  providers: [
    InventoryService,
    ModalOpenInventory,
    ModalFinishSale
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
