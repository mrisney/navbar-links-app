import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';

@Component({
    selector: 'app-links-list',
    templateUrl: './links-list.component.html',
    styleUrls: ['./links-list.component.css']
})
export class LinksListComponent implements OnInit {

    Link: any = [];

    constructor(
        public restApi: RestApiService
    ) { }

    ngOnInit() {
        this.loadLinks()
    }

    // Get links list
    loadLinks() {
        return this.restApi.getLinks().subscribe((data: {}) => {
            this.Link = data;
        })
    }

    // Delete link
    deleteLink(id) {
        if (window.confirm('Are you sure, you want to delete?')) {
            this.restApi.deleteLink(id).subscribe(data => {
                this.loadLinks()
            })
        }
    }
}