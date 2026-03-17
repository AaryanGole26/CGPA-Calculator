let chart

function gradePoint(marks){

if(marks>=90) return 10
if(marks>=80) return 9
if(marks>=70) return 8
if(marks>=60) return 7
if(marks>=50) return 6
if(marks>=45) return 5
if(marks>=40) return 4

return 0

}

function autoFromMarks(i){

let marks=parseFloat(document.getElementById("marks"+i).value)

if(!marks) return

let gp=gradePoint(marks)

let sgpa=gp

document.getElementById("sgpa"+i).value=sgpa

autoCredits(i)

}

function autoCredits(i){

let crgp=parseFloat(document.getElementById("crgp"+i).value)
let sgpa=parseFloat(document.getElementById("sgpa"+i).value)

if(crgp && sgpa){

let credits=crgp/sgpa
document.getElementById("cr"+i).value=credits.toFixed(0)

}

if(sgpa && !crgp){

let credits=document.getElementById("cr"+i).value

if(credits){

document.getElementById("crgp"+i).value=(sgpa*credits).toFixed(0)

}

}

}

function calculate(){

let totalCRGP=0
let totalCR=0
let sgpa=[]

for(let i=1;i<=8;i++){

let crgp=parseFloat(document.getElementById("crgp"+i).value)||0
let sg=parseFloat(document.getElementById("sgpa"+i).value)
let cr=parseFloat(document.getElementById("cr"+i).value)

if(!cr && crgp && sg){
cr = crgp/sg
document.getElementById("cr"+i).value = cr.toFixed(0)
}

cr=parseFloat(document.getElementById("cr"+i).value)||0

totalCRGP+=crgp
totalCR+=cr

if(sg){
sgpa.push(sg)
}

}

if(totalCR===0){
alert("Enter values first")
return
}

let cgpi=totalCRGP/totalCR

let percentage

if(cgpi<7){
percentage=7.1*cgpi+12
}else{
percentage=7.4*cgpi+12
}

document.getElementById("result").innerHTML=

`
CGPI: ${cgpi.toFixed(3)} <br>
Percentage: ${percentage.toFixed(2)}%
`

drawChart(sgpa)

window.finalCGPI=cgpi
window.finalPercentage=percentage

}


function drawChart(data) {
	const ctx = document.getElementById("trendChart");
	if (chart) {
		chart.destroy();
	}
	chart = new Chart(ctx, {
		type: "line",
		data: {
			labels: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"],
			datasets: [
				{
					label: "SGPA Trend",
					data: data,
					fill: false,
					borderColor: "#48c6ef",
					backgroundColor: "#6c63ff",
					tension: 0.35,
					pointBackgroundColor: "#fff",
					pointBorderColor: "#6c63ff",
					pointRadius: 6,
					pointHoverRadius: 9,
					pointBorderWidth: 3,
					pointStyle: 'circle',
				},
			],
		},
		options: {
			responsive: true,
			animation: {
				duration: 1200,
				easing: 'easeOutQuart',
			},
			plugins: {
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						color: '#6c63ff',
						font: { weight: 'bold', size: 16 },
						boxWidth: 24,
						padding: 20,
					},
				},
				tooltip: {
					enabled: true,
					callbacks: {
						label: function(context) {
							return `SGPA: ${context.parsed.y}`;
						}
					},
					backgroundColor: 'rgba(76,110,245,0.9)',
					titleColor: '#fff',
					bodyColor: '#fff',
					borderColor: '#6c63ff',
					borderWidth: 1.5,
				},
				datalabels: {
					display: true,
					color: '#6c63ff',
					font: { weight: 'bold', size: 14 },
					align: 'top',
					formatter: function(value) {
						return value ? value.toFixed(2) : '';
					},
				},
			},
			layout: {
				padding: 16,
			},
			scales: {
				x: {
					grid: {
						color: 'rgba(108,99,255,0.08)',
						borderColor: '#e0e7ff',
					},
					ticks: {
						color: '#232946',
						font: { weight: 'bold', size: 14 },
					},
				},
				y: {
					grid: {
						color: 'rgba(108,99,255,0.08)',
						borderColor: '#e0e7ff',
					},
					ticks: {
						color: '#232946',
						font: { weight: 'bold', size: 14 },
						stepSize: 0.5,
					},
				},
			},
			elements: {
				line: {
					borderWidth: 4,
				},
				point: {
					borderWidth: 3,
				},
			},
		},
		plugins: [window.ChartDataLabels],
	});
}

function downloadPDF(){

if(!window.finalCGPI){
alert("Calculate first")
return
}

const { jsPDF } = window.jspdf
let doc = new jsPDF()
const pageWidth = doc.internal.pageSize.getWidth()
const pageHeight = doc.internal.pageSize.getHeight()
const margin = 15
const contentWidth = pageWidth - (2 * margin)

// Header
doc.setFontSize(16)
doc.text("Academic CGPI Report",pageWidth/2,12,{align:'center'})

doc.setFontSize(9)
doc.text("University: Mumbai University",margin,21)

// Semester Data Table
doc.setFontSize(10)
doc.text("Semester Data",margin,28)

let tableData = []
for(let i=1;i<=8;i++){
	let sg = document.getElementById("sgpa"+i).value || ""
	let crgp = document.getElementById("crgp"+i).value || ""
	let cr = document.getElementById("cr"+i).value || ""
	if(sg || crgp || cr){
		tableData.push([`Sem ${i}`, sg, crgp, cr])
	}
}

doc.autoTable({
	startY: 32,
	head: [['Semester', 'SGPA', 'CR x GP', 'Credits']],
	body: tableData,
	margin: {left: margin, right: margin},
	styles: {fontSize: 8, cellPadding: 2.5},
	headStyles: {fillColor: [108,99,255], textColor: 255, fontStyle: 'bold', fontSize: 8},
	alternateRowStyles: {fillColor: [245,245,255]},
	columnStyles: {
		0: {cellWidth: contentWidth * 0.2},
		1: {cellWidth: contentWidth * 0.25},
		2: {cellWidth: contentWidth * 0.3},
		3: {cellWidth: contentWidth * 0.25}
	}
})

let finalY = doc.lastAutoTable.finalY + 8

// Formula Section
doc.setFontSize(9)
doc.text("Mumbai University Percentage Conversion",margin,finalY)
doc.setFontSize(7.5)
doc.text("If CGPI < 7   :   Percentage = 7.1 * CGPI + 12",margin,finalY+5)
doc.text("If CGPI >= 7  :   Percentage = 7.4 * CGPI + 12",margin,finalY+9)

finalY += 18

// Summary Table
let totalCRGP = 0
let totalCR = 0
for(let i=1;i<=8;i++){
	let crgp = parseFloat(document.getElementById("crgp"+i).value) || 0
	let cr = parseFloat(document.getElementById("cr"+i).value) || 0
	totalCRGP += crgp
	totalCR += cr
}

let summaryData = [
	['Total (CR x GP)', totalCRGP.toFixed(0)],
	['Total Credits', totalCR.toFixed(0)],
	['Final CGPI', window.finalCGPI.toFixed(2)],
	['Exact CGPI (unrounded)', window.finalCGPI.toFixed(4)],
	['MU Percentage', window.finalPercentage.toFixed(2)+'%']
]

doc.autoTable({
	startY: finalY,
	head: [['Metric', 'Value']],
	body: summaryData,
	margin: {left: margin, right: margin},
	styles: {fontSize: 7.5, cellPadding: 2.5},
	headStyles: {fillColor: [108,99,255], textColor: 255, fontStyle: 'bold', fontSize: 7.5},
	alternateRowStyles: {fillColor: [245,245,255]},
	columnStyles: {0: {cellWidth: contentWidth * 0.55}, 1: {cellWidth: contentWidth * 0.45}}
})

finalY = doc.lastAutoTable.finalY + 8

// Chart - with responsive sizing
doc.setFontSize(9)
doc.text("SGPA Performance Trend",margin,finalY)

const canvas = document.getElementById("trendChart")
const imgData = canvas.toDataURL("image/png")
const chartWidth = contentWidth
const chartHeight = (canvas.height / canvas.width) * chartWidth
const chartX = margin
const chartY = finalY + 4

// Check if chart fits on current page, add new page if needed
if(chartY + chartHeight > pageHeight - 20){
	doc.addPage()
	doc.text("SGPA Performance Trend (continued)",margin,15)
	doc.addImage(imgData,"PNG",margin,20,chartWidth,chartHeight)
} else {
	doc.addImage(imgData,"PNG",chartX,chartY,chartWidth,chartHeight)
}

// Footer
doc.setFontSize(8)
doc.text("Generated on: " + new Date().toLocaleDateString(),pageWidth/2,pageHeight-10,{align:'center'})

doc.save("MU_CGPI_Report.pdf")

}

function predictCGPI(){

let target = parseFloat(document.getElementById("targetCGPI").value)
let targetSem = parseInt(document.getElementById("targetSemester").value)

if(!target){
alert("Enter target CGPI")
return
}

if(!targetSem || targetSem < 1 || targetSem > 8){
alert("Enter a valid semester (1-8)")
return
}

let totalCRGP = 0
let totalCR = 0

// Calculate totals from semesters 1 to (targetSem - 1)
for(let i=1; i<targetSem; i++){
	let crgp = parseFloat(document.getElementById("crgp"+i).value) || 0
	let cr = parseFloat(document.getElementById("cr"+i).value) || 0
	totalCRGP += crgp
	totalCR += cr
}

if(targetSem === 1 && totalCR !== 0){
alert("For Sem 1, no previous semesters. Target CGPI = SGPA")
return
}

if(targetSem > 1 && totalCR === 0){
alert("Enter data for previous semesters first")
return
}

// Get credits for target semester
let targetCredits = parseFloat(document.getElementById("cr"+targetSem).value)

if(!targetCredits){
// Provide option to use estimate or common credit values
let averageCredits = 0
if(totalCR > 0){
	averageCredits = (totalCR / (targetSem - 1)).toFixed(1)
}
let userCredits = prompt(`Credits for Sem ${targetSem} not entered. \n\nEnter expected credits for Sem ${targetSem}:\n(Average from previous semesters: ${averageCredits})`, averageCredits || "20")

if(!userCredits){
return
}

targetCredits = parseFloat(userCredits)
if(!targetCredits || targetCredits <= 0){
alert("Enter valid credits")
return
}
}

let requiredCRGP = target*(totalCR + targetCredits) - totalCRGP

let requiredSGPA = requiredCRGP / targetCredits

if(requiredSGPA > 10){
	document.getElementById("prediction").innerHTML =
	`Target CGPI not achievable (SGPA required > 10)`
	return
}

if(requiredSGPA < 0){
	document.getElementById("prediction").innerHTML =
	`Target already achieved.`
	return
}

document.getElementById("prediction").innerHTML =
`Required SGPA in Sem ${targetSem}: <b>${requiredSGPA.toFixed(2)}</b><br><small>Based on ${targetCredits} credits</small>`

}