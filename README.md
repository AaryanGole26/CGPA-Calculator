# Mumbai University CGPI Calculator (C-Scheme)

A modern, responsive web application for calculating CGPI (Cumulative Grade Point Index), SGPA (Semester Grade Point Index), and percentage for Mumbai University's C-Scheme. Perfect for engineering students who need to track their academic performance.

## Features

✨ **Core Functionality**
- **CGPI Calculation**: Computes CGPI using official Mumbai University formulas
- **SGPA Tracking**: Monitor semester-wise SGPA trends with animated charts
- **Percentage Conversion**: Automatic percentage calculation based on official conversion formulas
- **Multiple Input Methods**: Enter marks, SGPA, or CR×GP directly from your marksheet

📊 **Advanced Features**
- **Performance Prediction**: Estimate required SGPA for achieving a target CGPI in any semester
- **Flexible Credit Handling**: Support for variable credits across different courses and semesters
- **SGPA Trend Visualization**: Interactive chart showing semester-wise performance trends
- **PDF Report Generation**: Download a professional academic report with all calculations and visualizations

🎨 **User Experience**
- **Modern Glassmorphism Design**: Beautiful, contemporary UI with smooth animations
- **Fully Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessible**: Complete ARIA labels and semantic HTML for screen readers
- **SEO Optimized**: Structured metadata for better search engine visibility

## Official Formulas

### CGPI Calculation
```
CGPI = Σ(CR × GP) / Σ Credits
```

### Percentage Conversion
```
If CGPI < 7:
  Percentage = 7.1 × CGPI + 12

If CGPI ≥ 7:
  Percentage = 7.4 × CGPI + 12
```

## How to Use

1. **Enter Semester Data**
   - Enter SGPA for each semester (or marks to auto-calculate)
   - Enter CR×GP for each semester (or auto-calculated from SGPA × Credits)
   - Enter or auto-calculate credits for each course

2. **Calculate CGPI**
   - Click the "Calculate" button
   - View your final CGPI, percentage, and SGPA trend chart

3. **Predict Performance**
   - Set your target CGPI
   - Enter the semester you want to achieve it in
   - The calculator shows the required SGPA
   - Experiment with different credit scenarios using the prompt

4. **Download Report**
   - Click "Download Report" to get a detailed PDF with:
     - Semester data table
     - Calculation formulas
     - Summary metrics
     - SGPA trend chart

## Grade Point Scale (C-Scheme) - Applicable to Engg/Pharm/B. VOC (I.D.) UG

| Percentage of Marks Obtained   | Grade | Grade Point | Performance |
|----------|-------|-------------|-------------|
| 80.00 and above  | O     |    10       | Outstanding |
| 75.00 - 79.99    | A     |     9       | Excellent |
| 70.00 - 74.99    | B     | 8           | Very Good |
| 60.00 - 69.99    | C     |7            | Good |
| 50.00 - 59.99    | D     | 6           | Fair |
| 45.00 - 49.99    | E     | 5           | Average |
| 40.00 - 44.99    | P     | 4           | Pass |
| Less than 40.00  | F     | 0           | Fail |

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Charting**: Chart.js with datalabels plugin
- **Math Rendering**: KaTeX for professional formula display
- **PDF Generation**: jsPDF with autotable
- **Design**: Glassmorphism with backdrop-filter blur
- **Animations**: CSS animations with responsive design

## Technical Features

- **Real-time Calculations**: Instant SGPA and credits auto-calculation
- **Vector Graphics in PDF**: Chart rendered as vectors for perfect resolution
- **Responsive Canvas**: Chart adapts to all screen sizes
- **Browser Compatibility**: Works on all modern browsers
- **No Server Required**: Pure client-side computation

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
CGPA_calc/
├── index.html          # Main HTML file
├── style.css           # Styling with glassmorphism
├── script.js           # Core calculator logic
├── README.md           # Documentation
└── LICENSE             # MIT License
```

## Installation

No installation required! Just clone or download and open `index.html` in your browser.

For GitHub Pages deployment:
1. Push to a GitHub repository
2. Enable GitHub Pages from repository settings
3. Access at `https://aaryangole26.github.io/CGPA-Calculator/`

## API

### JavaScript Functions

```javascript
// Core calculation
calculate()                    // Calculates CGPI and updates display

// Prediction
predictCGPI()                 // Predicts required SGPA for target semester

// Chart management
drawChart(data)               // Renders SGPA trend chart

// PDF export
downloadPDF()                 // Generates and downloads academic report

// Auto-calculation
autoFromMarks(semester)       // Auto-calculates SGPA from marks
autoCredits(semester)         // Auto-calculates credits from SGPA/CR×GP
```

## Calculation Examples

**Example 1: Calculate CGPI from Marksheet**
- Sem 1: SGPA 8.5, Credits 20, CR×GP 170
- Sem 2: SGPA 8.0, Credits 22, CR×GP 176
- Total: CR×GP = 346, Credits = 42
- CGPI = 346/42 = 8.24
- Percentage = 7.4 × 8.24 + 12 = 72.98%

**Example 2: Predict Required SGPA**
- Want CGPI 8.0 in Semester 3
- Current: CR×GP = 346, Credits = 42
- Sem 3 Credits (assumed): 23
- Required: SGPA = [(8.0 × (42+23)) - 346] / 23 = 8.04

## Features Guide

### SGPA Trend Chart
- Animated line chart showing semester-wise SGPA
- Data labels on each point for exact values
- Responsive sizing for all devices
- Color-coded styling matching the theme

### PDF Report
- Professional academic layout
- Semester data table
- Official formulas
- Summary metrics
- Vector-drawn SGPA chart
- Single-page format

### Performance Predictor
- Generic for any semester (not just final)
- Auto-calculates average credits from previous semesters
- Manual credit override with prompt
- Shows which credits were used in calculation

## Accessibility

- ✅ Semantic HTML5 structure
- ✅ ARIA labels on all inputs
- ✅ Proper heading hierarchy
- ✅ Keyboard navigable
- ✅ Screen reader compatible
- ✅ High contrast theme colors

## SEO Optimization

- Open Graph tags for social sharing
- Twitter Card support
- Structured meta descriptions
- Mobile-friendly viewport
- Keywords for discoverability

## Performance

- Lightweight: ~150KB total (gzipped)
- No external dependencies (except CDN libraries)
- Instant calculations
- Smooth 60fps animations
- Optimized chart rendering

## Troubleshooting

**Chart not showing?**
- Ensure Chart.js is loaded from CDN
- Check browser console for errors
- Try refreshing the page

**PDF download not working?**
- Ensure jsPDF library is loaded
- Try a different browser
- Check popup blocker settings

**Calculations incorrect?**
- Verify you entered correct SGPA/marks
- Check that credits are filled for relevant semesters
- Ensure you hit "Calculate" button

## Contributing

Feel free to fork, modify, and improve! This is created for the Mumbai University community.

## Disclaimer

This calculator implements the official Mumbai University C-Scheme formulas. Always cross-check with official university publications for accuracy. This tool is provided as-is for educational purposes.

## Author

Made with ❤️ for the students of Mumbai University

**Created by**: Aaryan Gole

## License

MIT License - See LICENSE file for details

## Support

Found a bug? Have a feature request? 
- Open an issue on GitHub
- Create a pull request with improvements
- Share feedback and suggestions

## Changelog

**v1.0** - Initial Release
- CGPI and percentage calculation
- SGPA trend visualization
- PDF report generation
- Performance prediction tool
- Responsive design with glassmorphism
- SEO optimization and accessibility

---

**Last Updated**: March 2026

Made with ❤️ by a student, for the students of Mumbai University