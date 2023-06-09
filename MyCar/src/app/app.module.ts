import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { CarCardComponent } from './car-card/car-card.component';
import { CarpageComponent } from './carpage/carpage.component';
import { EventdetailComponent } from './eventdetail/eventdetail.component';
import { TaskComponent } from './task/task.component';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatMenuModule} from '@angular/material/menu';
import { EventPageComponent } from './event-page/event-page.component';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';







@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidemenuComponent,
    CarCardComponent,
    CarpageComponent,
    EventdetailComponent,
    TaskComponent,
    TaskDialogComponent,
    EventPageComponent,
    EventDialogComponent,
    DashboardPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, 
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    DragDropModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
