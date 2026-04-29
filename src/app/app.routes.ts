import { Routes } from '@angular/router';
import { SearchPage } from './pages/search-page/search-page';
import { ResultPage } from './pages/result-page/result-page';

export const routes: Routes = [
  { path: '', component: SearchPage },
  { path: 'outfit/:city', component: ResultPage },
];
