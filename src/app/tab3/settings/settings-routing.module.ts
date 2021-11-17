import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'edit',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  },
  {
    path: 'change-pass',
    loadChildren: () => import('./change-pass/change-pass.module').then( m => m.ChangePassPageModule)
  },
  {
    path: 'my-requests',
    loadChildren: () => import('./my-requests/my-requests.module').then( m => m.MyRequestsPageModule)
  },
  {
    path: 'blocked-users',
    loadChildren: () => import('./blocked-users/blocked-users.module').then( m => m.BlockedUsersPageModule)
  },
  {
    path: 'my-contacts',
    loadChildren: () => import('./my-contacts/my-contacts.module').then( m => m.MyContactsPageModule)
  },
  {
    path: 'sign-out',
    loadChildren: () => import('./sign-out/sign-out.module').then( m => m.SignOutPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
