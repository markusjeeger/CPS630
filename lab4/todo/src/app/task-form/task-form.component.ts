import { Component } from '@angular/core';
import { ListItem } from '../list-item';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import * as SampleJson from "../../assets/todo.json";


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})

export class TaskFormComponent {
	item = new ListItem("", false, "");
	items = [];
	tasks = [];
	message = "";
	fileString;
	sourceFileString;
	
	ngOnInit() {
		//console.log(window.localStorage.getItem('todo.json'));
		this.sourceFileString = JSON.parse(window.localStorage.getItem('todo.json')); //SampleJson.default;
		for (var i = 0; i < this.sourceFileString.todo.length; i++)
		{
			var item = this.sourceFileString.todo[i];
			if (!this.checkExisting(item.task))
			{
				this.items.push(new ListItem(item.task, item.complete, item.description));
				this.tasks.push(item.task);
			}
		}
	}
	
	onSubmit() 
	{ 
		if (!this.checkExisting(this.item.task))
		{
			this.items.push(this.item);
			this.tasks.push(this.item.task);
			this.toJSON();
			this.newTask();
		}
	}
	
	newTask()
	{
		this.item = new ListItem('', false, '');
	}
	
	removeItem(item)
	{
		var index = this.items.indexOf(item);
		if (index !== -1) 
		{
			this.items.splice(index, 1);
			this.tasks.splice(index,1);
			this.toJSON()
		}	
	}
	
	checkExisting(task)
	{
		var index = this.tasks.indexOf(task);
		if (index !== -1) 
		{
			this.message = "Task Already Exists!"
			return true;
		}	
		else
		{
			this.message = "Added Task!"
			return false;
		}
	}

	public files: UploadFile[] = [];
 
	public dropped(event: UploadEvent) {
		this.files = event.files;
		for (const droppedFile of event.files) { 
			if (droppedFile.fileEntry.isFile) {
				const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
				fileEntry.file((file: File) => {
					console.log(file);
					
					var myReader = new FileReader();
					myReader.onload = (e) => {
						console.log(myReader.result);
						this.fileString = myReader.result;
						this.fileToItems();
					};	
					myReader.readAsText(file);					
				});
			} 
			else {
				console.log("Not a File");
			}
		}
	}
 
	public fileOver(event){
		console.log(event);
	}
 
	public fileLeave(event){
		console.log(event);
	}
	
	fileToItems()
	{
		var source = JSON.parse(this.fileString);
		for (var i = 0; i < source.todo.length; i++)
		{
			var item = source.todo[i];
			if (!this.checkExisting(item.task))
			{
				this.items.push(new ListItem(item.task, item.complete == "true", item.description));
				this.tasks.push(item.task);
			}
		}
		this.toJSON();
	}
	
	toJSON()
	{
		window.localStorage.setItem('todo.json', '{ "todo":' + JSON.stringify(this.items) + "}");
		console.log(window.localStorage.getItem('todo.json'));
	}
}

/*  	saveJSON()
	{
		//window.webkitRequestFileSystem(window.PERSISTANT , 1024*1024, this.writeToFile);
	}
	
	writeToFile(fs)
	{
		//fs.root.getFile("info.txt", {create: false}, function(DatFile) { DatFile.remove(function() {}); })
		//console.log(this);
		//fs.root.getFile("todotest.json", {create: true}, writerBoy , onError);
	} */

/* function onError(e)
{
	console.log(e.message);
}

function writerBoy(file)
{
	console.log("Fuck");
	console.log(file);
	file.createWriter(toJSONboy);
}

function toJSONboy(fileWriter)
{
	console.log("Something2");
	var blob = new Blob(["Lorem Ipsum"], {type: "text/plain"});
	fileWriter.write(blob);
} */
