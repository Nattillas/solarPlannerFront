import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProjectService } from 'src/app/services/project/project.service';
import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit {

  projects = [];
  constructor(private service: ProjectService,private spinner: NgxSpinnerService,private _snackBar: MatSnackBar,public dialog: MatDialog) {

   }

  ngOnInit(): void {
    this.spinner.show();
 
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 5000);

    this.service.adminGetAllProject().subscribe(
      p=>{this.projects=p;
        }
      ,err=>{console.log('projects-list error1 ngOnInit', err)}
    );
  }
  openDialog(project)
  {
    const dialogRef = this.dialog.open(DeleteProjectConfirmationDialog,{
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
        /*this.service.adminDeleteProject(project._id).subscribe((res)=>{
          this._snackBar.open(project.name+" has been deleted successfuly","close",{
            duration: 5000,
          });
      },(err)=>{
        console.log(err);
      });*/
      this.service.adminGetAllProject().subscribe(
        p=>{this.projects=p;
          }
        ,err=>{console.log('projects-list error2 openDialog', err)}
      ); 
      }
    });
  }


}
@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'delete-project-confirmation-dialog.html',
})
export class DeleteProjectConfirmationDialog {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeleteProjectConfirmationDialog>) {
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
