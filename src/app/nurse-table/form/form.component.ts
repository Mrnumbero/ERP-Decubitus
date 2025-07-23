import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from '../../service/common.service';
import { KeyService } from '../../service/key.service';
import { NurseService } from '../../service/nurse.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
  nurseForm: FormGroup = new FormGroup({});
  isEdit = false;
  imagePreview: string | null = null;
  imageFormData: FormData = new FormData()

  // These would come from your service
  units: any[] = [];
  productTypes: any[] = [];

  faFileImage = faFileImage;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FormComponent>,
    private _Nurseservice: NurseService,
    private _Commonservice: CommonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _keyService: KeyService
  ) {
    this.isEdit = !!data;
    this.initForm();
  }

  ngOnInit() {

  }

  private initForm() {
    this.nurseForm = this.fb.group({
      ssid: ['', [Validators.required, this.ssidValidator.bind(this)]],
      sex: ['', Validators.required],
      phone: ['', [Validators.required, this.phoneValidator.bind(this)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      birthdate: ['', Validators.required],
      password: ['', Validators.required],
      profile_image: [null, Validators.required] 
    });
  }

   ssidValidator(control: AbstractControl): ValidationErrors | null {
      const ssid = control.value;
      if (ssid && ssid.length !== 13) {
        return { invalidSsid: 'กรุณากรอกให้ครบ 13 หลัก' };
      }
      return null;
    }
  
    phoneValidator(control: AbstractControl): ValidationErrors | null {
      const phone = control.value;
      if (phone && phone.length !== 10) {
        return { invalidPhone: 'กรุณากรอกให้ครบ 10 หลัก' };
      }
      return null;
    }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.imageFormData.append('file', file);

      this.uploadImage(this.imageFormData); // No need to assign to a variable here
    }
  }

  uploadImage(formData: FormData) {
    this._Commonservice.uploadImg(formData).subscribe(
      (response) => {
        console.log('Image uploaded successfully', response.path);

        // Patch the form value here
        this.nurseForm.patchValue({ profile_image: response.path });
      },
      (error) => {
        console.error('Error uploading image', error);
      }
    );
  }


  async onSubmit() {
    if (this.nurseForm.valid) {
      const formValue = { ...this.nurseForm.value };

      formValue.password = await this._keyService.encryptPassword(formValue.password);
      // Add roleId
      formValue.roleId = 3;


      this._Nurseservice.create(formValue).subscribe({
        next: (response) => {
          console.log('Nurse created successfully', response);
          alert('Nurse created successfully');
          this.dialogRef.close(formValue);
          window.location.reload();
        },
        error: (error) => {
          console.error('Error creating nurse', error);
          alert('Error creating nurse: ' + error.error.message);
        }
      });
    }
  }
}
