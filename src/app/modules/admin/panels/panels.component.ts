import { Component, OnInit, EventEmitter, Output, Inject } from '@angular/core';
import {PanelService} from './../../../services/panel/panel.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-panels',
  templateUrl: './panels.component.html',
  styleUrls: ['./panels.component.scss']
})
export class PanelsComponent implements OnInit {

  panels:[];
  username;
  name;
  height;
  width;
  capacity;
  technology

  constructor(private service: PanelService,public dialog: MatDialog,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.service.getAllPanels().subscribe(p =>{
      this.panels = p;
        })
  }
  newPanel(){
    const dialogRef = this.dialog.open(NewPanelDialog, {
      width: '250px',
      data: {name: this.name, height: this.height,width:this.width,capacity:this.capacity,technology:this.technology}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.capacity && result.height && result.width && result.technology && result.technology)
      {
        console.log('panels newPanel 1')
        if(!isNaN(result.height) && !isNaN(result.width) && !isNaN(result.capacity))
        {
          console.log('panels newPanel 2');
          this.service.subscribePanel({'name':result.name,'width':result.width,'height':result.height,'capacity':result.capacity,'technology':result.technology}).subscribe(
            
            err =>{console.log('error', err);},
            p => {
              console.log("panels newPanel");
              this.service.getAllPanels().subscribe(p =>{
                this.panels = p;
              })
            }
          )
        }
        else{
          this._snackBar.open("some fields must be numbers","close",{
            duration: 5000,
          });
        }
      }
      
      else{
        this._snackBar.open("Missing fields","close",{
          duration: 5000,
        });
      }
      
    });
  }

  openDialog(panel)
  {
    const dialogRef = this.dialog.open(DeletePanelConfirmationDialog,{
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
        this.service.deletePanel(panel._id).subscribe((res)=>{
          this._snackBar.open(panel.name + " has been deleted successfuly","close",{
            duration: 5000,
          });
      },(err)=>{
        console.log('panels afterClosed error1', err);
      });
      this.service.getAllPanels().subscribe(
        p=>{this.panels=p;
          }
        ,err=>{console.log('panels afterClosed error2', err)}
      ); 
      }
    });
  }

}

@Component({
  selector: 'new-project-dialog',
  templateUrl: 'new-project-dialog.html',
})
export class NewPanelDialog {

  Monocrystalline='Monocrystalline'
  Polycrystalline='Polycrystalline'
  Thin_film='Thin film'

  constructor(
    public dialogRef: MatDialogRef<NewPanelDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

    onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}



@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'delete-panel-confirmation-dialog.html',
})
export class DeletePanelConfirmationDialog {
  message: string = "Are you sure?"
  confirmButtonText = "Yes"
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<DeletePanelConfirmationDialog>) {
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


