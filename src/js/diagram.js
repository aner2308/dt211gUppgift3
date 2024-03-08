"use strict";

const url = 'https://studenter.miun.se/~mallar/dt211g/';
window.onload = init();


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
                    display: true,
                    position: 'right'
                }, // Display the legend
                title: {
                    display: true,
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
                    display: true,
                    position: 'left'
                },
                title: {
                    display: true,
                    text: "De mest populära programmen HT2023"
                }
            }
        });



    } catch (error) {
        console.error('Error:', error);
    }
}

