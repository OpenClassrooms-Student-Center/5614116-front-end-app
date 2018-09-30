import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { StuffService } from '../../services/stuff.service';
import { Thing } from '../../models/Thing.model';

@Component({
  selector: 'app-modify-thing',
  templateUrl: './modify-thing.component.html',
  styleUrls: ['./modify-thing.component.scss']
})
export class ModifyThingComponent implements OnInit {

  thing: Thing;
  thingForm: FormGroup;
  loading = false;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private state: StateService,
              private stuffService: StuffService) { }

  ngOnInit() {
    this.loading = true;
    this.thingForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      price: [0, Validators.required],
      imageUrl: [null, Validators.required]
    });
    this.state.mode$.next('form');
    this.route.params.subscribe(
      (params) => {
        this.stuffService.getThingById(params.id).then(
          (thing: Thing) => {
            this.thing = thing;
            this.thingForm.get('title').setValue(this.thing.title);
            this.thingForm.get('description').setValue(this.thing.description);
            this.thingForm.get('price').setValue(this.thing.price);
            this.thingForm.get('imageUrl').setValue(this.thing.imageUrl);
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const thing = new Thing();
    thing.title = this.thingForm.get('title').value;
    thing.description = this.thingForm.get('description').value;
    thing.price = this.thingForm.get('price').value;
    thing.imageUrl = this.thingForm.get('imageUrl').value;
    thing._id = new Date().getTime().toString();
    thing.userId = 'userID40282382';
    this.stuffService.modifyThing(this.thing._id, thing).then(
      () => {
        this.thingForm.reset();
        this.loading = false;
        this.router.navigate(['/part-one/all-stuff']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
