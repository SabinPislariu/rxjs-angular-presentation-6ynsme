import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediumComponent } from './components/medium/medium.component';
import { HardComponent } from './components/hard/hard.component';
import { ExtremeComponent } from './components/extreme/extreme.component';
import { EasyComponent } from './components/easy/easy.component';

const routes: Routes = [
  { path: '', redirectTo: '/easy', pathMatch: 'full' },
  { path: 'easy', component: EasyComponent },
  { path: 'medium', component: MediumComponent },
  { path: 'hard', component: HardComponent },
  { path: 'extream', component: ExtremeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
