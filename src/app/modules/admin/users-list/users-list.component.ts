import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users = [];
  constructor(private service: UserService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar,public dialog: MatDialog) {

   }

  ngOnInit(): void {
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    this.service.getAllUsers().subscribe(
      u=>{
        u.forEach(u =>{
        let user={_id:'','details':{fullName:'',email:'',method:''},projects:[]};
          user.details.fullName = u.details.fullName;
        if(u.details.method == 'local'){
          user.details.email = u.details.local.email;
        }
        if(u.details.method == 'google'){
          user.details.email = u.details.google.email;
        }
        user.details.method = u.details.method;
        user._id = u.details._id;
        user.projects = u.projects;
        this.users.push(user);

        });
        }
      ,err=>{console.log('users-list error1', err)}
    );
  }

  deleteUser(user){

    let index = this.users.indexOf(user);
    this.service.deleteUser(user._id).subscribe((res)=>{
      this.users.splice(index,1);
      this._snackBar.open(user.name+" has been deleted successfuly","close",{
        duration: 5000,
      });
  },(err)=>{
    console.log('users-list deleteUser error', err);
  }); 
  }


  openDialog(user)
  {
    const dialogRef = this.dialog.open(DeleteUserConfirmationDialog,{
      data:{
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Save',
          cancel: 'No'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        
        this.service.deleteUser(user._id).subscribe((res)=>{
          this._snackBar.open(user.name+" has been deleted successfuly","close",{
            duration: 5000,
          });
      },(err)=>{
        console.log('users-list openDialog error', err);
      });
      this.service.getAllUsers().subscribe(
        u=>{
          this.users = [];
          u.forEach(u =>{
          let user={_id:'','details':{fullName:'',email:'',method:''},projects:[]};
            user.details.fullName = u.details.fullName;
          if(u.details.method == 'local'){
            user.details.email = u.details.local.email;
          }
          if(u.details.method == 'google'){
            user.details.email = u.details.google.email;
          }
          user.details.method = u.details.method;
          user._id = u.details._id;
          user.projects = u.projects;
          this.users.push(user);
  
          });
          }
        ,err=>{console.log('users-list openDialog error2', err)}
      );
      }
    });
  }


}
@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'delete-user-confirmation-dialog.html',
})
export class DeleteUserConfirmationDialog {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteUserConfirmationDialog>) {
      if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
      this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
    }
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}

