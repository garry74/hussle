import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    // children: [
    //   {
    //     path: 'chat/:id',
    //     component: ,
    //   },
    // ],
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./chat/chat.module').then((m) => m.ChatPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab1PageRoutingModule {}
