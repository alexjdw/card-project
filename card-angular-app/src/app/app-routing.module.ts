import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CollectionComponent } from './collection/collection.component';
import { BirthdayComponent } from './birthday/birthday.component';
import { ChristmasComponent } from './christmas/christmas.component';
import { CreateComponent } from './create/create.component';
import { FriendshipComponent } from './friendship/friendship.component';

const routes: Routes = [
  {path: 'cards', component: HomeComponent },
  {path: 'cards/create', component:CreateComponent},
  {path: 'cards/collection', component: CollectionComponent},
  {path: 'cards/collection/birthday', component: BirthdayComponent},
  {path: 'cards/collection/christmas', component: ChristmasComponent},
  {path: 'cards/collection/friendship', component: FriendshipComponent},
  {path: '', pathMatch: 'full', redirectTo: '/cards'},
  {path: '**', redirectTo: '/cards'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
