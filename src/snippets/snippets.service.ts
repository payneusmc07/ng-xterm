import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs"
import { FileSystemService } from "@shared/services"
import { locations, Snippet } from "@shared/utils"

@Injectable({ providedIn: "root" })

/** Provide a way for users to save commonly used terminal commands as reusable
 * "code snippets" which can be easily accessed and used from the terminal. */
export class SnippetsService {
	/** An initially empty array of Snippets which will hold the returned contents of the snippets file. */
	snippets: Snippet[] = []

	constructor(private readonly fileSystemService: FileSystemService){}

	/**
	 * Read the user saved snippets from the text file and return the value(s).
	 * @returns {Observable<Snippet[]>}an observable which holds the contents of the snippets file.
	 * */
	getSnippets(): Observable<Snippet[]>{
		// create the read stream to read the snippets file
		const snippetsFile = this.fileSystemService.fsExtra.createReadStream(locations.SNIPPETS_FILE, {autoClose: true})

		// The readStream emits the "data" event
		snippetsFile.on("data", (chunk: Buffer | string) => {
			// since the chunk returned by the readStream might be a Buffer, convert the received chunk to a string
			chunk.toString()
				// add a new line character to each chunk so the contents of the snippets file
				// is not returned as one line string
				.split("\n")
				// iterate through each chunk of the returned buffer and add it to the snippets array
				.forEach((value: string, index: number) => {
				this.snippets.push({
					id: index,
					name: value
				})
			})
		})
		// return the observable containing the contents of the read stream
		return of(this.snippets)
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
