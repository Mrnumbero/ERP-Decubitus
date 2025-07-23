import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { PatientService } from '../../service/patient.service';

@Component({
  selector: 'app-delete-patient',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-patient.component.html',
  styleUrls: ['./delete-patient.component.scss']
})
export class DeletePatientComponent {
  constructor(
    private _patientService: PatientService,
    public dialogRef: MatDialogRef<DeletePatientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(id: number) {
    this.dialogRef.close(true);
    this._patientService.delete(id).subscribe((resp: any) => {
      alert('Patient delete successfull');
      window.location.reload();
    });
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  
}