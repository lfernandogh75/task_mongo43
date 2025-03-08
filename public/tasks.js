document.addEventListener('DOMContentLoaded', fetchTasks);

document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    const token = localStorage.getItem('token');

    const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description })
    });

    if (response.ok) {
        fetchTasks();
    } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
    }
});

async function fetchTasks() {
    const token = localStorage.getItem('token');

    const response = await fetch('/api/tasks', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const tasks = await response.json();
    const tasksDiv = document.getElementById('tasks');
    tasksDiv.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.textContent = `${task.title}: ${task.description}`;
        tasksDiv.appendChild(taskElement);
    });
}
