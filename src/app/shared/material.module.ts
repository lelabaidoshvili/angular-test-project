import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  exports: [
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule
  ],
})
export class MaterialModule {}
