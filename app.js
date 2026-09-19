(() => {
  const PHOSPHOR_ICONS={"address-book":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M208,32H64a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V40A8,8,0,0,0,208,32ZM136,144a32,32,0,1,1,32-32A32,32,0,0,1,136,144Z\" opacity=\"0.2\"/><path d=\"M83.19,174.4a8,8,0,0,0,11.21-1.6,52,52,0,0,1,83.2,0,8,8,0,1,0,12.8-9.6A67.88,67.88,0,0,0,163,141.51a40,40,0,1,0-53.94,0A67.88,67.88,0,0,0,81.6,163.2,8,8,0,0,0,83.19,174.4ZM112,112a24,24,0,1,1,24,24A24,24,0,0,1,112,112Zm96-88H64A16,16,0,0,0,48,40V64H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v40H32a8,8,0,0,0,0,16H48v24a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V40A16,16,0,0,0,208,24Zm0,192H64V40H208Z\"/></svg>","bed":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M248,112v56H112V80H216A32,32,0,0,1,248,112Z\" opacity=\"0.2\"/><path d=\"M216,72H32V48a8,8,0,0,0-16,0V208a8,8,0,0,0,16,0V176H240v32a8,8,0,0,0,16,0V112A40,40,0,0,0,216,72ZM32,88h72v72H32Zm88,72V88h96a24,24,0,0,1,24,24v48Z\"/></svg>","calendar-check":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M216,48V88H40V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z\" opacity=\"0.2\"/><path d=\"M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-38.34-85.66a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L116,164.69l42.34-42.35A8,8,0,0,1,169.66,122.34Z\"/></svg>","calendar-dots":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M216,48V88H40V48a8,8,0,0,1,8-8H208A8,8,0,0,1,216,48Z\" opacity=\"0.2\"/><path d=\"M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z\"/></svg>","camera":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M208,64H176L160,40H96L80,64H48A16,16,0,0,0,32,80V192a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V80A16,16,0,0,0,208,64ZM128,168a36,36,0,1,1,36-36A36,36,0,0,1,128,168Z\" opacity=\"0.2\"/><path d=\"M208,56H180.28L166.65,35.56A8,8,0,0,0,160,32H96a8,8,0,0,0-6.65,3.56L75.71,56H48A24,24,0,0,0,24,80V192a24,24,0,0,0,24,24H208a24,24,0,0,0,24-24V80A24,24,0,0,0,208,56Zm8,136a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V80a8,8,0,0,1,8-8H80a8,8,0,0,0,6.66-3.56L100.28,48h55.43l13.63,20.44A8,8,0,0,0,176,72h32a8,8,0,0,1,8,8ZM128,88a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,88Zm0,72a28,28,0,1,1,28-28A28,28,0,0,1,128,160Z\"/></svg>","crown":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M216.71,99.73l-15.6,93.59a8,8,0,0,1-7.89,6.68H62.78a8,8,0,0,1-7.89-6.68L39.29,99.73l.08,0a19.82,19.82,0,0,0,9.22-4.16h0L88,144l32-73.65h0a20,20,0,0,0,15.92,0h0L168,144l39.39-48.48h0a19.82,19.82,0,0,0,9.22,4.16Z\" opacity=\"0.2\"/><path d=\"M248,80a28,28,0,1,0-51.12,15.77l-26.79,33L146,73.4a28,28,0,1,0-36.06,0L85.91,128.74l-26.79-33a28,28,0,1,0-26.6,12L47,194.63A16,16,0,0,0,62.78,208H193.22A16,16,0,0,0,209,194.63l14.47-86.85A28,28,0,0,0,248,80ZM128,40a12,12,0,1,1-12,12A12,12,0,0,1,128,40ZM24,80A12,12,0,1,1,36,92,12,12,0,0,1,24,80ZM193.22,192H62.78L48.86,108.52,81.79,149A8,8,0,0,0,88,152a7.83,7.83,0,0,0,1.08-.07,8,8,0,0,0,6.26-4.74l29.3-67.4a27,27,0,0,0,6.72,0l29.3,67.4a8,8,0,0,0,6.26,4.74A7.83,7.83,0,0,0,168,152a8,8,0,0,0,6.21-3l32.93-40.52ZM220,92a12,12,0,1,1,12-12A12,12,0,0,1,220,92Z\"/></svg>","dog":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M208,120.38V184a32,32,0,0,1-32,32H80a32,32,0,0,1-32-32V120.38L104,48h48Z\" opacity=\"0.2\"/><path d=\"M239.71,125l-16.42-88a16,16,0,0,0-19.61-12.58l-.31.09L150.85,40h-45.7L52.63,24.56l-.31-.09A16,16,0,0,0,32.71,37.05L16.29,125a15.77,15.77,0,0,0,9.12,17.52A16.26,16.26,0,0,0,32.12,144,15.48,15.48,0,0,0,40,141.84V184a40,40,0,0,0,40,40h96a40,40,0,0,0,40-40V141.85a15.5,15.5,0,0,0,7.87,2.16,16.31,16.31,0,0,0,6.72-1.47A15.77,15.77,0,0,0,239.71,125ZM32,128h0L48.43,40,90.5,52.37Zm144,80H136V195.31l13.66-13.65a8,8,0,0,0-11.32-11.32L128,180.69l-10.34-10.35a8,8,0,0,0-11.32,11.32L120,195.31V208H80a24,24,0,0,1-24-24V123.11L107.93,56h40.14L200,123.11V184A24,24,0,0,1,176,208Zm48-80L165.5,52.37,207.57,40,224,128ZM104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm72,0a12,12,0,1,1-12-12A12,12,0,0,1,176,140Z\"/></svg>","envelope-simple":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M224,56l-96,88L32,56Z\" opacity=\"0.2\"/><path d=\"M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z\"/></svg>","file-text":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M208,88H152V32Z\" opacity=\"0.2\"/><path d=\"M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Zm-32-80a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,136Zm0,32a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,168Z\"/></svg>","files":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M208,72V184a8,8,0,0,1-8,8H176V104L136,64H80V40a8,8,0,0,1,8-8h80Z\" opacity=\"0.2\"/><path d=\"M213.66,66.34l-40-40A8,8,0,0,0,168,24H88A16,16,0,0,0,72,40V56H56A16,16,0,0,0,40,72V216a16,16,0,0,0,16,16H168a16,16,0,0,0,16-16V200h16a16,16,0,0,0,16-16V72A8,8,0,0,0,213.66,66.34ZM168,216H56V72h76.69L168,107.31v84.53c0,.06,0,.11,0,.16s0,.1,0,.16V216Zm32-32H184V104a8,8,0,0,0-2.34-5.66l-40-40A8,8,0,0,0,136,56H88V40h76.69L200,75.31Zm-56-32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,152Zm0,32a8,8,0,0,1-8,8H88a8,8,0,0,1,0-16h48A8,8,0,0,1,144,184Z\"/></svg>","first-aid-kit":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M224,72V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H216A8,8,0,0,1,224,72Z\" opacity=\"0.2\"/><path d=\"M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Zm-56-64a8,8,0,0,1-8,8H136v16a8,8,0,0,1-16,0V144H104a8,8,0,0,1,0-16h16V112a8,8,0,0,1,16,0v16h16A8,8,0,0,1,160,136Z\"/></svg>","heart":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z\" opacity=\"0.2\"/><path d=\"M178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40ZM128,214.8C109.74,204.16,32,155.69,32,102A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,155.61,146.24,204.15,128,214.8Z\"/></svg>","heartbeat":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M232,102c0,66-104,122-104,122S24,168,24,102A54,54,0,0,1,78,48c22.59,0,41.94,12.31,50,32,8.06-19.69,27.41-32,50-32A54,54,0,0,1,232,102Z\" opacity=\"0.2\"/><path d=\"M72,144H32a8,8,0,0,1,0-16H67.72l13.62-20.44a8,8,0,0,1,13.32,0l25.34,38,9.34-14A8,8,0,0,1,136,128h24a8,8,0,0,1,0,16H140.28l-13.62,20.44a8,8,0,0,1-13.32,0L88,126.42l-9.34,14A8,8,0,0,1,72,144ZM178,40c-20.65,0-38.73,8.88-50,23.89C116.73,48.88,98.65,40,78,40a62.07,62.07,0,0,0-62,62c0,.75,0,1.5,0,2.25a8,8,0,1,0,16-.5c0-.58,0-1.17,0-1.75A46.06,46.06,0,0,1,78,56c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46c0,53.61-77.76,102.15-96,112.8-10.83-6.31-42.63-26-66.68-52.21a8,8,0,1,0-11.8,10.82c31.17,34,72.93,56.68,74.69,57.63a8,8,0,0,0,7.58,0C136.21,228.66,240,172,240,102A62.07,62.07,0,0,0,178,40Z\"/></svg>","house":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M216,120v96H152V152H104v64H40V120a8,8,0,0,1,2.34-5.66l80-80a8,8,0,0,1,11.32,0l80,80A8,8,0,0,1,216,120Z\" opacity=\"0.2\"/><path d=\"M219.31,108.68l-80-80a16,16,0,0,0-22.62,0l-80,80A15.87,15.87,0,0,0,32,120v96a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V160h32v56a8,8,0,0,0,8,8h64a8,8,0,0,0,8-8V120A15.87,15.87,0,0,0,219.31,108.68ZM208,208H160V152a8,8,0,0,0-8-8H104a8,8,0,0,0-8,8v56H48V120l80-80,80,80Z\"/></svg>","note-pencil":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M200,88l-72,72H96V128l72-72Z\" opacity=\"0.2\"/><path d=\"M229.66,58.34l-32-32a8,8,0,0,0-11.32,0l-96,96A8,8,0,0,0,88,128v32a8,8,0,0,0,8,8h32a8,8,0,0,0,5.66-2.34l96-96A8,8,0,0,0,229.66,58.34ZM124.69,152H104V131.31l64-64L188.69,88ZM200,76.69,179.31,56,192,43.31,212.69,64ZM224,128v80a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32h80a8,8,0,0,1,0,16H48V208H208V128a8,8,0,0,1,16,0Z\"/></svg>","notebook":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M80,40V216H48a8,8,0,0,1-8-8V48a8,8,0,0,1,8-8Z\" opacity=\"0.2\"/><path d=\"M184,112a8,8,0,0,1-8,8H112a8,8,0,0,1,0-16h64A8,8,0,0,1,184,112Zm-8,24H112a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm48-88V208a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V48A16,16,0,0,1,48,32H208A16,16,0,0,1,224,48ZM48,208H72V48H48Zm160,0V48H88V208H208Z\"/></svg>","paw-print":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M232,108a20,20,0,1,1-20-20A20,20,0,0,1,232,108ZM64,108a20,20,0,1,0-20,20A20,20,0,0,0,64,108ZM92,80A20,20,0,1,0,72,60,20,20,0,0,0,92,80Zm72,0a20,20,0,1,0-20-20A20,20,0,0,0,164,80Zm19.24,75.85A43.46,43.46,0,0,1,162.57,130a36,36,0,0,0-69.14,0,43.49,43.49,0,0,1-20.67,25.9,32,32,0,0,0,27.73,57.62,72.49,72.49,0,0,1,55,0,32,32,0,0,0,27.73-57.62Z\" opacity=\"0.2\"/><path d=\"M212,80a28,28,0,1,0,28,28A28,28,0,0,0,212,80Zm0,40a12,12,0,1,1,12-12A12,12,0,0,1,212,120ZM72,108a28,28,0,1,0-28,28A28,28,0,0,0,72,108ZM44,120a12,12,0,1,1,12-12A12,12,0,0,1,44,120ZM92,88A28,28,0,1,0,64,60,28,28,0,0,0,92,88Zm0-40A12,12,0,1,1,80,60,12,12,0,0,1,92,48Zm72,40a28,28,0,1,0-28-28A28,28,0,0,0,164,88Zm0-40a12,12,0,1,1-12,12A12,12,0,0,1,164,48Zm23.12,100.86a35.3,35.3,0,0,1-16.87-21.14,44,44,0,0,0-84.5,0A35.25,35.25,0,0,1,69,148.82,40,40,0,0,0,88,224a39.48,39.48,0,0,0,15.52-3.13,64.09,64.09,0,0,1,48.87,0,40,40,0,0,0,34.73-72ZM168,208a24,24,0,0,1-9.45-1.93,80.14,80.14,0,0,0-61.19,0,24,24,0,0,1-20.71-43.26,51.22,51.22,0,0,0,24.46-30.67,28,28,0,0,1,53.78,0,51.27,51.27,0,0,0,24.53,30.71A24,24,0,0,1,168,208Z\"/></svg>","pencil-simple":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z\" opacity=\"0.2\"/><path d=\"M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z\"/></svg>","phone":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M223.94,174.08A48.33,48.33,0,0,1,176,216,136,136,0,0,1,40,80,48.33,48.33,0,0,1,81.92,32.06a8,8,0,0,1,8.3,4.8l21.13,47.2a8,8,0,0,1-.66,7.53L89.32,117a7.93,7.93,0,0,0-.54,7.81c8.27,16.93,25.77,34.22,42.75,42.41a7.92,7.92,0,0,0,7.83-.59l25-21.3a8,8,0,0,1,7.59-.69l47.16,21.13A8,8,0,0,1,223.94,174.08Z\" opacity=\"0.2\"/><path d=\"M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46ZM176,208A128.14,128.14,0,0,1,48,80,40.2,40.2,0,0,1,82.87,40a.61.61,0,0,0,0,.12l21,47L83.2,111.86a6.13,6.13,0,0,0-.57.77,16,16,0,0,0-1,15.7c9.06,18.53,27.73,37.06,46.46,46.11a16,16,0,0,0,15.75-1.14,8.44,8.44,0,0,0,.74-.56L168.89,152l47,21.05h0s.08,0,.11,0A40.21,40.21,0,0,1,176,208Z\"/></svg>","scissors":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M40.2,95.8a28,28,0,1,1,39.6,0A28,28,0,0,1,40.2,95.8Zm0,64.4a28,28,0,1,0,39.6,0A28,28,0,0,0,40.2,160.2Z\" opacity=\"0.2\"/><path d=\"M157.73,113.13A8,8,0,0,1,159.82,102L227.48,55.7a8,8,0,0,1,9,13.21l-67.67,46.3a7.92,7.92,0,0,1-4.51,1.4A8,8,0,0,1,157.73,113.13Zm80.87,85.09a8,8,0,0,1-11.12,2.08L136,137.7,93.49,166.78a36,36,0,1,1-9-13.19L121.83,128,84.44,102.41a35.86,35.86,0,1,1,9-13.19l143,97.87A8,8,0,0,1,238.6,198.22ZM80,180a20,20,0,1,0-5.86,14.14A19.85,19.85,0,0,0,80,180ZM74.14,90.13a20,20,0,1,0-28.28,0A19.85,19.85,0,0,0,74.14,90.13Z\"/></svg>","shopping-bag":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M224,56V200a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V56a8,8,0,0,1,8-8H216A8,8,0,0,1,224,56Z\" opacity=\"0.2\"/><path d=\"M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM176,88a48,48,0,0,1-96,0,8,8,0,0,1,16,0,32,32,0,0,0,64,0,8,8,0,0,1,16,0Z\"/></svg>","star":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M229.06,108.79l-48.7,42,14.88,62.79a8.4,8.4,0,0,1-12.52,9.17L128,189.09,73.28,222.74a8.4,8.4,0,0,1-12.52-9.17l14.88-62.79-48.7-42A8.46,8.46,0,0,1,31.73,94L95.64,88.8l24.62-59.6a8.36,8.36,0,0,1,15.48,0l24.62,59.6L224.27,94A8.46,8.46,0,0,1,229.06,108.79Z\" opacity=\"0.2\"/><path d=\"M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z\"/></svg>","storefront":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M224,96v16a32,32,0,0,1-64,0V96H96v16a32,32,0,0,1-64,0V96L46.34,45.8A8,8,0,0,1,54,40H202a8,8,0,0,1,7.69,5.8Z\" opacity=\"0.2\"/><path d=\"M231.69,93.81,217.35,43.6A16.07,16.07,0,0,0,202,32H54A16.07,16.07,0,0,0,38.65,43.6L24.31,93.81A7.94,7.94,0,0,0,24,96v16a40,40,0,0,0,16,32v72a8,8,0,0,0,8,8H208a8,8,0,0,0,8-8V144a40,40,0,0,0,16-32V96A7.94,7.94,0,0,0,231.69,93.81ZM54,48H202l11.42,40H42.61Zm98,56v8a24,24,0,0,1-48,0v-8ZM51.06,132.2A24,24,0,0,1,40,112v-8H88v8a24,24,0,0,1-35.12,21.26A7.88,7.88,0,0,0,51.06,132.2ZM200,208H56V151.2a40.57,40.57,0,0,0,8,.8,40,40,0,0,0,32-16,40,40,0,0,0,64,0,40,40,0,0,0,32,16,40.57,40.57,0,0,0,8-.8Zm16-96a24,24,0,0,1-11.07,20.2,8.08,8.08,0,0,0-1.8,1.05A24,24,0,0,1,168,112v-8h48Z\"/></svg>","trophy":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M200,48v63.1c0,39.7-31.75,72.6-71.45,72.9A72,72,0,0,1,56,112V48Z\" opacity=\"0.2\"/><path d=\"M232,64H208V48a8,8,0,0,0-8-8H56a8,8,0,0,0-8,8V64H24A16,16,0,0,0,8,80V96a40,40,0,0,0,40,40h3.65A80.13,80.13,0,0,0,120,191.61V216H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16H136V191.58c31.94-3.23,58.44-25.64,68.08-55.58H208a40,40,0,0,0,40-40V80A16,16,0,0,0,232,64ZM48,120A24,24,0,0,1,24,96V80H48v32q0,4,.39,8Zm144-8.9c0,35.52-29,64.64-64,64.9a64,64,0,0,1-64-64V56H192ZM232,96a24,24,0,0,1-24,24h-.5a81.81,81.81,0,0,0,.5-8.9V80h24Z\"/></svg>"};
  'use strict';

  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = (v='') => String(v).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const main = qs('#main-content');
  if(!main)return; // The separate admin application owns its document.
  const HOME_HTML = main.innerHTML;
  const HOME_TITLE = 'Your Brand — Pet care, connected';
  const STORE_KEY = 'brand-demo-workspace-v1';

  const defaultState = {
    profile: {name:'Fur Parent', image:'/assets/fur-parent-avatar.svg', email:'', phone:'0900 000 0000'},
    messages: [
      {id:1, from:'venue', text:"Hi! Biscuit’s Full Grooming is confirmed for Sep 18 at 10:00.", time:'9:12 AM', unread:true},
      {id:2, from:'parent', text:'Thank you! See you then.', time:'9:18 AM', unread:false}
    ],
    notifications: [
      {id:1,title:'Grooming confirmed',text:'Biscuit · Full Grooming · Sep 18 at 10:00',unread:true},
      {id:2,title:'Health reminder',text:'Deworming is due Sep 28, 2026',unread:true},
      {id:3,title:'Hotel stay pending',text:'Biscuit · Sep 24–26, 2026',unread:true}
    ],
    activePet: 'Biscuit',
    pets: [
      {name:'Biscuit', breed:'Golden Retriever', age:'3 years', weight:'28 kg', image:'/assets/biscuit-avatar.png'},
      {name:'Mochi', breed:'Persian', age:'2 years', weight:'4.5 kg', image:'/assets/pet-mochi.png'},
      {name:'Bubbles', breed:'Poodle', age:'4 years', weight:'7 kg', image:'/assets/pet-bubbles.png'}
    ],
    bookings: [
      {id:1, type:'Grooming', service:'Full Grooming', date:'2026-09-18', time:'10:00', status:'Confirmed', pet:'Biscuit'},
      {id:2, type:'Hotel', service:'Pet Hotel Stay', date:'2026-09-24', endDate:'2026-09-26', time:'Check-in 14:00', status:'Pending', pet:'Biscuit'},
      {id:3, type:'Grooming', service:'Nail Trim + Ear Care', date:'2026-09-20', time:'10:00', status:'Pending', pet:'Biscuit'}
    ],
    healthByPet: {
      Biscuit: [
        {id:'vaccines', category:'Vaccinations', title:'Vaccinations', status:'Up to date', note:'Core vaccinations recorded', tone:'good', iconName:'syringe'},
        {id:'deworming', category:'Deworming', title:'Deworming', status:'Due Sep 28, 2026', note:'Next preventive care reminder', tone:'due', iconName:'worm'},
        {id:'flea', category:'Flea & Tick', title:'Flea & Tick', status:'Up to date', note:'Protection currently active', tone:'good', iconName:'bug'}
      ],
      Mochi: [
        {id:'vaccines-mochi', category:'Vaccinations', title:'Vaccinations', status:'Up to date', note:'Core vaccines recorded for Mochi', tone:'good', iconName:'syringe'},
        {id:'medication-mochi', category:'Medication', title:'Medication', status:'Daily', note:'Hairball support as directed', tone:'neutral', iconName:'pill'},
        {id:'dental-mochi', category:'Dental Care', title:'Dental Care', status:'Check due Oct 2026', note:'Routine dental check reminder', tone:'due', iconName:'tooth'}
      ],
      Bubbles: [
        {id:'vaccines-bubbles', category:'Vaccinations', title:'Vaccinations', status:'Booster due Oct 12, 2026', note:'Annual booster reminder', tone:'due', iconName:'syringe'},
        {id:'flea-bubbles', category:'Flea & Tick', title:'Flea & Tick', status:'Up to date', note:'Monthly protection active', tone:'good', iconName:'bug'},
        {id:'weight-bubbles', category:'Weight Record', title:'Weight Record', status:'7 kg', note:'Last recorded Sep 2026', tone:'neutral', iconName:'scales'}
      ]
    },
    notes: ['Loves swimming','Sensitive skin — mild shampoo only','Gets excited during car rides'],
    documents: ['Vaccination record.pdf','Grooming preferences.txt','Hotel care instructions.pdf'],
    points: 120,
    membership: {active:true, since:'Aug 2026', tier:'Club Member'},
    cart: [],
    pawTab: 'overview',
    bookingDraft: {step:1, pet:'Biscuit', service:'Full Grooming', date:'2026-09-20', time:'10:00', owner:'Fur Parent', phone:'0900 000 0000', notes:''},
    hotelDraft: {step:1, pet:'Biscuit', checkIn:'2026-09-24', checkOut:'2026-09-27', checkInTime:'14:00', checkOutTime:'12:00', feeding:'Usual meals', owner:'Fur Parent', phone:'0900 000 0000', notes:'Sensitive skin — mild shampoo only'}
  };

  // Rolling sample dates keep the demo useful whenever it is opened.
  const demoDate=days=>{const d=new Date();d.setDate(d.getDate()+days);return d.toISOString().slice(0,10)};
  defaultState.profile={name:'Alex Santos',image:'/assets/fur-parent-avatar.svg',email:'alex@example.test',phone:'09000000000'};
  defaultState.bookings.forEach((b,i)=>{b.date=demoDate(i+2);if(b.endDate)b.endDate=demoDate(i+4)});
  defaultState.bookingDraft={...defaultState.bookingDraft,date:demoDate(2),owner:'Alex Santos',phone:'09000000000'};
  defaultState.hotelDraft={...defaultState.hotelDraft,checkIn:demoDate(4),checkOut:demoDate(6),owner:'Alex Santos',phone:'09000000000'};
  defaultState.messages=[{id:1,from:'venue',text:'Biscuit’s next grooming appointment is confirmed. We look forward to seeing you!',time:'9:12 AM',unread:true}];
  defaultState.notifications=[{id:1,title:'Grooming confirmed',text:'Biscuit · Full Grooming · '+demoDate(2),unread:true}];
  if(localStorage.getItem('branddemo-guest-mode-v1')!=='1'){
    Object.assign(defaultState,{profile:{name:'Fur Parent',image:'/assets/fur-parent-avatar.svg',email:'',phone:''},messages:[],notifications:[],activePet:'',pets:[],bookings:[],healthByPet:{},notes:[],documents:[],points:0,membership:{active:false,since:'',tier:'Care Club'}});
    defaultState.bookingDraft={step:1,pet:'',service:'Full Grooming',date:'',time:'10:00',owner:'',phone:'',notes:''};
    defaultState.hotelDraft={step:1,pet:'',checkIn:'',checkOut:'',checkInTime:'14:00',checkOutTime:'12:00',feeding:'Usual meals',owner:'',phone:'',notes:''};
  }
  function cloneDefault(){ return JSON.parse(JSON.stringify(defaultState)); }
  function loadState(){
    try {
      const saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      const merged = saved ? {...cloneDefault(), ...saved, profile:{...defaultState.profile,...(saved.profile||{})}, bookingDraft:{...defaultState.bookingDraft,...(saved.bookingDraft||{})}, hotelDraft:{...defaultState.hotelDraft,...(saved.hotelDraft||{})}} : cloneDefault();
      // v22 migration: older builds stored one global health array. Preserve it for Biscuit,
      // while every pet now owns an independent health-record collection.
      if(!merged.healthByPet || typeof merged.healthByPet!=='object') merged.healthByPet=cloneDefault().healthByPet;
      if(saved?.health && Array.isArray(saved.health) && !saved.healthByPet){
        const migrationIcons={'Vaccinations':'syringe','Deworming':'worm','Flea & Tick':'bug','Allergy':'warning-circle','Medication':'pill','Surgery':'bandaids','Condition':'heartbeat','Vet Visit':'stethoscope','Weight Record':'scales','Dental Care':'tooth','Lab / Test Result':'test-tube','Other':'heart'}; merged.healthByPet.Biscuit=saved.health.map(h=>({...h,category:h.category||h.title,iconName:h.iconName||migrationIcons[h.title]||'heart'}));
      }
      for(const p of merged.pets||[]){
        if(!Array.isArray(merged.healthByPet[p.name])) merged.healthByPet[p.name]=[];
      }
      delete merged.health;
      return merged;
    } catch (_) { return cloneDefault(); }
  }
  let state = loadState();
  window.DemoWorkspace={get:()=>JSON.parse(JSON.stringify(state)),set:value=>{state=JSON.parse(JSON.stringify(value));save()},refresh:()=>render(location.pathname,false)};
  try { if(!localStorage.getItem(STORE_KEY))localStorage.setItem(STORE_KEY,JSON.stringify(state)); } catch {}
  function save(){ try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch(_){} syncRail(); window.dispatchEvent(new CustomEvent("demo:workspace-saved")); }
  function pet(){ return state.pets.find(p=>p.name===state.activePet) || state.pets[0]; }
  function fmtDate(v){ if(!v) return ''; const d=new Date(v+'T00:00:00'); return d.toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'}); }
  function money(v){ return '₱'+Number(v).toLocaleString('en-PH'); }

  const routeTitles = {
    '/':'Pawfile','/pets':'My Pets','/hotel':'Hotel Stays','/grooming':'Grooming','/health':'Health & Care','/rewards':'Rewards & Club','/shop':'Shop','/messages':'Messages','/notifications':'Notifications','/about':'About','/profile':'Edit Profile'
  };
  const legacyRoutes = {'/pawfile':'/','/booking':'/grooming','/club':'/rewards'};

  function normalizePath(path){
    path=(path||'/').split('?')[0].split('#')[0];
    if(path.length>1 && path.endsWith('/')) path=path.slice(0,-1);
    return routeTitles[path] ? path : (legacyRoutes[path] || '/');
  }

  function setActive(path){
    qsa('.rail__link').forEach(a=>{
      const ap=normalizePath(new URL(a.href, location.origin).pathname);
      const active=ap===path; a.classList.toggle('active',active);
      if(active) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current');
    });
  }

  function syncRail(){
    const profile=state.profile||defaultState.profile;
    const img=qs('.rail__avatar img');
    if(img){ img.src=profile.image||defaultState.profile.image; img.alt=`${profile.name||'Fur Parent'} profile photo`; }
    const name=qs('[data-owner-name]'); if(name) name.textContent=profile.name||'Fur Parent';
    const meta=qs('[data-owner-meta]');
    if(meta) meta.textContent=state.membership.active?`${state.membership.tier||'Club Member'} · Since ${state.membership.since}`:'Fur Parent';
    const cart=qs('[data-cart-count]');
    if(cart){ const n=state.cart.length; cart.textContent=n>99?'99+':String(n); cart.hidden=n===0; }
    const msgBadge=qs('[data-message-count]');
    if(msgBadge){ const n=(state.messages||[]).filter(m=>m.from==='venue'&&m.unread).length; msgBadge.textContent=n>99?'99+':String(n); msgBadge.hidden=n===0; }
    const notifBadge=qs('[data-notification-count]');
    if(notifBadge){ const n=(state.notifications||[]).filter(n=>n.unread).length; notifBadge.textContent=n>99?'99+':String(n); notifBadge.hidden=n===0; }
  }

  Object.assign(PHOSPHOR_ICONS,{"syringe":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M196,116l-89.66,89.66a8,8,0,0,1-5.65,2.34H48V155.31a8,8,0,0,1,2.34-5.65L140,60Z\" opacity=\"0.2\"/><path d=\"M237.66,66.34l-48-48a8,8,0,0,0-11.32,11.32L196.69,48,168,76.69,133.66,42.34a8,8,0,0,0-11.32,11.32L128.69,60l-84,84A15.86,15.86,0,0,0,40,155.31v49.38L18.34,226.34a8,8,0,0,0,11.32,11.32L51.31,216h49.38A15.86,15.86,0,0,0,112,211.31l84-84,6.34,6.35a8,8,0,0,0,11.32-11.32L179.31,88,208,59.31l18.34,18.35a8,8,0,0,0,11.32-11.32ZM100.69,200H56V155.31l18-18,20.34,20.35a8,8,0,0,0,11.32-11.32L85.31,126,98,113.31l20.34,20.35a8,8,0,0,0,11.32-11.32L109.31,102,140,71.31,184.69,116Z\"/></svg>","bug":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M208,128v16a80,80,0,0,1-160,0V128Z\" opacity=\"0.2\"/><path d=\"M144,92a12,12,0,1,1,12,12A12,12,0,0,1,144,92ZM100,80a12,12,0,1,0,12,12A12,12,0,0,0,100,80Zm116,64A87.76,87.76,0,0,1,213,167l22.24,9.72A8,8,0,0,1,232,192a7.89,7.89,0,0,1-3.2-.67L207.38,182a88,88,0,0,1-158.76,0L27.2,191.33A7.89,7.89,0,0,1,24,192a8,8,0,0,1-3.2-15.33L43,167A87.76,87.76,0,0,1,40,144v-8H16a8,8,0,0,1,0-16H40v-8a87.76,87.76,0,0,1,3-23L20.8,79.33a8,8,0,1,1,6.4-14.66L48.62,74a88,88,0,0,1,158.76,0l21.42-9.36a8,8,0,0,1,6.4,14.66L213,89.05a87.76,87.76,0,0,1,3,23v8h24a8,8,0,0,1,0,16H216ZM56,120H200v-8a72,72,0,0,0-144,0Zm64,95.54V136H56v8A72.08,72.08,0,0,0,120,215.54ZM200,144v-8H136v79.54A72.08,72.08,0,0,0,200,144Z\"/></svg>","worm":"<svg class=\"ph-duo ph-duo--dynamic ph-duo--custom\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\"><path d=\"M42 174c0-38 31-69 69-69h29c22 0 40-18 40-40 0-14 11-25 25-25s25 11 25 25c0 50-40 90-90 90h-29c-11 0-19 9-19 19s8 19 19 19h18c10 0 18 8 18 18s-8 18-18 18h-18c-38 0-69-31-69-69Z\" fill=\"currentColor\" opacity=\"0.2\"/><path d=\"M42 174c0-38 31-69 69-69h29c22 0 40-18 40-40 0-14 11-25 25-25s25 11 25 25c0 50-40 90-90 90h-29c-11 0-19 9-19 19s8 19 19 19h18c10 0 18 8 18 18s-8 18-18 18h-18c-38 0-69-31-69-69Zm163-116a7 7 0 1 0 0 14 7 7 0 0 0 0-14Z\" fill=\"currentColor\"/></svg>"});

  Object.assign(PHOSPHOR_ICONS,{
    "bell":"<svg aria-hidden=\"true\" class=\"ph-duo ph-duo--dynamic\" fill=\"currentColor\" focusable=\"false\"  viewBox=\"0 0 256 256\"  xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M208,192H48a8,8,0,0,1-6.88-12C47.71,168.6,56,139.81,56,104a72,72,0,0,1,144,0c0,35.82,8.3,64.6,14.9,76A8,8,0,0,1,208,192Z\" opacity=\"0.2\"/><path d=\"M221.8,175.94C216.25,166.38,208,139.33,208,104a80,80,0,1,0-160,0c0,35.34-8.26,62.38-13.81,71.94A16,16,0,0,0,48,200H88.81a40,40,0,0,0,78.38,0H208a16,16,0,0,0,13.8-24.06ZM128,216a24,24,0,0,1-22.62-16h45.24A24,24,0,0,1,128,216ZM48,184c7.7-13.24,16-43.92,16-80a64,64,0,1,1,128,0c0,36.05,8.28,66.73,16,80Z\"/></svg>"
  });


  Object.assign(PHOSPHOR_ICONS,{
    "grooming-comb":"<svg aria-hidden=\"true\" class=\"ph-duo ph-duo--dynamic\" fill=\"currentColor\" focusable=\"false\" viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M40 48h176v60H40z\" opacity=\".2\"/><path d=\"M216 40H40a16 16 0 0 0-16 16v48a16 16 0 0 0 16 16h16v88a8 8 0 0 0 16 0v-88h20v64a8 8 0 0 0 16 0v-64h20v88a8 8 0 0 0 16 0v-88h20v64a8 8 0 0 0 16 0v-64h20v88a8 8 0 0 0 16 0v-88h20a16 16 0 0 0 16-16V56a16 16 0 0 0-16-16Zm0 64H40V56h176Z\"/></svg>",
    "dog-house":"<svg aria-hidden=\"true\" class=\"ph-duo ph-duo--dynamic\" fill=\"currentColor\" focusable=\"false\" viewBox=\"0 0 256 256\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"m32 120 96-72 96 72v88h-56v-52a40 40 0 0 0-80 0v52H32Z\" opacity=\".2\"/><path d=\"M240.8 113.6 132.8 32.5a8 8 0 0 0-9.6 0l-108 81.1a8 8 0 1 0 9.6 12.8L32 121v87a16 16 0 0 0 16 16h160a16 16 0 0 0 16-16v-87l7.2 5.4a8 8 0 1 0 9.6-12.8ZM152 208h-48v-52a24 24 0 0 1 48 0Zm56 0h-40v-52a40 40 0 0 0-80 0v52H48v-99l80-60 80 60Z\"/></svg>",
    "chat-bubble":"<svg aria-hidden=\"true\" class=\"ph-duo ph-duo--dynamic\" fill=\"currentColor\" focusable=\"false\" viewBox=\"0 0 256 256\" width=\"20\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M224 48H32a16 16 0 0 0-16 16v128a16 16 0 0 0 16 16h44l43 34a14 14 0 0 0 18 0l43-34h44a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16Z\" opacity=\".2\"/><path d=\"M224 40H32A24 24 0 0 0 8 64v128a24 24 0 0 0 24 24h41.2l40.8 32.4a22 22 0 0 0 28 0l40.8-32.4H224a24 24 0 0 0 24-24V64a24 24 0 0 0-24-24Zm8 152a8 8 0 0 1-8 8h-44a8 8 0 0 0-5 1.8L132 236a6 6 0 0 1-8 0l-43-34.2a8 8 0 0 0-5-1.8H32a8 8 0 0 1-8-8V64a8 8 0 0 1 8-8h192a8 8 0 0 1 8 8Zm-136-64a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm44 0a12 12 0 1 1-12-12 12 12 0 0 1 12 12Zm44 0a12 12 0 1 1-12-12 12 12 0 0 1 12 12Z\"/></svg>"
  });



  Object.assign(PHOSPHOR_ICONS,{
    "warning-circle":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z\" opacity=\"0.2\"/><path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z\"/></svg>",
    "pill":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M160,160l-50.75,50.75a45.26,45.26,0,0,1-64,0h0a45.26,45.26,0,0,1,0-64L96,96Z\" opacity=\"0.2\"/><path d=\"M216.43,39.6a53.27,53.27,0,0,0-75.33,0L39.6,141.09a53.26,53.26,0,0,0,75.32,75.31L216.43,114.91A53.32,53.32,0,0,0,216.43,39.6ZM103.61,205.09h0a37.26,37.26,0,0,1-52.7-52.69L96,107.31,148.7,160ZM205.11,103.6,160,148.69,107.32,96l45.1-45.09a37.26,37.26,0,0,1,52.69,52.69ZM189.68,82.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,1,1-11.31-11.32l24-24A8,8,0,0,1,189.68,82.34Z\"/></svg>",
    "bandaids":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M206.63,94.63,173.25,128,128,82.75l33.37-33.38a32,32,0,0,1,45.26,45.26ZM49.37,161.37a32,32,0,0,0,45.26,45.26L128,173.25,82.75,128ZM82.75,128,128,82.75,94.63,49.37A32,32,0,0,0,49.37,94.63Zm90.5,0L128,173.25l33.37,33.38a32,32,0,0,0,45.26-45.26Z\" opacity=\"0.2\"/><path d=\"M184.57,128l27.71-27.72a40,40,0,1,0-56.56-56.56L128,71.43,100.28,43.72a40,40,0,1,0-56.56,56.56L71.43,128,43.72,155.72a40,40,0,1,0,56.56,56.56L128,184.57l27.72,27.71a40,40,0,1,0,56.56-56.56ZM167,55A24,24,0,1,1,201,89l-27.72,27.72L139.31,82.75Zm-5.09,73L128,161.94,94.06,128,128,94.06ZM55,89h0A24,24,0,1,1,89,55l27.72,27.72L82.75,116.69ZM89,201A24,24,0,1,1,55,167l27.72-27.72,33.94,33.94Zm112,0A24,24,0,0,1,167,201l-27.72-27.72,33.94-33.94L201,167A24,24,0,0,1,201,201Zm-85-73a12,12,0,1,1,12,12A12,12,0,0,1,116,128Z\"/></svg>",
    "stethoscope":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M240,160a32,32,0,1,1-32-32A32,32,0,0,1,240,160Z\" opacity=\"0.2\"/><path d=\"M220,160a12,12,0,1,1-12-12A12,12,0,0,1,220,160Zm-4.55,39.29A48.08,48.08,0,0,1,168,240H144a48.05,48.05,0,0,1-48-48V151.49A64,64,0,0,1,40,88V40a8,8,0,0,1,8-8H72a8,8,0,0,1,0,16H56V88a48,48,0,0,0,48.64,48c26.11-.34,47.36-22.25,47.36-48.83V48H136a8,8,0,0,1,0-16h24a8,8,0,0,1,8,8V87.17c0,32.84-24.53,60.29-56,64.31V192a32,32,0,0,0,32,32h24a32.06,32.06,0,0,0,31.22-25,40,40,0,1,1,16.23.27ZM232,160a24,24,0,1,0-24,24A24,24,0,0,0,232,160Z\"/></svg>",
    "scales":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M56,88l32,80c0,17.67-20,24-32,24s-32-6.33-32-24ZM200,56l-32,80c0,17.67,20,24,32,24s32-6.33,32-24Z\" opacity=\"0.2\"/><path d=\"M239.43,133l-32-80h0a8,8,0,0,0-9.16-4.84L136,62V40a8,8,0,0,0-16,0V65.58L54.26,80.19A8,8,0,0,0,48.57,85h0v.06L16.57,165a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32a7.92,7.92,0,0,0-.57-3L66.92,93.77,120,82V208H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16H136V78.42L187,67.1,160.57,133a7.92,7.92,0,0,0-.57,3c0,23.31,24.54,32,40,32s40-8.69,40-32A7.92,7.92,0,0,0,239.43,133ZM56,184c-7.53,0-22.76-3.61-23.93-14.64L56,109.54l23.93,59.82C78.76,180.39,63.53,184,56,184Zm144-32c-7.53,0-22.76-3.61-23.93-14.64L200,77.54l23.93,59.82C222.76,148.39,207.53,152,200,152Z\"/></svg>",
    "tooth":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M216,79.76c.07,71.42-23.48,128.23-44,142.78a8,8,0,0,1-12.52-6C158,196.31,152,160,128,160s-30,36.31-31.51,56.53a8,8,0,0,1-12.52,6C63.48,208,39.93,151.18,40,79.76A47.94,47.94,0,0,1,88,32h80A47.94,47.94,0,0,1,216,79.76Z\" opacity=\"0.2\"/><path d=\"M171,71.42,149.54,80,171,88.57A8,8,0,1,1,165,103.42L128,88.61,91,103.42A8,8,0,1,1,85,88.57L106.46,80,85,71.42A8,8,0,1,1,91,56.57l37,14.81,37-14.81A8,8,0,1,1,171,71.42Zm53,8.33c0,42.72-8,75.4-14.7,95.28-8.72,25.8-20.62,45.49-32.64,54a15.69,15.69,0,0,1-15.95,1.41,16.09,16.09,0,0,1-9.18-13.36C150.68,205.58,146.48,168,128,168s-22.68,37.59-23.53,49.11a16.09,16.09,0,0,1-16,14.9,15.67,15.67,0,0,1-9.13-2.95c-12-8.53-23.92-28.22-32.64-54C40,155.15,32,122.47,32,79.75A56,56,0,0,1,88,24h80A56,56,0,0,1,224,79.75Zm-16,0A40,40,0,0,0,168,40H88A40,40,0,0,0,48,79.76c0,40.55,7.51,71.4,13.85,90.14,11.05,32.66,23,43.37,26.61,46C91.57,174.67,105.59,152,128,152s36.45,22.71,39.49,63.94h0c3.6-2.59,15.57-13.26,26.66-46C200.49,151.16,208,120.31,208,79.76Z\"/></svg>",
    "test-tube":"<svg class=\"ph-duo ph-duo--dynamic\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 256 256\" fill=\"currentColor\"><path d=\"M167.18,140.82,94.77,213.23a36.77,36.77,0,0,1-52,0h0a36.77,36.77,0,0,1,0-52l30-30c9.37-3.65,25.78-6.36,47.18,4.82S157.81,144.47,167.18,140.82Z\" opacity=\"0.2\"/><path d=\"M237.66,86.34l-60-60a8,8,0,0,0-11.32,0L37.11,155.57a44.77,44.77,0,0,0,63.32,63.32L212.32,107l22.21-7.4a8,8,0,0,0,3.13-13.25ZM89.11,207.57a28.77,28.77,0,0,1-40.68-40.68l28.8-28.8c8.47-2.9,21.75-4,39.07,5,10.6,5.54,20.18,8,28.56,8.73ZM205.47,92.41a8,8,0,0,0-3.13,1.93l-39.57,39.57c-8.47,2.9-21.75,4-39.07-5-10.6-5.54-20.18-8-28.56-8.73L172,43.31,217.19,88.5Z\"/></svg>"
  });

  const HEALTH_ICON_MAP={
    'Vaccinations':'syringe','Deworming':'worm','Flea & Tick':'bug','Allergy':'warning-circle',
    'Medication':'pill','Surgery':'bandaids','Condition':'heartbeat','Vet Visit':'stethoscope',
    'Weight Record':'scales','Dental Care':'tooth','Lab / Test Result':'test-tube','Other':'heart'
  };
  const healthIconForCategory = category => HEALTH_ICON_MAP[category] || 'heart';
  const healthIconName = h => h.iconName || healthIconForCategory(h.category||h.title);
  const healthRecords = (petName=state.activePet) => {
    state.healthByPet ||= {}; state.healthByPet[petName] ||= []; return state.healthByPet[petName];
  };

  const icon = name => `<div class="clone-icon clone-icon--phosphor">${PHOSPHOR_ICONS[name]||PHOSPHOR_ICONS['paw-print']}</div>`;
  const tag = text => `<span class="clone-tag">${esc(text)}</span>`;
  function pageShell(kicker, heading, lede, body, action=''){
    return `<section class="clone-page" aria-labelledby="clone-title"><div class="clone-wrap">
      <header class="clone-head"><div><span class="clone-kicker">● ${esc(kicker)}</span><h1 class="clone-title" id="clone-title">${esc(heading)}</h1><p class="clone-lede">${esc(lede)}</p></div>${action?`<div class="clone-actions">${action}</div>`:''}</header>
      ${body}
    </div></section>`;
  }
  const status = (txt,tone='good') => `<span class="pet-status pet-status--${tone}">${esc(txt)}</span>`;

  function bookingPage(){
    const d=state.bookingDraft; const step=d.step||1;
    const services=['Full Grooming','Bath & Blow Dry','Nail Trim + Ear Care','Basic Grooming'];
    const petChoices=state.pets.map(p=>`<button class="pet-choice ${d.pet===p.name?'is-selected':''}" data-draft-pet="${esc(p.name)}"><img src="${p.image}" alt=""><span><strong>${esc(p.name)}</strong><small>${esc(p.breed)}</small></span></button>`).join('');
    const stepLabels=['Pet','Service','Schedule','Details','Review'];
    let content='';
    if(step===1) content=`<div class="pet-choice-grid">${petChoices}</div>`;
    if(step===2) content=`<div class="pet-option-grid">${services.map((service)=>`<button class="pet-option ${d.service===service?'is-selected':''}" data-draft-service="${esc(service)}">${icon('scissors')}<span><strong>${esc(service)}</strong><small>Professional grooming booked through YourBrand</small></span></button>`).join('')}</div>`;
    if(step===3) content=`<div class="pet-form-grid"><label>Date<input class="pet-input" type="date" data-draft="date" value="${esc(d.date)}"></label><label>Time<select class="pet-input" data-draft="time"><option ${d.time==='09:00'?'selected':''}>09:00</option><option ${d.time==='10:00'?'selected':''}>10:00</option><option ${d.time==='13:00'?'selected':''}>13:00</option><option ${d.time==='15:00'?'selected':''}>15:00</option></select></label></div>`;
    if(step===4) content=`<div class="pet-form-grid"><label>Fur Parent<input class="pet-input" data-draft="owner" value="${esc(d.owner)}"></label><label>Mobile number<input class="pet-input" data-draft="phone" value="${esc(d.phone)}"></label><label class="pet-field-full">Grooming notes<textarea class="pet-input pet-textarea" data-draft="notes" placeholder="Skin sensitivity, preferred cut, coat notes…">${esc(d.notes)}</textarea></label></div>`;
    if(step===5) content=`<div class="pet-review"><div><small>Pet</small><strong>${esc(d.pet)}</strong></div><div><small>Grooming</small><strong>${esc(d.service)}</strong></div><div><small>Schedule</small><strong>${fmtDate(d.date)} · ${esc(d.time)}</strong></div><div><small>Fur Parent</small><strong>${esc(d.owner)}</strong></div></div><div class="clone-note">Submitting adds this grooming request to the local demo workspace. No real appointment is sent to the shop.</div>`;
    const controls=`<div class="pet-book-controls">${step>1?'<button class="clone-btn clone-btn--ghost" data-book-prev>← Back</button>':'<span></span>'}<button class="clone-btn" ${step===5?'data-book-submit':'data-book-next'}>${step===5?'Request grooming':'Continue →'}</button></div>`;
    const body=`<div class="clone-glass"><div class="pet-stepper">${stepLabels.map((label,i)=>`<span class="${step===i+1?'is-active':step>i+1?'is-done':''}">${i+1}<b>${label}</b></span>`).join('')}</div><article class="clone-card clone-card--full pet-book-card"><div class="clone-card__no">Step ${step} of 5</div><h2>${['Who are we grooming?','Choose a grooming service','Pick a schedule','Add contact & grooming notes','Review the request'][step-1]}</h2>${content}${controls}</article></div>`;
    const upcoming=state.bookings.filter(b=>b.type==='Grooming').map(b=>`<article class="clone-card"><div class="clone-row">${icon(bookingIconName(b))}<div class="clone-row__body"><div class="clone-card__no">Grooming</div><h3>${esc(b.service)}</h3><p>${esc(b.pet)} · ${fmtDate(b.date)} · ${esc(b.time)}</p><div class="clone-tags">${status(b.status,b.status==='Confirmed'?'good':'due')}</div></div></div></article>`).join('');
    return pageShell('Grooming appointments','Grooming.','Choose a pet, grooming service and schedule without leaving YourBrand.',body+`<h2 class="clone-section-title">Upcoming grooming</h2><div class="clone-grid">${upcoming || emptyCard('No grooming appointments yet','Choose a service to make a request.')}</div>`,`<a class="clone-btn clone-btn--ghost" href="tel:+639000000000">Call the shop</a>`);
  }


  function bookingIconName(b){
    if(b.type==='Hotel') return 'dog-house';
    if(/nail/i.test(b.service||'')) return 'scissors';
    if(/full grooming|bath|basic grooming/i.test(b.service||'')) return 'grooming-comb';
    return 'scissors';
  }
  function bookingActionCard(){ return `<article class="clone-card pet-action-card pet-action-card--booking"><div class="pet-action-card__copy"><div>${icon('calendar-check')}</div><div class="clone-card__no">New appointment</div><h3>Book care</h3><p>Choose the right booking flow for ${esc(pet().name)}.</p></div><div class="pet-action-buttons pet-action-buttons--primary"><a class="clone-btn" href="/grooming" data-spa>Book grooming ↗</a><a class="clone-btn clone-btn--hotel" href="/hotel" data-spa>Book hotel stay ↗</a></div></article>`; }
  const healthDetailTypes=['Allergy','Medication','Surgery','Condition','Vet Visit','Weight Record','Dental Care','Lab / Test Result','Other'];
  function addHealthCard(){
    const options=healthDetailTypes.map(type=>`<button type="button" class="pet-health-option" aria-label="Add ${esc(type)}" data-add-health-type="${esc(type)}">${icon(healthIconForCategory(type))}<span><strong>${esc(type)}</strong><small>${type==='Other'?'Custom health record title':'Fixed health record type'}</small></span></button>`).join('');
    return `<article class="clone-card pet-health-add"><div>${icon('heart')}</div><div class="clone-card__no">Add health detail</div><h3>Choose a record type</h3><p>Each fixed category has its own icon. Only Other lets you customize the title.</p><details class="pet-health-picker"><summary>Choose health detail <span>⌄</span></summary><div class="pet-health-menu">${options}</div></details></article>`;
  }
  function aboutPage(){
    const brand=`<div class="branddemo-about-brand"><img src="/assets/branddemo-brandmark.svg" alt="" aria-hidden="true"><div><div class="branddemo-wordmark branddemo-wordmark--about" aria-label="YourBrand">branddemo<span class="branddemo-wordmark__dot">.</span></div><div class="branddemo-byline branddemo-byline--about">by Brick &amp; Bond</div></div></div>`;
    const body=`<div class="clone-glass"><div class="clone-grid"><article class="clone-card clone-card--full pet-about-hero pet-about-hero--branddemo">${brand}<div><div class="clone-card__no">A Brick &amp; Bond project</div><h2>Everyday pet care, stacked in one place.</h2><p>YourBrand connects cat and dog profiles, health records, grooming, hotel stays, rewards, shopping, documents and care history in one playful, organized workspace.</p><div class="clone-tags">${tag('Cats + Dogs')}${tag('Health Records')}${tag('Bookings')}${tag('Rewards')}${tag('Care History')}</div></div></article><article class="clone-card"><div class="clone-card__no">Why YourBrand</div><h3>Care should follow the pet.</h3><p>Preferences, health details, bookings and history stay attached to each individual pet so every interaction starts with context.</p></article><article class="clone-card"><div class="clone-card__no">Built by Brick &amp; Bond</div><h3>Playful on the surface. Structured underneath.</h3><p>YourBrand is a Brick &amp; Bond product concept designed to make pet care easier to organize without turning it into another cold dashboard.</p></article></div></div>`;
    return pageShell('About YourBrand','YourBrand.','One connected care space for cats, dogs and the people who look after them.',body);
  }
  function profilePage(){
    const p=state.profile||defaultState.profile;
    const body=`<div class="clone-glass"><article class="clone-card clone-card--full pet-profile-editor"><div class="pet-profile-editor__avatar"><img src="${esc(p.image||defaultState.profile.image)}" alt=""><label class="clone-btn clone-btn--ghost">Change photo<input type="file" accept="image/*" data-profile-image hidden></label></div><form data-profile-form class="pet-form-grid"><label>Display name<input class="pet-input" name="name" value="${esc(p.name||'Fur Parent')}" required></label><label>Mobile number<input class="pet-input" name="phone" value="${esc(p.phone||'')}" inputmode="tel"></label><label class="pet-field-full">Email<input class="pet-input" name="email" type="email" value="${esc(p.email||'')}"></label><div class="pet-field-full"><div class="clone-note">Your profile photo and details are stored only in this demo workspace on this device.</div><button class="clone-btn" type="submit">Save profile</button></div></form></article></div>`;
    return pageShell('Fur Parent account','Edit profile.','Update the profile details used across bookings and Pawfile.',body);
  }

  function pawfilePage(){
    const p=pet(); const tab=state.pawTab||'overview';
    const tabs=['overview','health','appointments','photos','documents','notes'];
    let panel='';
    if(tab==='overview') panel=`<div class="clone-grid"><article class="clone-card clone-card--full pet-profile-card"><img class="pet-profile-photo" src="${p.image}" alt="${esc(p.name)}"><div><div class="clone-card__no">Active Pet</div><h2>${esc(p.name)}</h2><p>${esc(p.breed)} · ${esc(p.age)} · ${esc(p.weight)}</p><div class="clone-tags">${tag('Care history')}${tag('Style notes')}${tag('Vaccination')}${tag('Owner notes')}</div></div></article>${metricCard('Last groom','Saved','Care history stays with the pet profile.')}${metricCard('Usual style','Remembered','Preferences are ready for the next visit.')}${metricCard('Next visit',nextBookingFor(p.name),'Upcoming care is organized in one place.')}${metricCard('Paw Points',state.points,'Rewards follow the Fur Parent account.')}</div>`;
    if(tab==='health') panel=`<div class="clone-grid">${healthRecords(p.name).map(h=>healthCard(h)).join('')}${addHealthCard()}</div>`;
    if(tab==='appointments') panel=`<div class="clone-grid">${state.bookings.filter(b=>b.pet===p.name).map(b=>bookingCard(b,true)).join('')}${bookingActionCard()}</div>`;
    if(tab==='photos') panel=`<div class="clone-grid"><article class="clone-card clone-card--third">${icon('camera')}<img class="pet-gallery-image" src="${p.image}" alt="${esc(p.name)}"><h3>${esc(p.name)}, all smiles</h3></article><article class="clone-card clone-card--third">${icon('camera')}<img class="pet-gallery-image" src="/assets/hero-club.png" alt="Pet club"><h3>Care day</h3></article><article class="clone-card clone-card--third pet-add-card"><button class="pet-add" data-add-photo>＋</button><h3>Add photo</h3><p>Stored locally for this demo.</p></article></div>`;
    if(tab==='documents') panel=`<div class="clone-grid">${state.documents.map((d,i)=>`<article class="clone-card clone-card--third">${icon('files')}<h3>${esc(d)}</h3><p>${i===0?'Health record':i===1?'Care preference':'Stay instructions'}</p></article>`).join('')}<article class="clone-card clone-card--third pet-add-card"><button class="pet-add" data-add-document>＋</button><h3>Add document</h3></article></div>`;
    if(tab==='notes') panel=`<div class="clone-grid">${state.notes.map((n,i)=>`<article class="clone-card clone-card--third">${icon('note-pencil')}<h3>Care note ${i+1}</h3><p>${esc(n)}</p></article>`).join('')}<article class="clone-card clone-card--third"><label>New care note<textarea class="pet-input pet-textarea" id="new-note" placeholder="Anything the team should remember?"></textarea></label><button class="clone-btn" data-add-note>Save note</button></article></div>`;
    const switcher=`<div class="pet-switch-row">${state.pets.map(x=>`<button data-switch-pet="${esc(x.name)}" class="${x.name===p.name?'is-active':''}"><img src="${x.image}" alt=""><span>${esc(x.name)}</span></button>`).join('')}<button type="button" class="wag-addpet-main" data-add-pet-main><span aria-hidden="true">+</span><span>Add pet</span></button></div>`;
    const tabbar=`<div class="pet-tabs">${tabs.map(t=>`<button class="${tab===t?'is-active':''}" data-paw-tab="${t}">${t[0].toUpperCase()+t.slice(1)}</button>`).join('')}</div>`;
    return pageShell('My Pets',`${p.name}’s profile.`,`Pet details, care history, health records, photos, documents and notes — all connected back to Pawfile.`,`<div class="clone-glass">${switcher}${tabbar}${panel}</div>`,`<a class="clone-btn" href="/grooming" data-spa>Book grooming ↗</a>`);
  }

  function metricCard(label,value,text){ return `<article class="clone-card clone-card--third"><div class="clone-card__no">${esc(label)}</div><div class="clone-metric pet-metric">${esc(value)}</div><p>${esc(text)}</p></article>`; }
  function nextBookingFor(name){ const b=state.bookings.find(x=>x.pet===name); return b?fmtDate(b.date):'None'; }
  function bookingCard(b,editable=false){ return `<article class="clone-card pet-booking-record">${editable?`<div class="pet-card-actions"><button class="pet-card-action pet-card-action--edit" type="button" data-booking-edit="${esc(b.id)}">Edit</button><button class="pet-card-action pet-card-action--delete" type="button" data-booking-delete="${esc(b.id)}">Delete</button></div>`:''}<div class="clone-row">${icon(bookingIconName(b))}<div><div class="clone-card__no">${esc(b.type)}</div><h3>${esc(b.service)}</h3><p>${fmtDate(b.date)}${b.endDate?' – '+fmtDate(b.endDate):''} · ${esc(b.time)}</p><div class="clone-tags">${status(b.status,b.status==='Confirmed'?'good':'due')}</div></div></div></article>`; }
  function healthCard(h){ return `<article class="clone-card pet-health-card"><div class="pet-card-actions"><button class="pet-card-action pet-card-action--edit" type="button" data-health-edit="${esc(h.id)}" aria-label="Edit ${esc(h.title)}">Edit</button><button class="pet-card-action pet-card-action--delete" type="button" data-health-delete="${esc(h.id)}" aria-label="Delete ${esc(h.title)}">Delete</button></div><div class="clone-row">${icon(healthIconName(h))}<div><div class="clone-card__no">Health & Care</div><h3>${esc(h.title)}</h3><p>${esc(h.note)}</p><div class="clone-tags">${status(h.status,h.tone)}</div>${String(h.category||h.title)==='Deworming'&&h.tone==='due'?`<button class="pet-link-btn" data-health-done="${esc(h.id)}">Mark completed →</button>`:''}</div></div></article>`; }
  function emptyCard(title,text){ return `<article class="clone-card clone-card--full"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`; }

  function healthPage(){
    const active=pet(); const body=`<div class="clone-glass"><div class="clone-grid">${healthRecords(active.name).map(healthCard).join('')}${addHealthCard()}<article class="clone-card clone-card--full"><div class="clone-card__no">Care notes</div><h2>Things the team should remember</h2><div class="clone-tags">${state.notes.map(tag).join('')}</div></article></div></div>`;
    return pageShell('Health records',`${active.name}’s Health & Care.`,`Health records are stored separately for ${active.name}.`,body,`<a class="clone-btn" href="/pets" data-spa>Open My Pets ↗</a>`);
  }

  function hotelNights(d){
    if(!d.checkIn||!d.checkOut) return 0;
    const a=new Date(d.checkIn+'T00:00:00'), b=new Date(d.checkOut+'T00:00:00');
    return Math.max(0,Math.round((b-a)/86400000));
  }

  function hotelPage(){
    const d=state.hotelDraft; const step=d.step||1; const nights=hotelNights(d);
    const hotelBookings=state.bookings.filter(b=>b.type==='Hotel');
    const petChoices=state.pets.map(p=>`<button class="pet-choice ${d.pet===p.name?'is-selected':''}" data-hotel-pet="${esc(p.name)}"><img src="${p.image}" alt=""><span><strong>${esc(p.name)}</strong><small>${esc(p.breed)}</small></span></button>`).join('');
    const steps=['Pet','Stay dates','Care details','Contact','Review'];
    let content='';
    if(step===1) content=`<div class="pet-choice-grid">${petChoices}</div>`;
    if(step===2) content=`<div class="pet-form-grid"><label>Check-in date<input class="pet-input" type="date" data-hotel-draft="checkIn" value="${esc(d.checkIn)}"></label><label>Check-out date<input class="pet-input" type="date" data-hotel-draft="checkOut" min="${esc(d.checkIn)}" value="${esc(d.checkOut)}"></label><label>Check-in time<select class="pet-input" data-hotel-draft="checkInTime"><option ${d.checkInTime==='10:00'?'selected':''}>10:00</option><option ${d.checkInTime==='14:00'?'selected':''}>14:00</option><option ${d.checkInTime==='17:00'?'selected':''}>17:00</option></select></label><label>Pick-up time<select class="pet-input" data-hotel-draft="checkOutTime"><option ${d.checkOutTime==='09:00'?'selected':''}>09:00</option><option ${d.checkOutTime==='12:00'?'selected':''}>12:00</option><option ${d.checkOutTime==='15:00'?'selected':''}>15:00</option></select></label></div><div class="clone-note">${nights>0?`${nights} night${nights===1?'':'s'} · ${fmtDate(d.checkIn)} to ${fmtDate(d.checkOut)}`:'Check-out must be after check-in.'}</div>`;
    if(step===3) content=`<div class="pet-form-grid"><label class="pet-field-full">Feeding routine<input class="pet-input" data-hotel-draft="feeding" value="${esc(d.feeding)}" placeholder="Meal schedule, portions, food restrictions…"></label><label class="pet-field-full">Hotel care notes<textarea class="pet-input pet-textarea" data-hotel-draft="notes" placeholder="Medication, sleep routine, behavior, comfort items…">${esc(d.notes)}</textarea></label></div>`;
    if(step===4) content=`<div class="pet-form-grid"><label>Fur Parent<input class="pet-input" data-hotel-draft="owner" value="${esc(d.owner)}"></label><label>Mobile number<input class="pet-input" data-hotel-draft="phone" value="${esc(d.phone)}"></label></div>`;
    if(step===5) content=`<div class="pet-review"><div><small>Pet</small><strong>${esc(d.pet)}</strong></div><div><small>Stay</small><strong>${nights} night${nights===1?'':'s'}</strong></div><div><small>Check-in</small><strong>${fmtDate(d.checkIn)} · ${esc(d.checkInTime)}</strong></div><div><small>Check-out</small><strong>${fmtDate(d.checkOut)} · ${esc(d.checkOutTime)}</strong></div><div><small>Feeding</small><strong>${esc(d.feeding)}</strong></div><div><small>Fur Parent</small><strong>${esc(d.owner)}</strong></div></div><div class="clone-note">Hotel stays use a date range, unlike grooming appointments. Submitting saves this request only to the local demo workspace.</div>`;
    const blocked=step===2&&nights<1;
    const controls=`<div class="pet-book-controls">${step>1?'<button class="clone-btn clone-btn--ghost" data-hotel-prev>← Back</button>':'<span></span>'}<button class="clone-btn" ${blocked?'disabled':''} ${step===5?'data-hotel-submit':'data-hotel-next'}>${step===5?'Request hotel stay':'Continue →'}</button></div>`;
    const booking=`<div class="clone-glass"><div class="pet-stepper">${steps.map((label,i)=>`<span class="${step===i+1?'is-active':step>i+1?'is-done':''}">${i+1}<b>${label}</b></span>`).join('')}</div><article class="clone-card clone-card--full pet-book-card"><div class="clone-card__no">Hotel booking · Step ${step} of 5</div><h2>${['Who is staying with us?','Choose check-in and check-out','Add the care routine','Add contact details','Review the stay'][step-1]}</h2>${content}${controls}</article></div>`;
    const upcoming=`<h2 class="clone-section-title">Upcoming hotel stays</h2><div class="clone-grid">${hotelBookings.map(bookingCard).join('') || emptyCard('No hotel stays yet','Choose dates to request a stay.')}</div>`;
    return pageShell('Hotel stays','Pet Hotel.','Book multi-day stays with separate check-in and check-out dates, care instructions and owner details.',booking+upcoming,`<a class="clone-btn clone-btn--ghost" href="tel:+639000000000">Ask about availability</a>`);
  }

  const products=[
    {id:'shampoo',name:'Sensitive Skin Shampoo',price:349,tag:'Grooming'},
    {id:'balm',name:'Paw & Nose Balm',price:249,tag:'Care'},
    {id:'chews',name:'Dental Chews',price:299,tag:'Wellness'},
    {id:'toy',name:'Enrichment Toy',price:399,tag:'Play'}
  ];
  function clubPage(){
    const cartTotal=state.cart.reduce((sum,id)=>sum+(products.find(p=>p.id===id)?.price||0),0);
    const body=`<div class="clone-glass"><div class="clone-grid">${products.map(p=>`<article class="clone-card clone-card--third">${icon('shopping-bag')}<div class="clone-card__no">${esc(p.tag)}</div><h3>${esc(p.name)}</h3><div class="pet-price">${money(p.price)}</div><button class="clone-btn clone-btn--ghost" data-add-cart="${p.id}">Add to bag</button></article>`).join('')}<article class="clone-card clone-card--full"><div class="clone-card__no">Bag</div><h2>${state.cart.length} item${state.cart.length===1?'':'s'} · ${money(cartTotal)}</h2><p>Your saved shop bag is part of the Pawfile summary.</p><div class="clone-tags">${state.cart.length?state.cart.map(id=>tag(products.find(p=>p.id===id)?.name||id)).join(''):tag('Your bag is empty')}</div>${state.cart.length?'<button class="pet-link-btn" data-clear-cart>Clear bag →</button>':''}</article></div></div>`;
    return pageShell('Pet essentials','Shop.','Curated grooming, care, wellness and play essentials inside YourBrand.',body,`<a class="clone-btn" href="/rewards" data-spa>Rewards & Club ↗</a>`);
  }

  const rewards=[
    {id:'nails',name:'Complimentary Nail Trim',cost:100},
    {id:'spa',name:'Spa Add-on',cost:200},
    {id:'hotel',name:'Hotel Care Credit',cost:300}
  ];
  function rewardsPage(){
    const next=Math.max(0,200-state.points); const pct=Math.min(100,Math.round(state.points/200*100));
    const membership=`<article class="clone-card clone-card--full pet-member-card"><div>${icon('crown')}</div><div><div class="clone-card__no">YourBrand Club</div><h2>${state.membership.active?'Club Member':'Join the Pet Club'}</h2><p>${state.membership.active?`Member since ${state.membership.since}. Grooming perks and Paw Points are active.`:'Unlock club perks and Paw Points.'}</p><div class="clone-tags">${tag('Paw Points')}${tag('Member perks')}${tag('Care history')}</div></div></article>`;
    const body=`<div class="clone-glass"><div class="clone-grid">${membership}<article class="clone-card clone-card--full pet-reward-hero"><div>${icon('trophy')}</div><div><div class="clone-card__no">Club Rewards</div><div class="clone-metric">${state.points}</div><p>Paw Points available</p><div class="pet-progress"><span style="width:${pct}%"></span></div><small>${next?`${next} points to the 200-point milestone`:'200-point milestone reached'}</small></div></article>${rewards.map(r=>`<article class="clone-card clone-card--third"><div class="clone-card__no">${r.cost} points</div><h3>${esc(r.name)}</h3><p>Redeem from this demo workspace.</p><button class="clone-btn ${state.points<r.cost?'clone-btn--ghost':''}" data-redeem="${r.id}" ${state.points<r.cost?'disabled':''}>${state.points>=r.cost?'Redeem':'Need more points'}</button></article>`).join('')}</div></div>`;
    return pageShell('Loyalty & membership','Rewards & Club.','See club status, Paw Points, milestones and rewards in one place.',body,`<a class="clone-btn clone-btn--ghost" href="/shop" data-spa>Open Shop ↗</a>`);
  }

  function petByName(name){ return state.pets.find(p=>p.name===name) || state.pets[0]; }
  function bookingRange(b){
    if(b.type==='Hotel' && b.endDate) return `${fmtDate(b.date)} – ${fmtDate(b.endDate)}`;
    return `${fmtDate(b.date)}${b.time?' · '+b.time:''}`;
  }
  function syncHomeBookingReel(){
    const track=qs('[data-live-booking-reel]',main); if(!track) return;
    const bookings=[...state.bookings].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
    if(!bookings.length){ track.innerHTML='<span class="bento__shot bento__booking-shot is-placeholder">No upcoming bookings yet.</span>'; return; }
    const items=bookings.map(b=>{
      const p=petByName(b.pet), tone=b.status==='Confirmed'?'confirmed':'pending';
      return `<span class="bento__shot bento__booking-shot"><img class="bento__booking-pet" src="${p.image}" alt=""><span class="bento__booking-copy"><strong>${esc(b.type==='Hotel'?'Hotel Stay':b.service)}</strong><small>${esc(b.pet)} · ${esc(bookingRange(b))}</small><em class="is-${tone}">${esc(b.status)}</em></span></span>`;
    }).join('');
    track.innerHTML=items+items;
  }

  function notificationsPage(){
    state.notifications=(state.notifications||[]).map(n=>({...n,unread:false})); save();
    const rows=(state.notifications||[]).map(n=>`<article class="clone-card clone-card--full pet-notification"><div class="clone-row">${icon('bell')}<div class="clone-row__body"><div class="clone-card__no">Notification</div><h3>${esc(n.title)}</h3><p>${esc(n.text)}</p></div></div></article>`).join('');
    const body=`<div class="clone-glass"><div class="clone-grid">${rows||emptyCard('No notifications','You are all caught up.')}</div></div>`;
    return pageShell('Updates & reminders','Notifications.','Booking updates, care reminders and YourBrand notices in one place.',body);
  }

  function messagesPage(){
    state.messages=(state.messages||[]).map(m=>({...m,unread:m.from==='venue'?false:m.unread})); save();
    const bubbles=state.messages.map(m=>`<div class="pet-message ${m.from==='parent'?'is-parent':'is-venue'}"><div class="pet-message__who">${m.from==='parent'?'You':'YourBrand'}</div><p>${esc(m.text)}</p><small>${esc(m.time||'')}</small></div>`).join('');
    const body=`<div class="clone-glass pet-messages"><div class="pet-thread">${bubbles||'<div class="pet-message is-venue"><p>Start a conversation with YourBrand.</p></div>'}</div><form class="pet-message-compose" data-message-form><input class="pet-input" name="message" autocomplete="off" placeholder="Message YourBrand…" aria-label="Message"><button class="clone-btn" type="submit">Send</button></form><div class="clone-note">Demo workspace · messages are saved on this device.</div></div>`;
    return pageShell('Fur Parent inbox','Messages.','A shared conversation between the Fur Parent and YourBrand.',body,`<a class="clone-btn clone-btn--ghost" href="tel:+639000000000">Call instead</a>`);
  }

  function syncHomeSummary(){
    const grooming=state.bookings.find(b=>b.type==='Grooming');
    const hotel=state.bookings.find(b=>b.type==='Hotel');
    const due=healthRecords(state.activePet).find(h=>h.tone==='due');
    const set=(key,text)=>{const el=qs(`[data-summary="${key}"]`,main); if(el) el.textContent=text;};
    set('grooming',grooming?`${grooming.service} · ${fmtDate(grooming.date)} · ${grooming.time} · ${grooming.status}.`:'No grooming booked yet.');
    set('health',due?`${due.title} ${due.status}.`:healthRecords(state.activePet).length?'View your pet’s recorded care.':'No health records yet.');
    set('hotel',hotel?`${fmtDate(hotel.date)}${hotel.endDate?' – '+fmtDate(hotel.endDate):''} · ${hotel.status}.`:'No hotel stay booked yet.');
    set('rewards',`${state.points} Paw Points · ${state.membership.active?'Club Member active':'Club membership inactive'}.`);
    set('shop',`${state.cart.length} item${state.cart.length===1?'':'s'} in bag · Care essentials.`);
    set('rewardPoints',`${state.points} points`);
    set('rewardNext',state.points>=200?'Milestone reached':`${200-state.points} to 200-point milestone`);
    syncHomeBookingReel();
    syncRail();
  }

  function initPromoCarousel(){
    const viewport=qs('[data-promo-viewport]',main); if(!viewport) return;
    const slides=qsa('.home__promo-slide',viewport), dots=qsa('[data-promo-dot]',main);
    let index=0;
    const go=i=>{ if(!slides.length) return; index=(i+slides.length)%slides.length; viewport.scrollTo({left:index*viewport.clientWidth,behavior:'smooth'}); dots.forEach((d,j)=>d.classList.toggle('is-active',j===index)); };
    qs('[data-promo-prev]',main)?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();go(index-1)});
    qs('[data-promo-next]',main)?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();go(index+1)});
    dots.forEach((d,j)=>d.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();go(j)}));
    let down=false,startX=0,startLeft=0;
    viewport.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.target.closest('a,button'))return;down=true;startX=e.clientX;startLeft=viewport.scrollLeft;viewport.setPointerCapture?.(e.pointerId)});
    viewport.addEventListener('pointermove',e=>{if(down) viewport.scrollLeft=startLeft-(e.clientX-startX)});
    const finish=()=>{if(!down)return;down=false;index=Math.round(viewport.scrollLeft/Math.max(1,viewport.clientWidth));go(index)};
    viewport.addEventListener('pointerup',finish);viewport.addEventListener('pointercancel',finish);
    viewport.addEventListener('scroll',()=>{clearTimeout(viewport._promoT);viewport._promoT=setTimeout(()=>{const i=Math.round(viewport.scrollLeft/Math.max(1,viewport.clientWidth));if(i!==index){index=i;dots.forEach((d,j)=>d.classList.toggle('is-active',j===index));}},80)},{passive:true});
  }


  function closeHealthEditor(){ qs('.pet-modal')?.remove(); }
  function openHealthEditor(id){
    closeHealthEditor(); const h=healthRecords().find(x=>String(x.id)===String(id)); if(!h)return;
    const category=h.category||h.title||'Other', custom=category==='Other';
    const titleField=custom?`<label>Custom title<input class="pet-input" name="title" value="${esc(h.title||'Other Health Detail')}" required></label>`:`<label>Record type<div class="pet-fixed-field">${icon(healthIconName(h))}<strong>${esc(category)}</strong></div></label>`;
    const wrap=document.createElement('div'); wrap.className='pet-modal'; wrap.innerHTML=`<div class="pet-modal__backdrop" data-health-editor-close></div><section class="pet-modal__panel" role="dialog" aria-modal="true" aria-label="Edit health detail"><button class="pet-modal__close" type="button" data-health-editor-close aria-label="Close">×</button><div class="clone-card__no">${esc(state.activePet)} · Health & Care</div><h2>Edit ${esc(h.title)}</h2><form data-health-edit-form class="pet-form-grid"><input type="hidden" name="id" value="${esc(h.id)}">${titleField}<label>Status<input class="pet-input" name="status" value="${esc(h.status)}"></label><label>Tone<select class="pet-input" name="tone"><option value="good" ${h.tone==='good'?'selected':''}>Current / good</option><option value="due" ${h.tone==='due'?'selected':''}>Due / attention</option><option value="neutral" ${h.tone==='neutral'?'selected':''}>Neutral</option></select></label><label class="pet-field-full">Details<textarea class="pet-input pet-textarea" name="note">${esc(h.note)}</textarea></label><div class="pet-field-full pet-modal-actions"><button class="clone-btn" type="submit">Save changes</button><button class="clone-btn clone-btn--danger" type="button" data-health-delete="${esc(h.id)}">Delete record</button></div></form></section>`; document.body.appendChild(wrap); setTimeout(()=>wrap.querySelector(custom?'input[name="title"]':'input[name="status"]')?.focus(),20);
  }

  function closeBookingEditor(){ qs('.pet-modal')?.remove(); }
  function openBookingEditor(id){
    closeBookingEditor(); const b=state.bookings.find(x=>String(x.id)===String(id)); if(!b)return;
    const isHotel=b.type==='Hotel';
    const petOptions=state.pets.map(p=>`<option ${p.name===b.pet?'selected':''}>${esc(p.name)}</option>`).join('');
    const serviceField=isHotel?`<label>Booking type<div class="pet-fixed-field">${icon('dog-house')}<strong>Hotel Stay</strong></div></label>`:`<label>Grooming service<input class="pet-input" name="service" value="${esc(b.service)}"></label>`;
    const dateFields=isHotel?`<label>Check-in<input class="pet-input" type="date" name="date" value="${esc(b.date)}"></label><label>Check-out<input class="pet-input" type="date" name="endDate" value="${esc(b.endDate||'')}"></label><label class="pet-field-full">Times / stay note<input class="pet-input" name="time" value="${esc(b.time||'')}"></label>`:`<label>Date<input class="pet-input" type="date" name="date" value="${esc(b.date)}"></label><label>Time<input class="pet-input" name="time" value="${esc(b.time||'')}"></label>`;
    const wrap=document.createElement('div'); wrap.className='pet-modal'; wrap.innerHTML=`<div class="pet-modal__backdrop" data-booking-editor-close></div><section class="pet-modal__panel" role="dialog" aria-modal="true" aria-label="Edit booking"><button class="pet-modal__close" type="button" data-booking-editor-close aria-label="Close">×</button><div class="clone-card__no">${esc(b.type)} booking</div><h2>Edit ${esc(b.service)}</h2><form data-booking-edit-form class="pet-form-grid"><input type="hidden" name="id" value="${esc(b.id)}">${serviceField}<label>Pet<select class="pet-input" name="pet">${petOptions}</select></label>${dateFields}<label>Status<select class="pet-input" name="status"><option ${b.status==='Pending'?'selected':''}>Pending</option><option ${b.status==='Confirmed'?'selected':''}>Confirmed</option><option ${b.status==='Completed'?'selected':''}>Completed</option><option ${b.status==='Cancelled'?'selected':''}>Cancelled</option></select></label><div class="pet-field-full pet-modal-actions"><button class="clone-btn" type="submit">Save booking</button><button class="clone-btn clone-btn--danger" type="button" data-booking-delete="${esc(b.id)}">Delete booking</button></div></form></section>`; document.body.appendChild(wrap);
  }

  function render(path, push=false){
    state=loadState();
    path=normalizePath(path);
    if(push && location.pathname!==path) history.pushState({path},'',path);
    if(path==='/'){
      main.className='shell__panel lenis'; main.dataset.fixed='true'; main.innerHTML=HOME_HTML; document.title=HOME_TITLE; syncHomeSummary(); initPromoCarousel();
    } else {
      main.className='shell__panel'; main.removeAttribute('data-fixed');
      const noPets=!state.pets.length&&['/pets','/health'].includes(path);
      const html = noPets?`<section class="clone-page"><header class="clone-page__head"><h1>${path==='/health'?'Health & Care':'My Pets'}</h1></header><div class="clone-glass"><article class="clone-card clone-card--full"><h2>No pets yet</h2><p>Add your pet to keep care records and bookings together.</p><button class="clone-btn" type="button" data-add-pet-main>Add pet</button></article></div></section>`:path==='/grooming'?bookingPage():path==='/pets'?pawfilePage():path==='/health'?healthPage():path==='/hotel'?hotelPage():path==='/shop'?clubPage():path==='/messages'?messagesPage():path==='/notifications'?notificationsPage():path==='/about'?aboutPage():path==='/profile'?profilePage():rewardsPage();
      main.innerHTML=html; document.title=`${routeTitles[path]} | YourBrand`;
    }
    setActive(path); syncRail(); main.scrollTop=0; window.scrollTo(0,0); document.dispatchEvent(new CustomEvent('branddemo:render',{detail:{path}}));
  }

  function toast(message){
    let el=qs('.pet-toast'); if(!el){ el=document.createElement('div'); el.className='pet-toast'; document.body.appendChild(el); }
    el.textContent=message; el.classList.add('is-showing'); clearTimeout(toast.t); toast.t=setTimeout(()=>el.classList.remove('is-showing'),2200);
  }

  document.addEventListener('click', e=>{
    const a=e.target.closest('a');
    if(a && !e.defaultPrevented && e.button===0 && !e.metaKey&&!e.ctrlKey&&!e.shiftKey&&!e.altKey){
      if(a.hasAttribute('data-open-kape')){ e.preventDefault(); openKape(); return; }
      const u=new URL(a.href,location.href); const p=normalizePath(u.pathname);
      if(u.origin===location.origin && routeTitles[p]){ if(!(u.pathname===location.pathname&&u.hash)){ e.preventDefault(); render(p,true); } }
    }

    const t=e.target.closest('button'); if(!t) return;
    if(t.dataset.switchPet){ state.activePet=t.dataset.switchPet; state.bookingDraft.pet=state.activePet; state.hotelDraft.pet=state.activePet; save(); render(location.pathname,false); toast(`${state.activePet} is now active.`); }
    if(t.dataset.pawTab){ state.pawTab=t.dataset.pawTab; save(); render('/pets',false); }
    if(t.dataset.draftPet){ state.bookingDraft.pet=t.dataset.draftPet; state.activePet=t.dataset.draftPet; save(); render('/grooming',false); }
    if(t.dataset.draftService){ state.bookingDraft.service=t.dataset.draftService; save(); render('/grooming',false); }
    if(t.hasAttribute('data-book-next')){ if(!state.pets.length){toast('Add a pet in My Pets before booking.');return;} state.bookingDraft.step=Math.min(5,(state.bookingDraft.step||1)+1); save(); render('/grooming',false); }
    if(t.hasAttribute('data-book-prev')){ state.bookingDraft.step=Math.max(1,(state.bookingDraft.step||1)-1); save(); render('/grooming',false); }
    if(t.hasAttribute('data-book-submit')){
      const d=state.bookingDraft; const type='Grooming';
      if(!state.pets.some(p=>p.name===d.pet)||!d.date||!d.time){toast('Choose a pet, date and time before sending your request.');return;}
      if(d.date<new Date().toLocaleDateString('en-CA')){toast('Choose today or a future booking date.');return;}
      state.bookings.unshift({id:Date.now(),type,service:d.service,date:d.date,time:d.time,status:'Pending',pet:d.pet});
      state.points+=10; state.bookingDraft={...defaultState.bookingDraft,pet:state.activePet,step:1}; save(); render('/grooming',false); toast('Grooming request saved · +10 Paw Points');
    }
    if(t.dataset.bookService){ state.bookingDraft.service=t.dataset.bookService; state.bookingDraft.step=3; save(); render('/grooming',true); }
    if(t.dataset.hotelPet){ state.hotelDraft.pet=t.dataset.hotelPet; state.activePet=t.dataset.hotelPet; save(); render('/hotel',false); }
    if(t.hasAttribute('data-hotel-next')){ if(!state.pets.length){toast('Add a pet in My Pets before booking.');return;} if(state.hotelDraft.step===2&&hotelNights(state.hotelDraft)<1){toast('Choose a check-out date after check-in.');}else{state.hotelDraft.step=Math.min(5,(state.hotelDraft.step||1)+1);save();render('/hotel',false);} }
    if(t.hasAttribute('data-hotel-prev')){ state.hotelDraft.step=Math.max(1,(state.hotelDraft.step||1)-1); save(); render('/hotel',false); }
    if(t.hasAttribute('data-hotel-submit')){
      const d=state.hotelDraft, nights=hotelNights(d); if(!state.pets.some(p=>p.name===d.pet)){toast('Choose a pet before sending your request.');return;} if(!d.checkIn||!d.checkOut||d.checkIn<new Date().toLocaleDateString('en-CA')||nights<1){toast('Choose a valid hotel stay date range.');return;}
      state.bookings.unshift({id:Date.now(),type:'Hotel',service:`Pet Hotel Stay · ${nights} night${nights===1?'':'s'}`,date:d.checkIn,endDate:d.checkOut,time:`Check-in ${d.checkInTime} · Pick-up ${d.checkOutTime}`,status:'Pending',pet:d.pet,feeding:d.feeding,notes:d.notes});
      state.points+=20; state.hotelDraft={...defaultState.hotelDraft,pet:state.activePet,step:1}; save(); render('/hotel',false); toast('Hotel stay request saved · +20 Paw Points');
    }
    if(t.dataset.healthDone){ const h=healthRecords().find(x=>String(x.id)===String(t.dataset.healthDone)); if(h){h.status='Completed '+new Date().toLocaleDateString('en-PH',{month:'short',day:'numeric',year:'numeric'});h.note='Preventive care marked complete';h.tone='good';save();render(location.pathname,false);toast('Health record updated.');} }
    if(t.hasAttribute('data-add-note')){ const val=qs('#new-note')?.value.trim(); if(val){state.notes.push(val);save();render('/pets',false);toast('Care note saved.');} }
    if(t.hasAttribute('data-add-photo')) toast('Photo upload is a demo placeholder in this static build.');
    if(t.hasAttribute('data-add-document')) toast('Document upload is a demo placeholder in this static build.');
    if(t.dataset.addCart){ state.cart.push(t.dataset.addCart);save();render('/shop',false);toast('Added to bag.'); }
    if(t.hasAttribute('data-clear-cart')){ state.cart=[];save();render('/shop',false); }
    if(t.dataset.redeem){ const r=rewards.find(x=>x.id===t.dataset.redeem); if(r&&state.points>=r.cost){state.points-=r.cost;save();render('/rewards',false);toast(`${r.name} redeemed.`);} }
    if(t.dataset.addHealthType){
      const category=t.dataset.addHealthType; const id='health-'+Date.now(); const custom=category==='Other';
      healthRecords().push({id,category,title:custom?'Other Health Detail':category,status:'Not specified',note:custom?'Add details for this health record.':`Add details for ${category.toLowerCase()}.`,tone:'neutral',iconName:healthIconForCategory(category)});
      save(); render('/pets',false); openHealthEditor(id); return;
    }
    if(t.dataset.healthEdit){ openHealthEditor(t.dataset.healthEdit); return; }
    if(t.dataset.healthDelete){
      const records=healthRecords(), idx=records.findIndex(x=>String(x.id)===String(t.dataset.healthDelete));
      if(idx>-1 && confirm('Delete this health record?')){ records.splice(idx,1); save(); closeHealthEditor(); render(location.pathname,false); toast('Health record deleted.'); } return;
    }
    if(t.dataset.bookingEdit){ openBookingEditor(t.dataset.bookingEdit); return; }
    if(t.dataset.bookingDelete){
      const idx=state.bookings.findIndex(x=>String(x.id)===String(t.dataset.bookingDelete));
      if(idx>-1 && confirm('Delete this booking?')){ state.bookings.splice(idx,1); save(); closeBookingEditor(); render(location.pathname,false); toast('Booking deleted.'); } return;
    }
    if(t.hasAttribute('data-health-editor-close')) closeHealthEditor();
    if(t.hasAttribute('data-booking-editor-close')) closeBookingEditor();
  });

  document.addEventListener('input',e=>{
    const key=e.target?.dataset?.draft; if(key){ state.bookingDraft[key]=e.target.value; if(key==='owner'&&e.target.value.trim()) state.profile.name=e.target.value.trim(); save(); }
    const hk=e.target?.dataset?.hotelDraft; if(hk){ state.hotelDraft[hk]=e.target.value; if(hk==='owner'&&e.target.value.trim()) state.profile.name=e.target.value.trim(); save(); }
  });
  document.addEventListener('change',e=>{
    if(e.target?.matches('[data-profile-image]') && e.target.files?.[0]){ const r=new FileReader(); r.onload=()=>{state.profile.image=String(r.result);save();render('/profile',false);toast('Profile photo updated.');}; r.readAsDataURL(e.target.files[0]); return; }
    const key=e.target?.dataset?.draft; if(key){ state.bookingDraft[key]=e.target.value; if(key==='owner'&&e.target.value.trim()) state.profile.name=e.target.value.trim(); save(); }
    const hk=e.target?.dataset?.hotelDraft; if(hk){ state.hotelDraft[hk]=e.target.value; if(hk==='owner'&&e.target.value.trim()) state.profile.name=e.target.value.trim(); save(); if(hk==='checkIn'||hk==='checkOut') render('/hotel',false); }
  });
  document.addEventListener('submit',e=>{
    if(e.target.matches('[data-message-form]')){
      e.preventDefault(); const fd=new FormData(e.target), text=String(fd.get('message')||'').trim();
      if(text){ state.messages.push({id:Date.now(),from:'parent',text,time:new Date().toLocaleTimeString('en-PH',{hour:'numeric',minute:'2-digit'}),unread:false}); save(); render('/messages',false); }
      return;
    }
    if(e.target.matches('[data-profile-form]')){
      e.preventDefault(); const fd=new FormData(e.target); state.profile.name=String(fd.get('name')||'Fur Parent').trim()||'Fur Parent'; state.profile.phone=String(fd.get('phone')||'').trim(); state.profile.email=String(fd.get('email')||'').trim(); state.bookingDraft.owner=state.profile.name; state.hotelDraft.owner=state.profile.name; if(state.profile.phone){state.bookingDraft.phone=state.profile.phone;state.hotelDraft.phone=state.profile.phone;} save(); render('/profile',false); toast('Profile saved.'); return;
    }
    if(e.target.matches('[data-health-edit-form]')){
      e.preventDefault(); const fd=new FormData(e.target), id=String(fd.get('id')||''); const h=healthRecords().find(x=>String(x.id)===id); if(h){const category=h.category||h.title||'Other'; if(category==='Other') h.title=String(fd.get('title')||h.title||'Other Health Detail').trim()||'Other Health Detail'; else h.title=category; h.iconName=healthIconForCategory(category); h.status=String(fd.get('status')||'').trim()||'Not specified';h.note=String(fd.get('note')||'').trim();h.tone=String(fd.get('tone')||'neutral');save();closeHealthEditor();render('/pets',false);toast('Health detail updated.');} return;
    }
    if(e.target.matches('[data-booking-edit-form]')){
      e.preventDefault(); const fd=new FormData(e.target), id=String(fd.get('id')||''), b=state.bookings.find(x=>String(x.id)===id); if(b){if(b.type!=='Hotel') b.service=String(fd.get('service')||b.service).trim()||b.service; b.pet=String(fd.get('pet')||b.pet); b.date=String(fd.get('date')||b.date); if(b.type==='Hotel') b.endDate=String(fd.get('endDate')||b.endDate||''); b.time=String(fd.get('time')||b.time).trim(); b.status=String(fd.get('status')||b.status); save();closeBookingEditor();render('/pets',false);toast('Booking updated.');} return;
    }
  });

  addEventListener('popstate',()=>render(location.pathname,false));

  // Theme: same clone control and behavior, separate local storage key.
  const themeBtn=qs('.rail__theme');
  function applyTheme(theme){
    document.documentElement.dataset.theme=theme;
    themeBtn?.setAttribute('aria-label',theme==='dark'?'Switch to light theme':'Switch to dark theme');
    const tg=themeBtn?.querySelector('.tg'); if(tg) tg.dataset.theme=theme;
    try{localStorage.setItem('tfa-theme',theme);}catch(_){}
    window.dispatchEvent(new CustomEvent('themechange',{detail:{theme}}));
  }
  let storedTheme='light'; try{storedTheme=localStorage.getItem('tfa-theme')||'light';}catch(_){}
  applyTheme(storedTheme==='dark'?'dark':'light');
  themeBtn?.addEventListener('click',()=>applyTheme(document.documentElement.dataset.theme==='dark'?'light':'dark'));

  // Rail chat box: a real Fur Parent ↔ YourBrand local conversation.
  const kape=qs('.kape'), panel=qs('.kape__panel'), thread=qs('[data-parent-chat-thread]'), form=qs('.kape__form'), input=qs('.kape__input'), send=qs('.kape__send');
  const closeTool=qsa('.kape__tool').find(b=>/close/i.test(b.getAttribute('aria-label')||''));
  function renderParentChat(){ if(!thread)return; thread.innerHTML=(state.messages||[]).map(m=>`<li class="kape__msg${m.from==='parent'?' kape__msg--user':''}"><div class="kape__bubble">${esc(m.text)}</div><span class="kape__meta">${m.from==='parent'?'You':'YourBrand'} · ${esc(m.time||'')}</span></li>`).join('')||'<li class="kape__msg"><div class="kape__bubble">Start a conversation with YourBrand.</div></li>'; thread.scrollTop=thread.scrollHeight; }
  function openKape(){ state.messages=(state.messages||[]).map(m=>m.from==='venue'?{...m,unread:false}:m); save(); renderParentChat(); kape?.classList.add('is-open'); panel?.removeAttribute('inert'); setTimeout(()=>input?.focus(),40); }
  function closeKape(){ kape?.classList.remove('is-open'); panel?.setAttribute('inert',''); }
  document.addEventListener('click',e=>{const b=e.target.closest('[data-open-kape]');if(b){e.preventDefault();kape?.classList.contains('is-open')?closeKape():openKape();}});
  closeTool?.addEventListener('click',closeKape); addEventListener('keydown',e=>{if(e.key==='Escape'&&kape?.classList.contains('is-open'))closeKape();});
  input?.addEventListener('input',()=>{if(send)send.disabled=!input.value.trim();});
  form?.addEventListener('submit',e=>{e.preventDefault();const v=input?.value.trim();if(!v)return;state.messages.push({id:Date.now(),from:'parent',text:v,time:new Date().toLocaleTimeString('en-PH',{hour:'numeric',minute:'2-digit'}),unread:false});save();input.value='';if(send)send.disabled=true;renderParentChat();});

  // Accessibility control from the clone: same floating interaction, now fully functional locally.
  const a11y=qs('.a11y'), a11yPanel=qs('.a11y__panel'), a11yBtn=qs('.a11y__button'), a11yClose=qs('.a11y__close'), a11yReset=qs('.a11y__reset');
  const a11ySwitches=qsa('.a11y__switch');
  function closeA11y(){a11y?.classList.remove('is-open');a11yPanel?.setAttribute('inert','');a11yBtn?.setAttribute('aria-expanded','false');}
  function openA11y(){a11y?.classList.add('is-open');a11yPanel?.removeAttribute('inert');a11yBtn?.setAttribute('aria-expanded','true');}
  a11yBtn?.addEventListener('click',()=>a11y?.classList.contains('is-open')?closeA11y():openA11y()); a11yClose?.addEventListener('click',closeA11y);
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&a11y?.classList.contains('is-open')){closeA11y();a11yBtn?.focus();}});
  document.addEventListener('pointerdown',e=>{if(a11y?.classList.contains('is-open')&&!a11y.contains(e.target))closeA11y();});
  const switchClasses=['a11y-high-contrast','a11y-reduce-motion','a11y-underline'];
  a11ySwitches.forEach((b,i)=>b.addEventListener('click',()=>{const on=b.getAttribute('aria-pressed')==='true';b.setAttribute('aria-pressed',on?'false':'true');document.documentElement.classList.toggle(switchClasses[i],!on);if(a11yReset)a11yReset.disabled=false;}));
  a11yReset?.addEventListener('click',()=>{document.documentElement.classList.remove(...switchClasses);a11ySwitches.forEach(x=>x.setAttribute('aria-pressed','false'));a11yReset.disabled=true;});

  // YourBrand HeroCanvas background is mounted by /branddemo-background.js using the supplied Three.js bundle.

  // Same clone cursor ring.
  const ring=qs('.cursor-ring');
  if(ring&&matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{ring.style.transform=`translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;ring.style.opacity='1';},{passive:true});document.addEventListener('pointerover',e=>{const hit=e.target.closest('a,button,input,textarea,select,summary');ring.classList.toggle('is-hover',!!hit);});addEventListener('mouseout',e=>{if(!e.relatedTarget)ring.style.opacity='0';});}

  syncRail(); render(location.pathname,false);
})();
