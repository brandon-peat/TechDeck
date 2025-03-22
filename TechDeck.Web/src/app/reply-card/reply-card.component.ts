import { Component, Input } from '@angular/core';
import { Reply } from '../models/reply';
import { ImageLoaderService } from '../services/image-loader.service';

@Component({
  selector: 'reply-card',
  templateUrl: './reply-card.component.html',
  styleUrl: './reply-card.component.scss'
})
export class ReplyCardComponent {
  @Input({required: true}) reply!: Reply;
  public profilePictureStyle: any;

  constructor(private readonly imageLoaderService: ImageLoaderService) {}

  ngOnChanges(): void {
    this.imageLoaderService.loadProfilePicture(this.reply.personId)
      .then(style => this.profilePictureStyle = style);
  }
}
