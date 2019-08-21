#### Consuming REST Services with Angular

This is an example/tutorial Angular application, under the  concept of something that will be part of the effort to deliver Global Navigation functionality. The point of this, is to demonstrate proper usage of using Angular HTTPClient to consume a REST service.

#### HttpClient API Features
- Observable Support
- Hassle Free API Testing
- Smooth Requests & Response Mechanism
- Better Error Handling

HttpClient is an injectable service, it comes with the various powerful methods to communicate with the remote server. HttpClient API can send Http POST, GET, PUT and DELETE requests easily.
#### HttpClient service methods in Angular 
-  `request()`
-  `delete()`
-  `get()`
-  `head()`
-  `jsonp()`
-  `options()`
-  `patch()`
-  `post()`
-  `put()`

By the end of this tutorial, we will have covered…

- How to set up the HttpClientModule in an Angular app.

- How to make a request using a local server with JSON server NPM package.

- How to make GET, POST, PUT & DELETE request with Angular using HttpClient API

##### Table of Contents 

1. [ Prerequisites. ](#prerequisites)
2. [ Install Angular CLI ](#install-angular-cli)
3. [ How to set up our Angular project using Angular CLI from scratch ](#installing-app)
4. [ Setting up routing for this project ](#setup-routing)
5. [ How to Set up a JSON Server in our Angular project using NPM package ](#setup-json-server)
6. [ How to Set up HttpClient API in our Angular App for REST consumption ](#setup-http-client)
7. [ How to Create Angular Service for consuming REST API's using Angular HttpClient service ](#setup-rest-service)
8. [ Access JSON REST, using HttpClient API from our Angular component ](#access-json-rest)
9. [ Using HTTP GET and DELETE Requests to manage Links List ](#use-get-delete)
10. [ Using HTTP PUT Request in to Edit/Update the Link Data ](#use-put-edit)



<a name="prerequisites"></a>
#### 1. Prerequisites

##### – Setup Node JS development environment

In order to create this demo app you must have **Node JS development environment** set up in your machine.

Please follow this link [How to Set up Node JS Development Environment?](https://nodejs.org/en/download/)

<a name="install-angular-cli"></a>
#### 2. Install Angular CLI


Angular projects are developed using Angular CLI, it's an official tool. Hit the given below command to install the Angular CLI, ignore if Angular CLI is already installed.

```bash
npm install @angular/cli -g
```

<a name="installing-app"></a>
#### 3. How to set up our Angular Project using Angular CLI from scratch

We will be creating an Link management system with Angular, in this demo/tutoral we will consume REST services (API's) via HttpClient service.

It’s time to setup Angular project, run the following command in Angular CLI.

```bash
ng new navbar-links-app
```

During the setup,  we will be prompted for the following questions…

***Would you like to add Angular routing?***

Select y and Hit Enter.

***Which stylesheet format would you like to use?*** (Use arrow keys)

Choose CSS and hit Enter

After that your project will start creating. Once the project is created then don’t forget to get into the project’s folder.

```bash
cd navbar-links-app
```

For this demo, lets try Bootstrap 4 CSS framework, as a ready made CSS solution.
Type the following command to get the Bootstrap into our Angular app.

```typescript
npm install bootstrap
```

After that, go to `angular.json` file and replace the given below code with “styles”: [ ] array.

```typescript
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

Start your project using given below command. Notice that by adding the parameter "--open" it opens your default brower to http://localhost:4200 the default Angular app location

```bash
ng serve --open
```

Lets create Angulatr components to modularize this application, using Angular CLI shorthand, lets generate the components that we will use in this application. ng g c {component name} is shorthand for the same command

```bash
 ng generate component {component name}
```

so using shorthand, lets create the four components we will use in this application.

```bash
ng g c link-create
```

```bash
ng g c link-details
```

```bash
ng g c link-edit
```

```bash
ng g c links-list
```

<a name="setup-routing"></a>
#### 4. Setting up routing for this project

For navigating between components in Angular  we need to activate routing service in our applicaiton, to do that visit `app-routing.module.ts` file and include the given below code.

```bash

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LinkCreateComponent } from './link-create/link-create.component';
import { LinkEditComponent } from './link-edit/link-edit.component';
import { LinksListComponent } from './links-list/links-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-link' },
  { path: 'create-link', component: LinkCreateComponent },
  { path: 'links-list', component: LinksListComponent },
  { path: 'link-edit/:id', component: LinkEditComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

```

<a name="setup-json-server"></a>
#### 5. How to Set up a JSON Server in Angular project using NPM package

We are going to create a development server for testing out the ability to user the JSON Signature Angular app, so we will be using [json-server](https://www.npmjs.com/package/json-server) NPM package to both present JSON and allow REST methods against a JSON File. Simpler than our Spring server, and handy for testing and development. [json-server](https://github.com/typicode/json-server)  (on GitHub) has large community of users, and wide acclaim. It is an ideal tool for front-end developers who need a quick back-end for prototyping and mocking. The usage and sceanarios with which to use it, are beyond the scope of this project. However, reading through the README on GitHub or npmjs.com will give you a plethora of ways to serve up JSON data locally, and quickly.

Let’s, set up a JSON server,  globally in our project, in a fairly straightforward manner.

Run the following command.

```bash
sudo npm install -g json-server
```

Then create a folder by the name of **server** and keep your **database** file in it to manage APIs locally. In the navbar-links-app directory, along side the rest of the Angular files, lets create a server directory. Then within that directory lets touch a file, where we will put a JSON file, with which we would like to serve.

```bash
cd navbar-links-app
mkdir server
```

```bash
touch server/db.json
```

Once the `db.json` file is created then add some data in it.

```json
{
  "links": [
    {
      "id": 1,
      "title": "Resources",
      "url": "http://wwww.yahoo.com"
    },
    {
      "id": 2,
      "title": "My Fleet",
      "url": "http://www.google.com"
    }
  ]
}
```

After that to run the JSON server, we can use the the following command : 

```bash
json-server --watch server/db.json
```

Now if you make any request with **Angular HTTP POST,PUT, GET or DELETE**  the **db.json** file will get updated locally.

We can check the local **db.json** file on this URL `http://localhost:3000/links`.

This is a nice simple solution for serving up an Object, represented as JSON, with all common CRUD methods, without the overhead of creating this in Java Spring. 

We could use the JSON as a representation for our eventual MicroService, without having to wait for this service to be accessible. We now have a service locally for development that does pretty much what we would expect our MicroService to eventually provide. It doesn't matter what the technology stack that serves up the JSON, it could be GoLang, Python Flask, C#, Java Spring, or even Node.js Express. The important thing is we have a JSON REST service accessible to keep going, one with which we can swap out, when it's time to provide a production grade REST endpoint.

<a name="setup-http-client"></a>
#### 6. How to Set up HttpClient API in our Angular App for REST consumption

Ok Cool, so we want to  access an external server to fetch JSON data using the **RESTful API in Angular with HttpClient** service. In order to use HttpClient API to make the communication with Http remote server, we could set up this service in our Angular app.

Go to `app.module.ts` and paste the following code.

```typescript
import { HttpClientModule } from  '@angular/common/http';
```

Include the HttpClientModule in `@NgModule's` imports array, the end result of the `app.module.ts` would look like this. 

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

// Routing module for router service
import { AppRoutingModule } from './app-routing.module';

// Forms module
import { FormsModule } from '@angular/forms';

// Components
import { LinkCreateComponent } from './link-create/link-create.component';
import { LinkEditComponent } from './link-edit/link-edit.component';
import { LinksListComponent } from './links-list/links-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkCreateComponent,
    LinkEditComponent,
    LinksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

We have injected the **HttpClientModule** into our application, now we can use it in our Angular application.

<a name="setup-rest-service"></a>
#### 7. How to Create Angular Service for consuming REST API's using Angular HttpClient service

In order to consume a REST API using Angular HttpClient service we need to create a service file in our app. This file will hold the core logic of our demo application.

#### Functionalites to be covered:
-  `Create Link`
-  `Delete Link`
-  `Edit Link`
-  `Manage Links List`
In order to create CRUD operations using RESTful API in Angular 7, we need to generate `link.ts` class and `rest-api.service.ts` files.

#### Generate Link Interface Class

```bash
ng g cl shared/Link
```

Go to `shared/link.ts` and define data types within the Link class.  We have previously covered Protobuf message defintion using GRPC, and we have done DTO (Data Transfer Object) in Java Spring. So we should be able to get what is going on here, we are defining the Data Structure of our Object


```typescript
export class Link {
	id: string;
	title: string;
	url: string;
}
```

Ok, lets generate the REST API Service Class

```bash
ng g s shared/rest-api
```

We are now at a point where we are writing core logic in this file for consuming RESTful API using HttpClient API. We will also use RxJS to handle asynchronous operations and errors in this demo app.

Let’s go to `shared/rest-api.service.ts` file and add the following code.

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Link } from '../shared/link';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch links list
  getLinks(): Observable<Link> {
    return this.http.get<Link>(this.apiURL + '/links')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch link
  getLink(id): Observable<Link> {
    return this.http.get<Link>(this.apiURL + '/links/' + id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create link
  createLink(link): Observable<Link> {
    return this.http.post<Link>(this.apiURL + '/links', JSON.stringify(link), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update link
  updateLink(id, link): Observable<Link> {
    return this.http.put<Link>(this.apiURL + '/links/' + id, JSON.stringify(link), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteLink(id){
    return this.http.delete<Link>(this.apiURL + '/links/' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}

```
<a name="access-json-rest"></a>
#### 8. Access JSON REST, using HttpClient API from our Angular component
We’ve successfully created RESTful services using Angualr 7 HttpClient API, its time to access rest-api.service.ts via Angular 7 components.

Go to your app.module.ts file and add the following code, this file holds the core services to run our demo app.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

// Routing module for router service
import { AppRoutingModule } from './app-routing.module';

// Forms module
import { FormsModule } from '@angular/forms';

// Components
import { LinkCreateComponent } from './link-create/link-create.component';
import { LinkEditComponent } from './link-edit/link-edit.component';
import { LinksListComponent } from './links-list/links-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LinkCreateComponent,
    LinkEditComponent,
    LinksListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
```

Let's create a Link by Making an HTTP POST Request in Angular

Go to  `link-create.component.html`  add the following code.

```markup
<div class="container custom-container">
  <div class="col-md-12">
    <h3 class="mb-3 text-center">Create Link</h3>
    <div class="form-group">
      <input type="text" [(ngModel)]="linkDetails.title" class="form-control" placeholder="Title">
    </div>

    <div class="form-group">
      <input type="text" [(ngModel)]="linkDetails.url" class="form-control" placeholder="URL">
    </div>
    
    <div class="form-group">
      <button class="btn btn-success btn-lg btn-block" (click)="addLink()">Create Link</button>
    </div>
  </div>
</div>
```

Go to  `link-create.component.ts`  file and add the following code.

```typescript
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

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
```
By adding the above code in  *link create*  component, we have the ability  to create a Link by making an HTTP POST request via Angular  component.

<a name="use-get-delete"></a>
#### 9.  Using HTTP GET and DELETE Requests  to manage Links List
We are now at a point where we want to create the functionality  to manage Links list which we have created above. We will be using our REST API service by sending  `get()`  and  `delete()`  request via our custom apis.

#### `links-list.component.ts`

```typescript
import { Component, OnInit } from  '@angular/core';
import { RestApiService } from  '../shared/rest-api.service';

@Component({
	selector:  'app-links-list',
	templateUrl:  './links-list.component.html',
	styleUrls: ['./links-list.component.css']
})
export  class  LinksListComponent  implements  OnInit {
Link:  any  = [];

constructor(
	public  restApi:  RestApiService
) { }

ngOnInit() {
   this.loadLinks()
}
// Get links list

loadLinks() {
return  this.restApi.getLinks().subscribe((data: {}) => {
this.Link = data;
})

}
// Delete link
deleteLink(id) {
	if (window.confirm('Are you sure, you want to delete?')){
			this.restApi.deleteLink(id).subscribe(data  => {
				this.loadLinks()
			})
		}
	}
}
```

#### `links-list.component.html`

```markup
<div class="container custom-container-2">
  <!-- Show it when there is no link -->
  <div class="no-data text-center" *ngIf="Link.length == 0">
    <p>There is no link added yet!</p>
    <button class="btn btn-outline-primary" routerLink="/create-link">Add Link</button>
  </div>

  <!-- Links list table, hidden when there are no links -->
  <div *ngIf="Link.length !== 0">
    <h3 class="mb-3 text-center">Globak Navigation Links List</h3>

    <div class="col-md-12">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">URL</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let link of Link">
            <td>{{link.id}}</td>
            <td>{{link.title}}</td>
            <td>{{link.url}}</td>
            <td>
              <span class="edit" routerLink="/link-edit/{{ link.id }}">Edit</span>
              <span class="delete" (click)="deleteLink(link.id)">Delete</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
```

<a name="use-put-edit"></a>
#### 10. Using HTTP PUT Request in to Edit/Update the Link Data

We are now going to use an HTTP PUT Request in out application to update Link data in our app, let's perform the following steps.

#### `link-edit.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
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
```

#### `link-edit.component.html`

```markup
<div class="container custom-container">
    <div class="col-md-12">
        <h3 class="mb-3 text-center">Update Link</h3>
        <div class="form-group">
            <input type="text" [(ngModel)]="linkData.title" class="form-control" placeholder="Title">
        </div>
        <div class="form-group">
            <input type="text" [(ngModel)]="linkData.url" class="form-control" placeholder="URL">
        </div>
        <div class="form-group">
            <button class="btn btn-success btn-lg btn-block" (click)="updateLink()">Update Link</button>
        </div>
    </div>
</div>
```

Now we can test the our application in the browser, just type  `ng serve`  in the terminal. Or, we could use `ng serve --open` and force a new browser window to open, showing the http://localhost:4200 - which is typically the endpoint the Angular serves an app, while doing development.