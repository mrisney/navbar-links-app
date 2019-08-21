import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../shared/rest-api.service';

@Component({
    selector: 'app-link-create',
    templateUrl: './link-create.component.html',
    styleUrls: ['./link-create.component.css']
})
export class LinkCreateComponent implements OnInit {

    @Input() linkDetails = { title: '', url: '' }

    constructor(
        public restApi: RestApiService,
        public router: Router
    ) { }

    ngOnInit() { }

    addLink(dataLink) {
        this.restApi.createLink(this.linkDetails).subscribe((data: {}) => {
            this.router.navigate(['/links-list'])
        })
    }
}