import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { SharedModule } from "@shared/shared.module"
import { TerminalComponent } from "./terminal.component"
import { NgTerminalModule } from "ng-terminal"
import { TopBarComponent } from './top-bar/top-bar.component'
import { TaskListModule } from "@task-list/task-list.module"


@NgModule({
	declarations: [TerminalComponent, TopBarComponent ],
	exports: [ TerminalComponent ],
	imports: [ CommonModule, NgTerminalModule, TaskListModule, SharedModule ],
	providers: []
})

export class TerminalModule {}
