import {
	Component,
	OnInit,
	Output,
	EventEmitter,
	OnDestroy
} from "@angular/core"

import { locations, Snippet } from "@shared/utils"
import { ElectronService } from "@shared/services"
import { SnippetsService } from "./snippets.service"
import { Observable } from "rxjs"
import { FormControl, FormGroup } from "@angular/forms"

@Component({
	selector: "ng-xterm-snippets",
	template: `
		<div class="form-group" [formGroup]="snippetsSelector">
			<select
				(change)="emitTaskName(snippetsSelector.get('snippets-selector').value)"
				formControlName="snippets-selector"
				class="form-control bg-transparent border-0 text-white">
				<option value="snippets" class="text-white">snippets</option>
				<hr>
				<option *ngFor="let snippet of (snippetsList$ | async)"
				        [id]="snippet.id"
				        [value]="snippet.name"
				>
					{{ snippet.name }}
				</option>
				<hr>
				<option value="edit snippets">edit snippets</option>
			</select>
		</div>
	`,
	styles: [ `
		select {
			margin-top: 1.3px;
			font-size: 13px !important;
			position: relative;
			width: 100px !important;
			z-index: 2;
		}
	` ],
	providers: [ SnippetsService ]
})

/** An HTML Select that holds a list of user defined "snippets".
 * These snippets allow the user to easily re run commands they commonly use
 * without having to retype them each time.
 * */
export class SnippetsComponent implements OnInit, OnDestroy {

	/**
	 * An event emitter which emits (outputs) the name of a given snippet.
	 * This snippet is then received by the terminal.
	 *  */
	@Output() taskName = new EventEmitter<string>()

	/** An array which contains a list of Tasks
	 * @see src/shared/models/snippet.model.ts
	 * */
	snippet: Snippet[]

	/**
	 * A value used to represent the Observable<Task[]>
	 * returned from the task list service
	 * */
	snippetsList$: Observable<Snippet[]>

	/** A FormGroup variable which is used to configure the task list form */
	snippetsSelector: FormGroup

	constructor(
		private readonly electronService: ElectronService,
		private readonly snippetsService: SnippetsService
	) {
	}


	ngOnInit() {
		// use the taskListService to read the snippets file and return its contents
		this.snippetsList$ = this.snippetsService.getSnippets()

		// configure the form select which will display the returned snippets
		this.snippetsSelector = new FormGroup({
			"snippets-selector": new FormControl("snippets")
		})
	}

	/**
	 * When the user selects a saved snippet, its value will be emitted to and "caught" by
	 * the terminal. After receiving the snippet, the pty service will write it to the terminal.
	 * Once the user hits enter, the pty service will execute the saved snippet.
	 *
	 * @param {string} taskName the name of the task to be received and displayed by the terminal
	 * */
	emitTaskName(taskName: string) {
		if(taskName == "edit snippets") {
			// open the snippets file in the default text editor.
			this.electronService.shell.openPath(locations.SNIPPETS_FILE)
				.catch((reason) => alert(reason))
			// reset the value of the select so it always displays snippets.
			this.snippetsSelector.get("snippets-selector").setValue("snippets")
			return
		} else {
			// emit the selected taskName
			this.taskName.emit(taskName)
			// reset the value of the select so it always displays snippets.
			this.snippetsSelector.get("snippets-selector").setValue("snippets")
		}
	}

	ngOnDestroy() {
		this.taskName = null
	}

}
