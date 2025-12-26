// JavaScript from: https://qx-jummuu-v1-ai-pro.netlify.app/

// Script 0

    // ===== Helper formatting =====
    function pad(n){ return String(n).padStart(2,'0'); }
    
    // Get current time in UTC+6 (Bangladesh time)
    function getBangladeshTime() {
      const now = new Date();
      // Convert to UTC+6 (Bangladesh time)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      return new Date(utc + (3600000 * 6));
    }

    // ===== UI Elements =====
    const marketEl = document.getElementById('market');
    const genBtn = document.getElementById('gen');
    const btnText = document.getElementById('btnText');
    const sigBox = document.getElementById('signalBox');
    const sigText = document.getElementById('sigText');
    const countEl = document.getElementById('count');
    const barEl = document.getElementById('bar');

    // ===== Timer State =====
    let duration = 60; // 60 seconds for next candle
    let remain = duration;
    let timer = null;
    let isGenerating = false;

    function renderTimer(){
      const minutes = Math.floor(remain / 60);
      const seconds = remain % 60;
      countEl.textContent = `${pad(minutes)}:${pad(seconds)}`;
      const pct = (1 - (remain/duration)) * 100;
      barEl.style.width = pct.toFixed(2) + '%';
    }

    function startTimer(){
      clearInterval(timer);
      remain = duration;
      renderTimer();
      timer = setInterval(() => {
        remain--; 
        if(remain <= 0){ 
          remain = 0; 
          clearInterval(timer); 
          genBtn.disabled = false;
          btnText.textContent = "Generate Signal";
        }
        renderTimer();
      }, 1000);
    }

    function getNextCandleTime() {
      const bdTime = getBangladeshTime();
      const nextMinute = new Date(bdTime);
      nextMinute.setMinutes(bdTime.getMinutes() + 1);
      nextMinute.setSeconds(0);
      nextMinute.setMilliseconds(0);
      
      return nextMinute;
    }

    function generateSignal(){
      if (isGenerating) return;
      
      isGenerating = true;
      genBtn.disabled = true;
      btnText.innerHTML = '<span class="loading"> Generating...';
      
      // Simulate processing delay
      setTimeout(() => {
        const dir = Math.random() > 0.5 ? 'UP' : 'DOWN';
        const nextCandleTime = getNextCandleTime();
        
        // Get Bangladesh time for display
        const bdTime = getBangladeshTime();
        const currentHour = pad(bdTime.getHours());
        const currentMinute = pad(bdTime.getMinutes());
        
        // Next candle time in Bangladesh time
        const nextHour = pad(nextCandleTime.getHours());
        const nextMinute = pad(nextCandleTime.getMinutes());
        
        const asset = marketEl.value;

        // Calculate seconds until next candle (in Bangladesh time)
        const nowBdTime = getBangladeshTime();
        const timeUntilNextCandle = Math.floor((nextCandleTime - nowBdTime) / 1000);
        duration = timeUntilNextCandle;
        
        const block = `
<div class="sig-title">🤖 <span class="sig-big">SIGNAL 🤖 
<div class="line sig-big">⇅&nbsp; <span id="pair">${asset}
<div class="line">⏰&nbsp;${nextHour}:${nextMinute} (UTC+06:00)
<div class="line">💊&nbsp;1 MINUTE 
<div class="line sig-big">📕&nbsp;GO FOR <span class="${dir === 'UP' ? 'direction-up' : 'direction-down'}">${dir}
<div class="line">❗️ USE MTG 1 IF LOSS ❗️
<div class="line">🧿&nbsp; JUMMUU AI &nbsp;🧿
        `;
        
        sigText.innerHTML = block.trim();
        sigBox.classList.add('show');
        
        // Announce the new signal for screen readers
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'assertive');
        liveRegion.setAttribute('class', 'sr-only');
        liveRegion.textContent = `New signal generated for ${asset}, next candle direction ${dir}`;
        document.body.appendChild(liveRegion);
        
        setTimeout(() => {
          document.body.removeChild(liveRegion);
        }, 1000);
        
        startTimer();
        isGenerating = false;
        btnText.textContent = "Generate Signal";
      }, 1500); // Simulate processing time
    }

    genBtn.addEventListener('click', generateSignal);
    
    // Add keyboard support for select
    marketEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        generateSignal();
      }
    });

    // Initialize
    renderTimer();
    
    // Screen reader only class
    const style = document.createElement('style');
    style.textContent = '.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }';
    document.head.appendChild(style);
  

// Script 1

    // Disable Right Click
    document.addEventListener('contextmenu', event => event.preventDefault());

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U, Ctrl+Shift+J
    document.addEventListener('keydown', function (event) {
      if (event.key === "F12" || 
          (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key)) ||
          (event.ctrlKey && event.key === 'U')) {
        event.preventDefault();
      }
    });

    // Disable dragging or selection
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());
  

