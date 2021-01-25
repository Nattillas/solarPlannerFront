import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from 'src/app/services/project/project.service';
import { NgxSpinnerService } from "ngx-spinner";
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.scss']
})
export class UserProjectsComponent implements OnInit {

  projects = [];
  delete = false;
  project_to_delete;
  constructor(private service: ProjectService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar,public dialog: MatDialog) {

   }

  ngOnInit(): void {
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 500);

    this.service.getAllProject().subscribe(
      p=>{this.projects=p;
        }
      ,err=>{console.log('user-projects ngOnInit error', err)}
    );
  }

  deleteProject(project){

    let index = this.projects.indexOf(project);
    this.service.deleteProject(project._id).subscribe((res)=>{
      this.projects.splice(index,1);
      this._snackBar.open(project.name+" has been deleted successfuly","close",{
        duration: 2000,
      });
  },(err)=>{
    console.log('user-projects deleteProjects error', err);
  }); 
  }

  openDialog(project)
  {
    const dialogRef = this.dialog.open(ConfirmationDialog,{
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
        let index = this.projects.indexOf(project);
        this.service.deleteProject(project._id).subscribe((res)=>{
          this.projects.splice(index,1);
          this._snackBar.open(project.name+" has been deleted successfuly","close",{
            duration: 5000,
          });
      },(err)=>{
        console.log('user-projects afterClosed', err);
      });
      this.service.getAllProject().subscribe(
        p=>{this.projects=p;
          }
        ,err=>{console.log('user-projects getAllProjects', err)}
      ); 
      }
    });
  }


}
@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
})
export class ConfirmationDialog {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialog>) {
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