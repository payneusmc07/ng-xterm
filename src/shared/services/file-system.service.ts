import { Injectable } from "@angular/core"
import * as fsExtra from "fs-extra"
import * as readline from "readline"

@Injectable({ providedIn: "root" })

export class FileSystemService {

	/** type context for the fsExtra module */
	fsExtra: typeof fsExtra

	/** type context for the readline module */
	readline: typeof readline

	/**
	 * By using window.require, the modules inside in the
	 * constructor body can be used in the renderer (Angular)
	 * process.
	 * @see ./typings.d.ts
	 * */
	constructor() {
		this.fsExtra = window.require("fs-extra")
		this.readline = window.require("readline")
	}

	/**
	 * Append new data to a file rather than overwriting it.
	 * @param {string} filePath the path to the file which is being modified.
	 * @param {string} dataToAppend the data being appended to the file.
	 * */
	appendToFile(filePath: string, dataToAppend: string) {
		this.fsExtra.writeFile(filePath, `\n${ dataToAppend }`,
			{ encoding: "utf8", flag: "a" }, (error) => console.warn(error))
	}

	/**
	 * Create a new file and overwrite any existing data.
	 * @param {string} filePath the path to the file which is being modified.
	 * @param {string} dataToAppend the data being appended to the file.
	 * */

	writeFile(filePath: string, dataToAppend: string) {
		const newFile = this.fsExtra.createWriteStream(filePath, {flags: "w+"})
		newFile.write(`${dataToAppend}`, (error) => console.log(error))
	}

	openAndWrite(filePath: string, dataToAppend: string) {
		this.fsExtra.open(filePath, "w+", ((err, fd) => {
			if(err) {
				alert(err.message)
				return
			}
			this.fsExtra.writeFile(filePath, dataToAppend)
				.catch((reason) => alert(reason))
			this.fsExtra.close(fd, (error) => {
				if(error) {
					alert(error)
				}
			})
		}))

	}
	/**
	 * Read and return the contents of a directory
	 * @param {string} directoryPath the path to the directory which will be read.
	 * @returns a promise containing the contents of the directory.
	 * */
	readDirectory(directoryPath: string): Promise<string[]> {
		return this.fsExtra.readdir(directoryPath)
	}

	async readFile(fileToRead: string): Promise<string> {
		return new Promise((resolve, reject) => {
			let data = ""
			let errorMessage = ""
			const buffer = this.fsExtra.createReadStream(fileToRead)

			buffer.on("data", (chunk) => data += chunk)
			buffer.on("error", (error) => errorMessage += error)
			buffer.on("close", () => (data ? resolve(data) : reject(errorMessage)))
		})

	}

	copyFile(fromPath: string, toPath: string) {
		if(this.checkIfPathExists(toPath)) {
			console.log(`${toPath} exists`)
		}
		else {
			this.fsExtra.copy(fromPath, toPath)
				.then(() => console.log(`copied ${ fromPath } to ${ toPath }`))
				.catch((error) => alert(error))
		}
	}


	checkIfPathExists(pathToCheck: string): boolean {
		return this.fsExtra.existsSync(pathToCheck)
	}
}
