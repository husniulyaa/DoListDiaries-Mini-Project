const todoForm = document.getElementById('todoForm');
const activity = document.getElementById('activity'); 
const date = document.getElementById('date');
const tag = document.getElementById('tag');
const tableBody = document.getElementById('tableBody');
const noTask = document.getElementById('noTask');
const filterSelect = document.getElementById('filterSelect');
const deleteAllBtn = document.getElementById('deleteAll');

todoForm.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const taskValue = activity.value; 
    const dateValue = date.value;
    const tagValue = tag.value;

    if(taskValue === '' || dateValue === '') {
        alert("Insert all the activity here!");
        return;
    }

    if(noTask) {
        noTask.style.display = 'none';
    }

    const newRow = document.createElement('tr');
    newRow.setAttribute('data-tag', tagValue);
    newRow.className = "bg-white border-b border-[#E3E7D3] text-[#1A1A1A] hover:bg-[#F1F3E0] transition-colors";
    
   newRow.innerHTML = `
    <td class="p-4 font-medium text-left">${taskValue}</td>
    <td class="p-4 text-xs text-center">
        <span class="bg-[#A1BC98] text-white px-2 py-1 rounded-full font-bold uppercase">${tagValue}</span>
    </td>
    <td class="p-4 text-sm">${dateValue}</td>
    <td class="p-4 text-xs text-center">
        <span onclick="changeStatus(this)" class="status-badge cursor-pointer bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold italic">PENDING</span>
    </td>
    <td class="p-4 text-center">
        <button class="text-red-500 hover:scale-125 transition-transform font-bold" onclick="deleteRow(this)">✕</button>
    </td>`;
    tableBody.appendChild(newRow);

    activity.value = '';
    date.value = '';
});

function deleteRow(btn) {
    const row = btn.closest('tr');
    row.remove();

    const currentRows = tableBody.querySelectorAll('tr:not(#noTask)');
    if(currentRows.length === 0) {
        if(noTask) noTask.style.display = 'table-row';
    }
}

deleteAllBtn.addEventListener('click', function() {
    const currentRows = tableBody.querySelectorAll('tr:not(#noTask)');
    
    if (currentRows.length > 0) {
        if (confirm("Are you sure you want to delete all tasks?")) {
            currentRows.forEach(row => row.remove());
            if(noTask) noTask.style.display = 'table-row';
        }
    } else {
        alert("No tasks to delete!");
    }
});

filterSelect.addEventListener('change', function() {
    const selectedFilter = this.value;
    const rows = tableBody.querySelectorAll('tr:not(#noTask)');

    rows.forEach(row => {
        const rowTag = row.getAttribute('data-tag');

        if (selectedFilter === "All" || rowTag === selectedFilter) {
            row.style.display = 'table-row';
        } else {
            row.style.display = 'none';
        }
    });
});

function changeStatus(element) {
    if (element.innerText === "PENDING") {
        element.innerText = "ON PROGRESS";
        element.className = "status-badge cursor-pointer bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold italic";
    } else if (element.innerText === "ON PROGRESS") {
        element.innerText = "DONE";
        element.className = "status-badge cursor-pointer bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold italic line-through";
        element.closest('tr').cells[0].classList.add('line-through', 'text-gray-400');
    } else {
        element.innerText = "PENDING";
        element.className = "status-badge cursor-pointer bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold italic";
        element.closest('tr').cells[0].classList.remove('line-through', 'text-gray-400');
    }
}