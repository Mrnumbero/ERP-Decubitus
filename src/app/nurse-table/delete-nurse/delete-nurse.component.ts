import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { NurseService } from '../../service/nurse.service';

@Component({
  selector: 'app-delete-nurse',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatButtonModule, NgIf],
  templateUrl: './delete-nurse.component.html',
  styleUrls: ['./delete-nurse.component.scss']
})
export class DeleteNurseComponent {
  constructor(
    private _nurseService: NurseService,
    public dialogRef: MatDialogRef<DeleteNurseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(id: number) {
    this.dialogRef.close(true);
    this._nurseService.delete(id).subscribe((resp: any) => {
      alert('Nurse delete successfully');
      window.location.reload();
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
