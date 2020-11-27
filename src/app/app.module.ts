import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs'
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent, register } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { MatCardModule } from '@angular/material/card';
import { MenuComponent } from './menu/menu.component';
import { ZoomComponent } from './zoom/zoom.component';
import { MsgService } from 'src/services/msg.service';
import { AppComponent } from './app.component';
import { EdituserComponent } from './edituser/edituser.component';
import { UserService } from 'src/services/user.service';
import { AddcourseComponent } from './addcourse/addcourse.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MatTableModule } from '@angular/material/table';
import { BuscadorComponent } from './buscador/buscador.component';
import { BmaestroPipe } from './bmaestro.pipe';
import { BcategoriaPipe } from './bcategoria.pipe';
import { dialogStudent, StudentregisterComponent } from './studentregister/studentregister.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatChipsModule } from '@angular/material/chips';
import { CalificarComponent } from './calificar/calificar.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent, reportProfile, editProfile, addImages, material } from './profile/profile.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CertificacionesComponent, feedback } from './certificaciones/certificaciones.component';
//import { CertificacionesinstructorComponent } from './certificacionesinstructor/certificacionesinstructor.component';
import { CertificacionesinstructorComponent, dialogNewcertificacion, feedbackInstructor } from './certificacionesinstructor/certificacionesinstructor.component';
import { HomeComponent } from './home/home.component';
import { MatPaginator } from '@angular/material/paginator';

import { MatSortModule } from '@angular/material/sort';
//import { CertificacionesinstructorComponent } from './certificacionesinstructor/certificacionesinstructor.component';
import { AdminreportComponent, dialogBan } from './adminreport/adminreport.component';
import { BanlistComponent } from './banlist/banlist.component';
import { MisasesoriasComponent } from './misasesorias/misasesorias.component';
import { MatDividerModule } from '@angular/material/divider';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MisasesoriasIComponent } from './misasesorias-i/misasesorias-i.component';
//import { dialogNewcertificacion,CertificacionesinstructorComponent } from './certificacionesinstructor/certificacionesinstructor.component';

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
    BuscadorComponent,
    BmaestroPipe,
    BcategoriaPipe,
    StudentregisterComponent,
    dialogStudent,
    CalificarComponent,
    ProfileComponent,
    CertificacionesinstructorComponent,
    dialogNewcertificacion,
    reportProfile,
    editProfile,
    CertificacionesComponent,
    feedback,
    feedbackInstructor,
    HomeComponent,
    AdminreportComponent,
    dialogBan,
    BanlistComponent,
    MisasesoriasComponent,
    addImages,
    material,
    MisasesoriasIComponent
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
    MatTableModule,
    MatListModule,
    MatChipsModule,
    NgbModule,
    MatIconModule,
    FlexLayoutModule,
    MatBadgeModule,
    CarouselModule.forRoot(),
    MatDividerModule,
    LayoutModule,
    MatSidenavModule,


    MatSortModule

  ],
  entryComponents: [
    register,
    dialogStudent,
    reportProfile,
    editProfile,
    dialogNewcertificacion, feedback,
    feedbackInstructor, dialogBan,
    addImages,
    material
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MsgService, UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
