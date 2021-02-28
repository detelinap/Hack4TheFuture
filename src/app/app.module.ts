import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from '../app/main-page/main-page.component'
import {TabMenuModule} from 'primeng/tabmenu';
import {WebcamModule} from 'ngx-webcam';
import {MessageService} from "./services/message.service";
import { FormsModule } from '@angular/forms';
import { ChatWindowComponent } from './chat-window/chat-window/chat-window.component';
import { UserService } from './services/user.service';
import {InputTextModule} from 'primeng/inputtext';
import {DividerModule} from 'primeng/divider';
import { ChipModule } from 'primeng/chip';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    ChatWindowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TabMenuModule,
    WebcamModule,
    FormsModule,
    InputTextModule,
    DividerModule,
    ChipModule
  ],
  providers: [MessageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
