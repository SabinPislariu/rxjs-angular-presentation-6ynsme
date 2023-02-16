import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MockMemoryDataService } from './mock-memory-data.service';
import { UserService } from './user.service';
import { AppRoutingModule } from './app-routing.module';
import { EasyComponent } from './components/easy/easy.component';
import { MediumComponent } from './components/medium/medium.component';
import { ExtremeComponent } from './components/extreme/extreme.component';
import { HardComponent } from './components/hard/hard.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(MockMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  providers: [UserService],
  declarations: [
    AppComponent,
    EasyComponent,
    MediumComponent,
    ExtremeComponent,
    HardComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
