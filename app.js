const inputElement = document.getElementById('title')
const create = document.getElementById('create')
const list = document.getElementById('list')

const notes = [
	{
		title: 'сходить в парикмахерскую',
		completed: false,
	},
	{
		title: 'сходить в больницу',
		completed: true,
	},
]

function render() {
	list.innerHTML = ''
	for (let i = 0; i < notes.length; i++) {
		list.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
	}
}

render()

create.onclick = function () {
	if (inputElement.value.length === 0) {
		return
	}
	const newNote = {
		title: inputElement.value,
		completed: false,
	}
	notes.push(newNote)
	render()

	inputElement.value = ''
}

list.onclick = function (event) {
	if (event.target.dataset.index) {
		const index = parseInt(event.target.dataset.index)
		const type = event.target.dataset.type
		if (type === 'toggle') {
			notes[index].completed = !notes[index].completed
		} else if (type === 'remove') {
			notes.splice(index, 1)
		}
	}
	render()
}

function getNoteTemplate(value, i) {
	return `<li class="list-group-item d-flex justify-content-between align-items-center">
 <span class="${value.completed ? 'text-decoration-line-through' : ''}">${
		value.title
	}</span>
 <span>
	<span class="btn btn-small btn-${
		value.completed ? 'warning' : 'success'
	}" data-index="${i}" data-type="toggle">&check;</span>
	<span class="btn btn-small btn-danger" data-index="${i}"  data-type="remove">&times;</span>
 </span>
</li>`
}
