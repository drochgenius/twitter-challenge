var columns, dragSrcEl, dropCallback;


module.exports = {
	/*
	 *	Initialize Drag & Drop
	 *
	 *  selector: the CSS selector to fetch all draggable items
	 *  callback: a function to call upon drag & drop action completion
	 *
	 **/
	init: function(selector, callback) {
		columns = document.querySelectorAll(selector);
		dropCallback = callback;
		[].forEach.call(columns, function(col) {
			col.addEventListener('dragstart', dragstart, false);
			col.addEventListener('dragenter', dragenter, false);
			col.addEventListener('dragover', dragover, false);
			col.addEventListener('dragleave', dragleave, false);
			col.addEventListener('drop', drop, false);
			col.addEventListener('dragend', dragend, false);
		});
	}
};

function dragstart(evt) {
	console.log("DnD::dragstart", evt);
	this.style.opacity = '0.2';
	var dataTransfer = evt.dataTransfer;
	dataTransfer.effectAllowed = 'move';
	dataTransfer.setData('text/html', this.innerHTML);
	dataTransfer.setDragImage(evt.target, 0, 0);

	dragSrcEl = this;

	return true;
}

function dragenter(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); // Necessary. Allows us to drop.
	}

	this.classList.add('over');
	return true;
}

function dragover(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); // Necessary. Allows us to drop.
	}
	this.classList.add('over');
	evt.dataTransfer.dropEffect = 'move'; // See the section on the DataTransfer object.

	return false;
}

function drop(evt) {
	console.log("DnD::onDrop");
	//var src = evt.dataTransfer.getData("Text");
	//evt.target.appendChild(document.getElementById(src));


	evt.stopPropagation();

	// Don't do anything if dropping the same column we're dragging.
	if (dragSrcEl !== this) {
		// Set the source column's HTML to the HTML of the column we dropped on.
		dragSrcEl.innerHTML = this.innerHTML;
		this.innerHTML = evt.dataTransfer.getData('text/html');
	}

	return false;
}

function dragleave(evt) {
	console.log("dragleave");
	this.classList.remove('over');
}

function dragend(evt) {
	this.style.opacity = '1';
	[].forEach.call(columns, function(col) {
		col.classList.remove('over');
	});

	if (typeof dropCallback === 'function') {
		// Execute the callback method passed to the init function
		dropCallback();
	}
}