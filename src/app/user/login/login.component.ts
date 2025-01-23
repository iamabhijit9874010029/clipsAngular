import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private auth: AngularFireAuth) { }

  credentials: { email: string, password: string } = {
    email: '',
    password: ''
  }

  alertColor: string = "blue";
  ShowAlert: boolean = false;
  alertMsg: string = "Please wait! We are logging you in."
  inSubmission: boolean = false;

  async login() {
    this.ShowAlert = true;
    this.alertMsg = "Please wait! We are logging you in."
    this.inSubmission = true;

    try {
      await this.auth.signInWithEmailAndPassword(this.credentials.email, this.credentials.password);

    }
    catch (err) {
      console.error(err);
      this.alertColor = "red";
      this.ShowAlert = true;
      this.alertMsg = "An unexpected error occurred. Please try again later.";
      this.inSubmission = false;

      return;
    }

    this.alertMsg = "Success! You are now logged in.";
    this.alertColor = "green";
    this.inSubmission = true;
  }
}
