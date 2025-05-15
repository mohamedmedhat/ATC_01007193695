import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { EventsData } from '../../../data/events.data';
import { CommonModule } from '@angular/common';
import { EventDto } from '../../shared/models/events,model';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  events = EventsData;

  eventForm: FormGroup;
  isEditing = false;
  currentEventId: number | null = null;
  searchQuery = '';

  constructor(private fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      isBooked: [false],
    });
  }

  get filteredEvents() {
    return this.events.filter(
      (event) =>
        event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(this.searchQuery.toLowerCase()),
    );
  }

  createEvent() {
    if (this.eventForm.valid) {
      const newEvent = {
        id: Math.max(...this.events.map((e) => e.id), 0) + 1,
        ...this.eventForm.value,
      };
      this.events.push(newEvent);
      this.resetForm();
    }
  }

  editEvent(event: EventDto) {
    this.isEditing = true;
    this.currentEventId = event.id;
    this.eventForm.patchValue(event);
  }

  updateEvent() {
    if (this.eventForm.valid && this.currentEventId) {
      const index = this.events.findIndex((e) => e.id === this.currentEventId);
      if (index !== -1) {
        this.events[index] = { id: this.currentEventId, ...this.eventForm.value };
        this.resetForm();
      }
    }
  }

  deleteEvent(id: number) {
    if (confirm('Are you sure you want to delete this event?')) {
      this.events = this.events.filter((event) => event.id !== id);
    }
  }

  resetForm() {
    this.eventForm.reset();
    this.isEditing = false;
    this.currentEventId = null;
  }

  onSubmit() {
    if (this.isEditing) {
      this.updateEvent();
    } else {
      this.createEvent();
    }
  }
}
