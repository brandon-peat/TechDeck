import { Component, Input } from '@angular/core';
import { Reply } from '../models/reply';

@Component({
  selector: 'reply-card',
  templateUrl: './reply-card.component.html',
  styleUrl: './reply-card.component.scss'
})
export class ReplyCardComponent {
  @Input({required: true}) reply!: Reply;

}
