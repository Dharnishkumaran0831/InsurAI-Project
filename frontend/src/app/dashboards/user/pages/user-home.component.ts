import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="p-6 bg-gray-50">
      <h2 class="text-xl font-semibold mb-4">User Dashboard</h2>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="bg-white p-4 rounded shadow">Active Policies: 3</div>
        <div class="bg-white p-4 rounded shadow">Claims Filed: 1</div>
        <div class="bg-white p-4 rounded shadow text-green-600">Risk: Low</div>
        <div class="bg-white p-4 rounded shadow">Premium Due: ₹12,000</div>
      </div>
    </main>
  `
})
export class UserHomeComponent {}
