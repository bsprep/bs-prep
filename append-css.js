const fs = require('fs');
const css = `
/* Driver.js Premium Theme */
.driverjs-theme-premium .driver-popover {
  background-color: #0a192f !important;
  color: white !important;
  border-radius: 24px !important;
  padding: 24px !important;
  border: 2px solid rgba(255,255,255,0.1) !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
  max-width: 400px !important;
}

.driverjs-theme-premium .driver-popover-title {
  font-size: 20px !important;
  font-weight: 900 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.05em !important;
  margin-bottom: 12px !important;
  color: white !important;
}

.driverjs-theme-premium .driver-popover-description {
  font-size: 14px !important;
  font-weight: 500 !important;
  color: rgba(255, 255, 255, 0.7) !important;
  line-height: 1.6 !important;
}

.driverjs-theme-premium .driver-popover-footer {
  margin-top: 24px !important;
}

.driverjs-theme-premium .driver-popover-btn {
  background-color: white !important;
  color: #0a192f !important;
  text-transform: uppercase !important;
  letter-spacing: 0.1em !important;
  font-weight: 900 !important;
  font-size: 12px !important;
  border-radius: 9999px !important;
  padding: 10px 20px !important;
  border: none !important;
  text-shadow: none !important;
  transition: all 0.2s !important;
}

.driverjs-theme-premium .driver-popover-btn-prev {
  background-color: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.driverjs-theme-premium .driver-popover-btn:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
}

.driverjs-theme-premium .driver-popover-progress-text {
  color: rgba(255,255,255,0.5) !important;
  font-weight: 700 !important;
  font-size: 12px !important;
}
`;
fs.appendFileSync('app/globals.css', css);
console.log('Appended driver.js custom CSS');
