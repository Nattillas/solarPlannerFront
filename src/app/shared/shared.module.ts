import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent, ChangePassword } from './components/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MapComponent } from './widgets/map/map.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { SplineComponent } from './widgets/spline/spline.component';
import { HighchartsChartModule } from 'highcharts-angular';
import {MatTreeModule} from '@angular/material/tree';
import { AgmJsMarkerClustererModule } from '@agm/js-marker-clusterer';
import { ColumnComponent } from './widgets/column/column.component';
import { MultiaxesComponent } from './widgets/multiaxes/multiaxes.component';
import { MultiaxesComponentEmisiones } from './widgets/multiaxes/multiaxes.emisiones.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';





@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    MapComponent,
    SplineComponent,
    ColumnComponent,
    MultiaxesComponent,
    MultiaxesComponentEmisiones,
    ChangePassword,
  ],
  entryComponents:[
    ChangePassword
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCo6GxWjpimRcUeLYvQoLUDujtq_y4X4Ds' ,
      libraries: ['drawing']
    }),
    HttpClientModule,
    HighchartsChartModule,
    MatTreeModule,
    AgmJsMarkerClustererModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule
  ],
  providers: [
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    MapComponent,
    SplineComponent,
    ColumnComponent,
    MultiaxesComponent,
    MultiaxesComponentEmisiones
  ]
})
export class SharedModule { }
