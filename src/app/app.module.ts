import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { OperationTableEffects } from './+store/effects';
import { listReducer } from './+store/reducer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { TypeChipComponent } from './components/type-chip/type-chip.component';
import { AlignToColumnDirective } from './directives/align-to-column.directive';
import { TruncateStringPipe } from './pipes/truncate-string.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    AlignToColumnDirective,
    TypeChipComponent,
    TruncateStringPipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    ScrollingModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({ operationTable: listReducer }),
    EffectsModule.forRoot([OperationTableEffects]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
