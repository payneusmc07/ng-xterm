import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { TaskListComponent } from "./task-list.component"

import { ReactiveFormsModule } from "@angular/forms"

@NgModule({
	declarations: [ TaskListComponent ],
	exports: [ TaskListComponent ],
	imports: [ CommonModule, ReactiveFormsModule ]
})
export class TaskListModule {}
