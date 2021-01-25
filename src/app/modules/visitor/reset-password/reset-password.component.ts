import { ActivatedRoute,Router } from "@angular/router";
import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder, private service: AuthService, private route: Router,private params: ActivatedRoute) { }
  resetFormGroup : FormGroup;
  id;
  token;

  ngOnInit(): void {

    this.id = this.params.snapshot.paramMap.get("id");
    this.token = this.params.snapshot.paramMap.get("token");
    localStorage.setItem('token',this.token);
    this.resetFormGroup = this.fb.group({
      password: ['', Validators.required],
      passwordVerify: ['', Validators.required],

    });
  }

  reset(){
    let password =this.resetFormGroup.value.password;
    let passwordVerify =this.resetFormGroup.value.passwordVerify;
    if(password == passwordVerify)
    {
    let body ={"password":password,"id":this.id};
      this.service.changePassword(body).subscribe((res) => {
        console.log('reset-password res', res);
        this.route.navigate(['/login']);
      })
    }
    
  }

}
