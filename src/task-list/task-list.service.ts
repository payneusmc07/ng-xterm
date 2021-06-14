import { Injectable } from "@angular/core"
import { Observable, of, Subject } from "rxjs"
import { FileSystemService, locations, Task } from "../shared"

@Injectable({ providedIn: "root" })

/** Provide a way for users to save commonly used terminal commands as reusable
 * "code snippets" which can be easily accessed and used from the terminal. */
export class TaskListService {

	taskList: Task[] = []
	taskSubject: Subject<string>
	private counter = 0

	constructor(private readonly fileSystemService: FileSystemService){}

	/**
	 * Read the user saved snippets from the text file and return the value(s).
	 * @returns an observable which holds the contents of the snippets file.
	 * */
	getTasks(): Observable<Task[]>{
		// create a read stream so the snippets file can be read line by line.
		const reader = this.fileSystemService.readline.createInterface({
			input: this.fileSystemService.fsExtra.createReadStream(locations.SNIPPETS_FILE),
			removeHistoryDuplicates: true
		})
		// listen for the "line" event to be emitted, and push each emitted line onto the readStream.
		reader.on("line", (line) => this.taskList.push({
			id: this.counter++,
			name: line.toString()
		}))
		// listen for the "close" event to be emitted, and remove all listeners from the readStream.
		reader.on("close", (() => reader.removeAllListeners()))
		return of(this.taskList)
	}

	/**
	 * Append the text the user has selected in the terminal and save it to the
	 * snippets file.
	 * @param {string} taskName the text the user has selected.
	 * */
	addTask(taskName: string) {
		this.fileSystemService.appendToFile(locations.SNIPPETS_FILE,taskName)
	}

}
