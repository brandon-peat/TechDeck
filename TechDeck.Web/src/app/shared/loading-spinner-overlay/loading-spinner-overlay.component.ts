import { Component } from '@angular/core';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner-overlay',
  templateUrl: './loading-spinner-overlay.component.html',
  styleUrls: ['./loading-spinner-overlay.component.scss']
})
export class LoadingSpinnerOverlayComponent {
  isLoading$ = this.loadingService.isLoading$;

  constructor(private loadingService: LoadingSpinnerService) {}
}