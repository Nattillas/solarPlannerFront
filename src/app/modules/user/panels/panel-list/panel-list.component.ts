import { PanelService } from './../../../../services/panel/panel.service';
import { Component, OnInit,Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-panel-list',
  templateUrl: './panel-list.component.html',
  styleUrls: ['./panel-list.component.scss']
})
export class PanelListComponent implements OnInit {

  panels = [];
  name;
  height;
  width;
  capacity;
  technology
  constructor(private service: PanelService,private _snackBar: MatSnackBar,public dialog: MatDialog) {
   }

  ngOnInit(): void {
    this.service.myPanels().subscribe(
      p=>{
        this.panels=p;
        console.log("ngOnInit", this.panels);
      }
      ,err=>{console.log('panel-list ngOnInit error', err)}
    );
  }


  newPanel(){
    const dialogRef = this.dialog.open(NewPanelDialog, {
      width: '250px',
      data: {name: this.name, height: this.height, width:this.width, capacity:this.capacity, technology:this.technology}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.capacity && result.height && result.width && result.technology && result.technology)
      {
        if(!isNaN(result.height) && !isNaN(result.width) && !isNaN(result.capacity))
        {
          this.service.subscribePanel({'name':result.name,'width':result.width,'height':result.height,'capacity':result.capacity,'technology':result.technology,'type':'personal'}).subscribe(
            p => {
              this.service.myPanels().subscribe(p =>{
                console.log('panel-list newPanel');
                this.panels = p;
                console.log("newPanel", this.panels);
              })
            },
            err =>{console.log('panel-list newPanel', err);}
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

}

@Component({
  selector: 'new-panel',
  templateUrl: 'new-panel.html',
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
