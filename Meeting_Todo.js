// Utility function to save data to localStorage
const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

// Utility function to load data from localStorage
const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
};

// Fetch and render meetings
const fetchMeetings = () => {
    const meetings = loadFromLocalStorage("meetings");
    const meetingsList = document.getElementById("meetingsList");
    meetingsList.innerHTML = meetings
        .map(
            (m, index) =>
                `<li>${m.title} - ${m.date} ${m.time}
                <button class="delete" onclick="deleteMeeting(${index})">Delete</button></li>`
        )
        .join("");
};

// Fetch and render todos
const fetchTodos = () => {
    const todos = loadFromLocalStorage("todos");
    const todosList = document.getElementById("todosList");
    todosList.innerHTML = todos
        .map(
            (t, index) =>
                `<li>${t.task}
                <button class="delete" onclick="deleteTodo(${index})">Delete</button></li>`
        )
        .join("");
};

// Add meeting
document.getElementById("meetingForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const description = document.getElementById("description").value;

    const meetings = loadFromLocalStorage("meetings");
    meetings.push({ title, date, time, description });
    saveToLocalStorage("meetings", meetings);

    fetchMeetings();
    e.target.reset();
});

// Add todo
document.getElementById("todoForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const task = document.getElementById("task").value;

    const todos = loadFromLocalStorage("todos");
    todos.push({ task });
    saveToLocalStorage("todos", todos);

    fetchTodos();
    e.target.reset();
});

// Delete meeting
const deleteMeeting = (index) => {
    const meetings = loadFromLocalStorage("meetings");
    meetings.splice(index, 1);
    saveToLocalStorage("meetings", meetings);
    fetchMeetings();
};

// Delete todo
const deleteTodo = (index) => {
    const todos = loadFromLocalStorage("todos");
    todos.splice(index, 1);
    saveToLocalStorage("todos", todos);
    fetchTodos();
};

// Initial fetch
fetchMeetings();
fetchTodos();
