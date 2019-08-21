import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-link-details',
  templateUrl: './link-edit.component.html',
  styleUrls: ['./link-edit.component.css']
})

export class LinkEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  linkData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() { 
    this.restApi.getLink(this.id).subscribe((data: {}) => {
      this.linkData = data;
    })
  }

  // Update link data
  updateLink() {
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateLink(this.id, this.linkData).subscribe(data => {
        this.router.navigate(['/links-list'])
      })
    }
  }
}