import { Injectable } from "@angular/core"
import * as execa from "execa"
import * as childProcess from "child_process"

@Injectable({ providedIn: "root" })

export class CommandRunnerService {
	private execa: typeof execa
	private childProcess: typeof childProcess

	constructor() {
		this.execa = window.require("execa")
		this.childProcess = window.require("child_process")
	}

	runCommandAsUser(commandToRun: string): Promise<string> {
		let result: string = ""
		let error: string = ""

		return new Promise((resolve, reject) => {
			const {stdout} = this.execa.command(`${commandToRun}`)
			stdout.on("data", (chunk) => result += chunk)
			stdout.on("error", (chunk) => error += chunk)
			stdout.on("close", () => result ? resolve(result) : reject(error))
		})
	}
}
