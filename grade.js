let subjects = [];
let maxMarks = [];

function generateSubjects() {
    const subjectCount = parseInt(document.getElementById('Total_sub').value, 10);
    const dynamicInputs = document.getElementById('dynamic-inputs');

    dynamicInputs.innerHTML = '';

    for (let i = 1; i <= subjectCount; i++) {
        const subjectDiv = document.createElement('div');
        subjectDiv.className = 'subject-div';

        const subjectLabel = document.createElement('label');
        subjectLabel.setAttribute('for', `subject${i}`);
        subjectLabel.textContent = `Subject ${i}`;

        const subjectInput = document.createElement('input');
        subjectInput.type = 'text';
        subjectInput.id = `subject${i}`;
        subjectInput.name = `subject${i}`;
        subjectInput.placeholder = `Subject ${i}`;

        const maxMarksLabel = document.createElement('label');
        maxMarksLabel.setAttribute('for', `maxMarks${i}`);
        maxMarksLabel.textContent = `Max Marks ${i}`;

        const maxMarksInput = document.createElement('input');
        maxMarksInput.type = 'number';
        maxMarksInput.id = `maxMarks${i}`;
        maxMarksInput.name = `maxMarks${i}`;
        maxMarksInput.placeholder = `Max Marks ${i}`;

        subjectDiv.appendChild(subjectLabel);
        subjectDiv.appendChild(subjectInput);
        subjectDiv.appendChild(maxMarksLabel);
        subjectDiv.appendChild(maxMarksInput);

        dynamicInputs.appendChild(subjectDiv);
    }

    
    document.getElementById('section2').style.display = 'block';
    document.getElementById('section2').scrollIntoView({ behavior: 'smooth' });
}

function generateStudentForm() {
    const studentCount = parseInt(document.getElementById('count').value, 10);
    const studentForm = document.getElementById('student-form');

    
    subjects = [];
    maxMarks = [];
    for (let i = 1; i <= parseInt(document.getElementById('Total_sub').value, 10); i++) {
        subjects.push(document.getElementById(`subject${i}`).value);
        maxMarks.push(parseInt(document.getElementById(`maxMarks${i}`).value, 10));
    }

    
    studentForm.innerHTML = '';

    for (let i = 1; i <= studentCount; i++) {
        const studentDiv = document.createElement('div');
        studentDiv.className = 'student-div';

        const studentLabel = document.createElement('label');
        studentLabel.setAttribute('for', `student${i}`);
        studentLabel.textContent = `Student ${i} Name`;

        const studentInput = document.createElement('input');
        studentInput.type = 'text';
        studentInput.id = `student${i}`;
        studentInput.name = `student${i}`;
        studentInput.placeholder = `Student ${i} Name`;

        studentDiv.appendChild(studentLabel);
        studentDiv.appendChild(studentInput);

        for (let j = 0; j < subjects.length; j++) {
            const subjectLabel = document.createElement('label');
            subjectLabel.setAttribute('for', `student${i}_subject${j}`);
            subjectLabel.textContent = `${subjects[j]} Marks`;

            const subjectInput = document.createElement('input');
            subjectInput.type = 'number'; 
            subjectInput.id = `student${i}_subject${j}`;
            subjectInput.name = `student${i}_subject${j}`;
            subjectInput.placeholder = `${subjects[j]} Marks`;

            studentDiv.appendChild(subjectLabel);
            studentDiv.appendChild(subjectInput);
        }

        studentForm.appendChild(studentDiv);
    }

    
    document.getElementById('section3').style.display = 'block';
    document.getElementById('section3').scrollIntoView({ behavior: 'smooth' });
}

function calculateGrades() {
    const studentCount = parseInt(document.getElementById('count').value, 10);
    const gradesTable = document.getElementById('grades-table');

    
    gradesTable.innerHTML = '';

    
    const headerRow = document.createElement('tr');
    const headers = ['Student Name', ...subjects, 'Total Marks', 'Percentage', 'Grade'];
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });
    gradesTable.appendChild(headerRow);

    for (let i = 1; i <= studentCount; i++) {
        const row = document.createElement('tr');

        
        const studentName = document.getElementById(`student${i}`).value;
        const studentCell = document.createElement('td');
        studentCell.textContent = studentName;
        row.appendChild(studentCell);

        let totalMarks = 0;
        let maxTotalMarks = 0;

        
        subjects.forEach((subject, index) => {
            const marks = parseInt(document.getElementById(`student${i}_subject${index}`).value, 10);
            const subjectCell = document.createElement('td');
            subjectCell.textContent = marks;
            row.appendChild(subjectCell);
            totalMarks += marks;
            maxTotalMarks += maxMarks[index];
        });

        
        const totalCell = document.createElement('td');
        totalCell.textContent = totalMarks;
        row.appendChild(totalCell);

        
        const percentage = (totalMarks / maxTotalMarks) * 100;
        const percentageCell = document.createElement('td');
        percentageCell.textContent = percentage.toFixed(2) + '%';
        row.appendChild(percentageCell);

        
        const gradeCell = document.createElement('td');
        let grade;
        if (percentage >= 90) grade = 'A+';
        else if (percentage >= 80) grade = 'A';
        else if (percentage >= 70) grade = 'B+';
        else if (percentage >= 60) grade = 'B';
        else if (percentage >= 50) grade = 'C';
        else grade = 'F';
        gradeCell.textContent = grade;
        row.appendChild(gradeCell);

        gradesTable.appendChild(row);
    }

    
    document.getElementById('section4').style.display = 'block';
    document.getElementById('section4').scrollIntoView({ behavior: 'smooth' });
}
