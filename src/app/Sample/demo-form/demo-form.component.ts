import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-demo-form',
  templateUrl: './demo-form.component.html',
  styleUrls: ['./demo-form.component.scss']
})
export class DemoFormComponent implements OnInit {
  formGroup: FormGroup;
  items: Array<any> = [];
  i: number = 0;
  isUpdating = false;
  entityId = -1;
  public caption = "Submit";

  countries = [
    { name: "United States" },
    { name: "Australia" },
    { name: "Canada" },
    { name: "Brazil" },
    { name: "Bahrain" },
    { name: "India" },
    { name: "England" }
  ];
  positions = [
    { name: "Developer" },
    { name: "Tester" },
    { name: "Engineer" },
    { name: "Manager" },
    { name: "Team Leam" },
    { name: "Hr" }
  ];

  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  get id() {
    return this.formGroup.get('id') as FormControl;
  }
  get gender() {
    return this.formGroup.get('gender') as FormControl;
  }
  get country() {
    return this.formGroup.get('country') as FormControl;
  }
  get mobile() {
    return this.formGroup.get('mobile') as FormControl;
  }
  get post() {
    return this.formGroup.get('post') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
  ) {
    this.formGroup = fb.group({
      title: fb.control('initial value', Validators.required)
    });
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [0],
      name: ['', Validators.required],
      gender: ['male'],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      country: [null, Validators.required],
      post: [null, Validators.required]
    });
  }

  onSubmit() {
    this.name.markAsTouched();
    this.mobile.markAsTouched();
    this.post.markAsTouched();
    this.country.markAsTouched();
    if (this.formGroup.valid) {
      debugger;
      if (this.entityId != -1 && this.isUpdating) {
        const index = this.items.findIndex(element => {
          return element['id'] == this.entityId
        });
        if (index == -1) {
          return;
        }
        const item = this.items[index];
        this.items[index] = Object.assign(item, this.formGroup.value);

        alert('Updated successfully.');
        this.onReset();
        this.isUpdating = false;
        this.entityId = -1;
      }
      else {
        if (this.items.length == 0) {
          this.formGroup.get('id')?.setValue(0);
          this.items.push(this.formGroup.value);
        }
        else {
          let lastrow = this.items[this.items.length - 1];
          this.formGroup.get('id')?.setValue(lastrow['id'] + 1);
          this.items.push(this.formGroup.value);
        }

        alert('Saved successfully.');
        this.onReset();
      }
    }
  }

  onEdit(id: number) {
    this.caption = "Update";
    this.isUpdating = true;
    const item = this.items.find(element => {
      return element['id'] == id;
    });
    if (item) {
      this.formGroup.patchValue(item);
      this.entityId = item.id;
    }
  }

  onDelete(item: any) {
    const index: number = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  onReset() {
    this.formGroup.reset();
    this.formGroup.get('gender')?.setValue('male');
    this.caption = "Submit";
    this.isUpdating = false;
  }
}
