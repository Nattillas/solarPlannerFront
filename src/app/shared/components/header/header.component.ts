import { UserService } from './../../../services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  constructor(private router: Router,private service: AuthService,public dialog: MatDialog,private user:UserService,private _snackBar: MatSnackBar) { }
  username;
  old_password;
  new_password;
  isUser;
  ngOnInit(): void {
    this.isUser = this.service.isLoggedUser();
    this.service.userProfile().subscribe(p=>{
      this.username = p.user.fullName;
    });
  }
  toggleSideBar()
  {
    this.toggleSideBarForMe.emit();
  }

  logout()
  {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }
  changePassword(){
    const dialogRef = this.dialog.open(ChangePassword, {
      width: '250px',
      data: {old: this.old_password, new: this.new_password}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.old && result.new)
      {
          this.user.changePassword(result).subscribe(p=>{
          this._snackBar.open('password has been changed',"close",{
            duration: 5000,
          });
        },err =>{
          this._snackBar.open(err.error,"close",{
            duration: 5000,
          });
          console.log('header changePassword error', err);
        });
      }
    });
  }

}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-box.html',
})
export class ChangePassword {

  old;
  new;

  constructor(
    public dialogRef: MatDialogRef<ChangePassword>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}
