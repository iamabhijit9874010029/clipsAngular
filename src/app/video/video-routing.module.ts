import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';
// import { authGuard } from '../guards/auth.guard'; //when use custom authgurad service (functional - new)
// import { AuthguardService } from '../services/authguard.service'; //when use custom authgurad service (class based - deprecated)

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/']);

const routes: Routes = [
  {
    path: "manage",
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome
    },
    // canActivate: [AuthguardService] //when use custom authgurad service (class based - deprecated)
    // canActivate: [authGuard] //when use custom authgurad service (functional - new)
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: "upload",
    component: UploadComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome
    },
    // canActivate: [AuthguardService] //when use custom authgurad service (class based - deprecated)
    // canActivate: [authGuard] //when use custom authgurad service (functional - new) 
    canActivate: [AngularFireAuthGuard],
  },
  {
    path: "manage-clips",
    redirectTo: "manage"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoRoutingModule { }
