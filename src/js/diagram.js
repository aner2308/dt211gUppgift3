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
                labels: courseNameArray,
                datasets: [{
                    backgroundColor: pieColors,
                    data: applicantArray
                }]
            },
            options: {
                legend: { display: false },
                title: {
                    display: true,
                    text: "De mest populära kurserna HT2023"
                }
            }
        });

        new Chart("pieChart", {
            type: "pie",
            data: {
                labels: ProgramNameArray,
                datasets: [{
                    backgroundColor: barColors,
                    data: applicantArrayPrograms
                }]
            },
            options: {
                legend: { display: false },
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
