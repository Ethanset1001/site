const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetTab = button.dataset.tab;
    
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    button.classList.add('active');
    document.getElementById(targetTab).classList.add('active');
  });
});

// Server Status Fetcher
async function fetchServerStatus() {
  const badge = document.getElementById('status-badge');
  const serverIcon = document.getElementById('server-icon');
  const playerCount = document.getElementById('player-count');
  const version = document.getElementById('server-version');
  const pingVal = document.getElementById('ping-value');
  const uniqueCard = document.getElementById('unique-players-card');
  const uniqueVal = document.getElementById('unique-players');
  const playerListContainer = document.getElementById('player-list');
  
  // Details elements
  const detailSoftware = document.getElementById('detail-software');
  const detailProtocol = document.getElementById('detail-protocol');
  const detailUptime = document.getElementById('detail-uptime');

  const updateUI = (data) => {
    const { isOnline, players, maxPlayers, verString, playerList, latency, icon, uniqueCount, software, protocol, uptime } = data;

    if (isOnline) {
      if (icon) {
        serverIcon.src = icon;
        serverIcon.style.display = 'block';
      } else {
        serverIcon.style.display = 'none';
      }

      badge.textContent = 'Online';
      badge.className = 'status-badge online';
      playerCount.textContent = `${players} / ${maxPlayers}`;
      version.textContent = verString || 'Unknown';
      // Handle latency formatting
      pingVal.textContent = typeof latency === 'number' ? `${latency}ms` : latency;

      // Handle Unique Players Card
      if (uniqueCount !== undefined && uniqueCount !== null) {
        uniqueVal.textContent = uniqueCount;
        uniqueCard.style.display = 'flex';
      } else {
        uniqueCard.style.display = 'none';
      }

      // Update Player List
      // Update Details Tab
      detailSoftware.textContent = software || verString || 'Unknown';
      detailProtocol.textContent = protocol || '--';
      detailUptime.textContent = uptime || 'Unavailable (API)';

      playerListContainer.innerHTML = '';
      
      if (players > 0) {
        if (playerList && playerList.length > 0) {
          // Deduplicate players based on UUID or Name
          const uniqueList = Array.from(new Map(playerList.map(p => {
            const id = typeof p === 'string' ? p : (p.uuid || p.name_clean || p.name_raw);
            return [id, p];
          })).values());

          uniqueList.forEach(player => {
            const playerEl = document.createElement('div');
            playerEl.className = 'player-card';
            const name = typeof player === 'string' ? player : (player.name_clean || player.name_raw || 'Unknown');
            playerEl.textContent = name;
            
            // Try to get a skin identifier (UUID preferred, then name)
            const skinId = player.uuid || name;
            if (skinId && skinId !== 'Unknown') {
               const img = document.createElement('img');
               // Use mc-heads.net which supports names if UUID is missing
               img.src = `https://mc-heads.net/body/${encodeURIComponent(skinId)}`;
               img.alt = name;
               img.onerror = function() { 
                  this.style.display = 'none'; 
               };
               playerEl.prepend(img);
            }
            
            playerListContainer.appendChild(playerEl);
          });

          // Handle truncated lists (show count of missing players)
          if (players > playerList.length) {
            const moreEl = document.createElement('div');
            moreEl.className = 'player-card more-players';
            moreEl.innerHTML = `<span>+${players - playerList.length}</span><span>more</span>`;
            playerListContainer.appendChild(moreEl);
          }
        } else {
          const warningEl = document.createElement('div');
          warningEl.className = 'query-warning';
          warningEl.textContent = 'Player list unavailable (Query disabled or Bedrock)';
          playerListContainer.appendChild(warningEl);
        }
      } else {
        const emptyEl = document.createElement('div');
        emptyEl.className = 'no-players-text';
        emptyEl.textContent = 'No players online';
        playerListContainer.appendChild(emptyEl);
      }

    } else {
      serverIcon.style.display = 'none';
      badge.textContent = 'Offline';
      badge.className = 'status-badge offline';
      playerCount.textContent = '- / -';
      version.textContent = '-';
      pingVal.textContent = '--';
      playerListContainer.innerHTML = '<span class="offline-text">Server is offline</span>';
      
      detailSoftware.textContent = '--';
      detailProtocol.textContent = '--';
      detailUptime.textContent = '--';
    }
  };

  try {
    const javaUrl = 'https://api.mcstatus.io/v2/status/java/understanding-its.gl.joinmc.link';
    const javaResponse = await fetch(javaUrl);
    const javaData = await javaResponse.json();

    if (javaData.online) {
      updateUI({
        isOnline: true, 
        players: javaData.players.online, 
        maxPlayers: javaData.players.max, 
        verString: javaData.version.name_clean, 
        playerList: javaData.players.list, 
        latency: javaData.latency ?? '--', 
        icon: javaData.icon, 
        uniqueCount: javaData.players.unique,
        software: javaData.software,
        protocol: javaData.version.protocol,
        uptime: null // Not available in standard response
      });
      return;
    }

    // Attempt 2: Try Bedrock Status
    console.log("Java query offline, trying Bedrock...");
    const bedrockUrl = 'https://api.mcstatus.io/v2/status/bedrock/understanding-its.gl.joinmc.link';
    const bedrockResponse = await fetch(bedrockUrl);
    const bedrockData = await bedrockResponse.json();

    if (bedrockData.online) {
      updateUI({
        isOnline: true, 
        players: bedrockData.players.online, 
        maxPlayers: bedrockData.players.max, 
        verString: bedrockData.version ? bedrockData.version.name : 'Bedrock', 
        playerList: bedrockData.players.list, 
        latency: bedrockData.latency ?? '--', 
        icon: null, 
        uniqueCount: bedrockData.players.unique,
        software: bedrockData.edition, // Use edition as software for Bedrock
        protocol: bedrockData.version ? bedrockData.version.protocol : null,
        uptime: null
      });
      return;
    }

    // If both fail
    updateUI({ isOnline: false });

  } catch (err) {
    console.error('Fetch error:', err);
    if (serverIcon) serverIcon.style.display = 'none';
    badge.textContent = 'Error';
    badge.className = 'status-badge offline';
    playerListContainer.innerHTML = '<span class="error-text">Failed to fetch status</span>';
  }
}

// Copy IP functionality
const copyBtn = document.getElementById('copy-btn');
const ipText = document.getElementById('server-ip-text');

copyBtn.addEventListener('click', () => {
  const ip = ipText.textContent;
  navigator.clipboard.writeText(ip).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = '#059669'; // Green success color
    
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.background = ''; // Reset to CSS default
    }, 1000);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
    copyBtn.textContent = 'Error';
    setTimeout(() => {
      copyBtn.textContent = 'Copy IP';
    }, 1000);
  });
});

// Initial fetch
fetchServerStatus();

// Update status every 8 seconds
setInterval(fetchServerStatus, 8000);