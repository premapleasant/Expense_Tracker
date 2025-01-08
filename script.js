const button = document.querySelector('button');
button.addEventListener('click', function () {
    const description = document.querySelector('#text-area input').value;
    const type = document.querySelector('#expense select').value;
    const amount = parseFloat(document.querySelector('#amount input').value);
    let date = document.querySelector('#date input').value;

    if (!description || isNaN(amount) || amount <= 0) {
        alert('Please enter valid details!');
        return;
    }

    if (!date) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        date = `${year}-${month}-${day}T${hours}:${minutes}`;
    }

    const Texttype = type === "0" ? "Income" : "Expense";

    const tableBody = document.querySelector('table tbody');
    const newRow = document.createElement('tr');
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);

    cell1.textContent = description;
    cell2.textContent = amount;
    cell3.textContent = Texttype;
    cell4.textContent = " ";
    cell5.textContent = date;
    tableBody.appendChild(newRow);

    // Update Income, Expense, and Balance
    const updatedBalance = updateBalance(Texttype, amount);

    cell4.textContent = updatedBalance.toFixed(2);

    // Clear the inputs
    document.querySelector('#text-area input').value = '';
    document.querySelector('#expense select').value = "0";
    document.querySelector('#amount input').value = '';
    document.querySelector('#date input').value = '';
});

function updateBalance(type, amount) {
    const incomeLabel = document.querySelector('#balance label:nth-child(1)');
    const expenseLabel = document.querySelector('#balance label:nth-child(2)');
    const balanceLabel = document.querySelector('#balance label:nth-child(3)');

    let income = parseFloat(incomeLabel.textContent.split(':')[1] || 0);
    let expense = parseFloat(expenseLabel.textContent.split(':')[1] || 0);

    if (type === "Income") {
        income += amount;
    } else {
        expense += amount;
    }

    const balance = income - expense;

    incomeLabel.textContent = `Income: ${income.toFixed(2)}`
    expenseLabel.textContent = `Expense: ${expense.toFixed(2)}`
    balanceLabel.textContent = `Balance: ${balance.toFixed(2)}`

    return balance;
}

