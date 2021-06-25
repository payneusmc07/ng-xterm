import { Component, Input, OnInit } from "@angular/core"
import { SplitPanel, IPCChannelNames } from "@shared/utils"
import { ElectronService } from "@shared/services"
import { SplitPanelService } from "@tabs/tab/split-panel.service"
import { TerminalComponent } from "@terminal/terminal.component"
import { Observable } from "rxjs"

@Component({
	selector: "ng-xterm-split-panel",
	template: `
		<div class="container-fluid">
			<div class="row row-cols-3" [sortablejs]="splitPanelContent">
				<div class="col-sm" *ngFor="let panel of (splitPanelContent$ | async)">
					<ng-xterm-terminal [terminalID]="panel.id"></ng-xterm-terminal>
					<span class="badge bg-secondary" (click)="addPanel()">+</span>
					<span class="badge bg-secondary" (click)="removePanel(panel.id)">-</span>
				</div>
			</div>
		</div>
	`,
	styles: [ `
		select {width: 100px}
		.badge {cursor: pointer;}
		.badge:active {background-color: #5e5e5e !important;}
	` ],
	/**
	 * By providing the SplitPanel service directly inside the split-panel component,
	 * we are ensuring each tab has its own instance of the split panel service.
	 *
	 * If each tab does not have its own instance of the service, when a terminal is
	 * added to removed from the split panel,
	 * the change will be reflected in ALL other tabs.
	 * */
	providers: [ SplitPanelService ]
})

export class SplitPanelComponent implements OnInit {

	/** A number value which will "catch" the emitted tab id from the ng-xterm-tabs-component */
	@Input() tabID: number

	/** The terminal component to be added to the split panel */
	terminalComponent: TerminalComponent

	/** An empty array of type SplitPanel[] used to hold the appended terminals */
	splitPanelContent: SplitPanel[] = []

	/**
	 * Represents the Observable<SplitPanel[]>
	 * returned from the split panel service
	 * */
	splitPanelContent$: Observable<SplitPanel[]>

	/** Used to assign each appended terminal a unique ID */
	private counter = 0

	constructor(private readonly electronService: ElectronService,
	            private splitPanelService: SplitPanelService) {}

	/** Get the initial number of split panels to display in each tab. */
	ngOnInit() {
		this.splitPanelContent$ = this.splitPanelService.getPanels()
	}

	/**
	 * Use the split panel service to append a new terminal to the split panel.
	 * @returns a promise from the main process to expand the window.
	 * */
	async addPanel(): Promise<void> {
		this.splitPanelService.addPanel(this.counter++, this.terminalComponent)
		try {
			if(this.splitPanelContent.length === 1) {
				await this.electronService
					.rendererInvokeMainToPerformAction(IPCChannelNames.EXPAND_WINDOW, { width: 915, height:450 })
			}
			if(this.splitPanelContent.length === 2) {
				await this.electronService.rendererInvokeMainToPerformAction(IPCChannelNames.EXPAND_WINDOW, { width: 1245, height:450 })
			}
		}
		catch (e) {
			alert(e)
		}
	}

	/**
	 * Use the split panel service to remove a new terminal to the split panel.
	 * @param {number} panelToRemove the id of the panel to remove from the split panel.
	 * @returns a promise from the main process to shrink window
	 * */
	async removePanel(panelToRemove: number): Promise<void> {
		this.splitPanelService.removePanel(panelToRemove)
		try {
			if(this.splitPanelContent.length === 2) {
				await this.electronService
					.rendererInvokeMainToPerformAction(IPCChannelNames.SHRINK_WINDOW, { width: 915, height:450 })
			}
			if(this.splitPanelContent.length === 1) {
				await this.electronService.rendererInvokeMainToPerformAction(IPCChannelNames.SHRINK_WINDOW, { width: 580, height:450 })
			}
		}
		catch (e) {
			alert(e)
		}
	}
}
