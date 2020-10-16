import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent, register} from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import {MatCardModule} from '@angular/material/card';

import { MenuComponent } from './menu/menu.component';
import { ZoomComponent } from './zoom/zoom.component';
import { MsgService } from 'src/services/msg.service';
import { AppComponent } from './app.component';
import { EdituserComponent } from './edituser/edituser.component';
import { UserService } from 'src/services/user.service';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { ScheduleComponent } from './schedule/schedule.component';
// import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { ScheduleModule,RecurrenceEditorModule, DayService, WeekService, WorkWeekService, MonthService, AgendaService, MonthAgendaService } from '@syncfusion/ej2-angular-schedule';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendatComponent } from './calendat/calendat.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { BmaestroPipe } from './bmaestro.pipe';
import { BcategoriaPipe } from './bcategoria.pipe';
import { dialogStudent, StudentregisterComponent } from './studentregister/studentregister.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatChipsModule} from '@angular/material/chips';
import { CalificarComponent } from './calificar/calificar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    MenuComponent,
    SigninComponent,
    ZoomComponent,
    EdituserComponent,
    AddcourseComponent,
 register,
 ScheduleComponent,
 CalendatComponent,
 BuscadorComponent,
 BmaestroPipe,
 BcategoriaPipe,
 StudentregisterComponent,
 dialogStudent,
 CalificarComponent
  ],
  imports: [
     BrowserModule,
     AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
  
    FormsModule,
    AngularFireStorageModule,
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    MatDialogModule,
    MatOptionModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule, 
    MatGridListModule,
    MatListModule,
    HttpClientModule,
    MatTabsModule,
    MatCardModule,
ScheduleModule,
MatTableModule,
CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
MatListModule,
MatChipsModule,
NgbModule
  ], 
   entryComponents: [
    register,
    dialogStudent
  ], 
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MsgService,UserService,
    DayService,
   
    WorkWeekService,
    MonthAgendaService,
    MonthService
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
