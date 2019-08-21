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