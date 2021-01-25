import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: AuthService, private route: Router,private _snackBar: MatSnackBar) { }

  resetFormGroup : FormGroup;

  ngOnInit(): void {
    this.resetFormGroup = this.fb.group({
      email: ['', Validators.required],
    });
  }

  reset(){
    let email =this.resetFormGroup.value.email;
    if(email!='')
    {  this.service.resetPassword(email).subscribe((res) => {
        if(res.status == 'success')
        {
          this._snackBar.open("Check your email","close",{
            duration: 2000,
          });
        }
      
      },(err)=>{
        console.log('forgot-password error', err.error);
        this._snackBar.open(err.error,"close",{
          duration: 2000,
        });
        })
    }
    else 
    {
      this._snackBar.open("Please enter your e-mail adress","close",{
        duration: 2000,
      });
    }
  }

}
