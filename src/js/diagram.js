"use strict";

const url = 'https://studenter.miun.se/~mallar/dt211g/';
window.onload = init();

let kurs1El = document.getElementById('kurs1');
let kurs2El = document.getElementById('kurs2');
let kurs3El = document.getElementById('kurs3');
let kurs4El = document.getElementById('kurs4');
let kurs5El = document.getElementById('kurs5');
let kurs6El = document.getElementById('kurs6');

let program1El = document.getElementById('program1');
let program2El = document.getElementById('program2');
let program3El = document.getElementById('program3');
let program4El = document.getElementById('program4');
let program5El = document.getElementById('program5');

async function init() {
    try {
        const response = await fetch(url);
        const courses = await response.json();

        let allCourses = courses.filter(course => course.type === "Kurs");
        let allPrograms = courses.filter(course => course.type === "Program")

        allCourses.sort((a, b) => b.applicantsTotal - a.applicantsTotal);
        allPrograms.sort((a, b) => b.applicantsTotal - a.applicantsTotal);

        const sixCourses = allCourses.slice(0, 6);
        const fivePrograms = allPrograms.slice(0, 5);

        // Extraherar antal sökandefrån de kvarstående värdena och lägger ihop dem i arrayer
        const applicantArray = sixCourses.map(course => { return course.applicantsTotal });
        const applicantArrayPrograms = fivePrograms.map(course => { return course.applicantsTotal });

        // Extraherar kurs och program från de kvarstående värdena och lägger ihop dem i arrayer
        const courseNameArray = sixCourses.map(course => { return course.name });
        const ProgramNameArray = fivePrograms.map(course => { return course.name });

        // Färger på tabellerna
        let barColors = ["red", "orange", "yellow", "green", "blue", "purple"];
        let pieColors = ["red", "orange", "yellow", "green", "blue"]

        kurs1El.innerHTML = courseNameArray[0];
        kurs2El.innerHTML = courseNameArray[1];
        kurs3El.innerHTML = courseNameArray[2];
        kurs4El.innerHTML = courseNameArray[3];
        kurs5El.innerHTML = courseNameArray[4];
        kurs6El.innerHTML = courseNameArray[5];

        program1El.innerHTML = ProgramNameArray[0];
        program2El.innerHTML = ProgramNameArray[1];
        program3El.innerHTML = ProgramNameArray[2];
        program4El.innerHTML = ProgramNameArray[3];
        program5El.innerHTML = ProgramNameArray[4];


        new Chart("barChart", {
            type: "bar",
            data: {
                datasets: [{
                    label: [courseNameArray[0]], // Label for the first bar
                    backgroundColor: barColors[0], // Color for the first bar
                    data: [applicantArray[0]] // Data for the first bar
                }, {
                    label: [courseNameArray[1]], // Label for the second bar
                    backgroundColor: barColors[1], // Color for the second bar
                    data: [applicantArray[1]] // Data for the second bar
                }, {
                    label: [courseNameArray[2]], // Label for the third bar
                    backgroundColor: barColors[2], // Color for the third bar
                    data: [applicantArray[2]] // Data for the third bar
                }, {
                    label: [courseNameArray[3]], // Label for the fourth bar
                    backgroundColor: barColors[3], // Color for the fourth bar
                    data: [applicantArray[3]] // Data for the fourth bar
                }, {
                    label: [courseNameArray[4]], // Label for the fifth bar
                    backgroundColor: barColors[4], // Color for the fifth bar
                    data: [applicantArray[4]] // Data for the fifth bar
                }, {
                    label: [courseNameArray[5]], // Label for the sixth bar
                    backgroundColor: barColors[5], // Color for the sixth bar
                    data: [applicantArray[5]] // Data for the sixth bar
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    display: false,
                    position: 'bottom',
                    labels: {
                        fontSize: 18,
                        fontColor: 'black'
                    }
                }, // Display the legend
                title: {
                    display: false,
                    fontSize: 24,
                    fontColor: 'black',
                    text: "De mest populära kurserna HT2023"
                },
            }
        });

        new Chart("pieChart", {
            type: "pie",
            data: {
                labels: ProgramNameArray,
                datasets: [{
                    backgroundColor: pieColors,
                    data: applicantArrayPrograms
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                legend: {
                    display: false,
                    position: 'bottom',
                    allign: 'start',
                    labels: {
                        fontSize: 18,
                        fontColor: 'black'
                    }
                },
                title: {
                    display: false,
                    fontSize: 24,
                    fontColor: 'black',
                    text: "De mest populära programmen HT2023"
                }
            }
        });



    } catch (error) {
        console.error('Error:', error);
    }
}

