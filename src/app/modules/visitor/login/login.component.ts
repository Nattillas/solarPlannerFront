import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {AuthService as auth}  from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFormGroup : FormGroup;
  constructor(private fb: FormBuilder, private service: auth, private route: Router,private socialAuthService: AuthService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginFormGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login()

  {
    let body=this.loginFormGroup.value;
    let user = {"email": body.email, "password": body.password};
    this.service.login(user).subscribe((res)=>{
      localStorage.setItem('token', res['token']);
      if(this.service.isLoggedUser())
      {
        this.route.navigate(['projects']);

      }
      if(this.service.isAdmin())
      {
        this.route.navigate(['admin']);
      }
    },(err)=>{
        this._snackBar.open(err.error.message,"close",{
          duration: 2000,
        });
        });

  }


  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        this.service.socialAuth(userData.token).subscribe(res => {
          console.log('login res', res);
          localStorage.setItem('token',res['token']);
          if(this.service.isLoggedUser())
          {
            this.route.navigate(['projects']);
    
          }
          if(this.service.isAdmin())
          {
            this.route.navigate(['admin']);
          }
        });
            
      }
    );
  }
  
}


