/**
 * Munfollow - Massive Unfollow
 * Creator: https://github.com/Miabeyefendi/munfollow
 * Version: 4.0.0 (Multi-language, Filters, Sorting)
 */

(function () {
    if (window.location.hostname !== 'www.instagram.com') {
        alert('This tool only works on Instagram!\nPlease go to https://www.instagram.com');
        window.location.href = 'https://www.instagram.com/';
        return;
    }

    const dict = {
        en: {
            appTitle: "Munfollow",
            appDesc: "Unfollow those who don't follow you!",
            antiBanGroup: "Anti-Ban Settings",
            minDelay: "Min Delay (s)",
            maxDelay: "Max Delay (s)",
            pauseCount: "Auto Pause (Actions)",
            pauseDuration: "Pause Duration (s)",
            scanBtn: "Scan Following",
            rescanBtn: "Rescan",
            scanning: "Scanning...",
            statsGroup: "Statistics",
            statTotal: "Total Scanned",
            statNonFollowers: "Non-Followers",
            statMutuals: "Mutuals",
            statSelected: "Selected",
            statSuccess: "Success Unfollowed",
            filtersGroup: "Filters & Sorting",
            filterLabel: "Filter Type",
            sortLabel: "Sort Direction",
            unfollowBtn: "Unfollow Selected",
            unfollowing: "Processing...",
            pauseStatus: "Paused",
            selectAll: "Select All",
            emptyList: "Start scanning to see the list here.",
            confirmUnfollow: "Are you sure you want to unfollow the selected users?\n\nDo not close the page during the process.",
            processDone: "Process completed!\nSuccessfully unfollowed: ",
            fAll: "All Following",
            fNonFollowers: "Non-Followers",
            fMutuals: "Mutuals",
            fPrivate: "Private Accounts",
            fVerified: "Verified Accounts",
            fNoPic: "No Profile Picture",
            fCloseFriends: "Close Friends",
            sNewest: "Newest to Oldest",
            sOldest: "Oldest to Newest",
            userList: "User List",
            devLink: "Creator @miabeyefendi",
            githubLink: "Github: Munfollow"
        },
        tr: {
            appTitle: "Munfollow",
            appDesc: "Seni takip etmeyenleri takipten çık!",
            antiBanGroup: "Anti-Ban Ayarları",
            minDelay: "Min Bekleme (sn)",
            maxDelay: "Maks Bekleme (sn)",
            pauseCount: "Otomatik Mola (İşlem)",
            pauseDuration: "Mola Süresi (sn)",
            scanBtn: "Takip Edilenleri Tara",
            rescanBtn: "Yeniden Tara",
            scanning: "Taranıyor...",
            statsGroup: "İstatistikler",
            statTotal: "Toplam Taranan",
            statNonFollowers: "Takip Etmeyenler",
            statMutuals: "Karşılıklı",
            statSelected: "Seçilen",
            statSuccess: "Başarılı Çıkarma",
            filtersGroup: "Filtreleme & Sıralama",
            filterLabel: "Filtre Türü",
            sortLabel: "Sıralama (Takip Sırası)",
            unfollowBtn: "Seçilenleri Takipten Çık",
            unfollowing: "Devam Ediyor...",
            pauseStatus: "Mola Verildi",
            selectAll: "Tümünü Seç",
            emptyList: "Taramayı başlattığınızda kullanıcılar burada listelenecektir.",
            confirmUnfollow: "Seçilen kişileri takipten çıkmak istediğinize emin misiniz?\n\nİşlem sırasında sayfayı kapatmayın.",
            processDone: "İşlem tamamlandı!\nBaşarıyla takipten çıkılan: ",
            fAll: "Tümü",
            fNonFollowers: "Takip Etmeyenler",
            fMutuals: "Takip Edenler (Karşılıklı)",
            fPrivate: "Gizli Hesaplar",
            fVerified: "Onaylı Hesaplar",
            fNoPic: "Profil Fotoğrafı Olmayanlar",
            fCloseFriends: "Yakın Arkadaşlar",
            sNewest: "Sondan İlke Doğru (Son Takip)",
            sOldest: "İlkten Sona Doğru (İlk Takip)",
            userList: "Kullanıcı Listesi",
            devLink: "Yaratıcı @miabeyefendi",
            githubLink: "Github: Munfollow"
        },
        es: {
            appTitle: "Munfollow",
            appDesc: "¡Deja de seguir a los que no te siguen!",
            antiBanGroup: "Ajustes Anti-Ban",
            minDelay: "Retraso Min (s)",
            maxDelay: "Retraso Max (s)",
            pauseCount: "Pausa Auto (Acciones)",
            pauseDuration: "Duración de Pausa (s)",
            scanBtn: "Escanear",
            rescanBtn: "Escanear de Nuevo",
            scanning: "Escaneando...",
            statsGroup: "Estadísticas",
            statTotal: "Total Escaneado",
            statNonFollowers: "No Seguidores",
            statMutuals: "Mutuos",
            statSelected: "Seleccionado",
            statSuccess: "Dejados de seguir",
            filtersGroup: "Filtros y Orden",
            filterLabel: "Tipo de Filtro",
            sortLabel: "Orden",
            unfollowBtn: "Dejar de seguir",
            unfollowing: "Procesando...",
            pauseStatus: "Pausado",
            selectAll: "Seleccionar Todo",
            emptyList: "Empieza a escanear para ver la lista aquí.",
            confirmUnfollow: "¿Estás seguro de que quieres dejar de seguir a los usuarios seleccionados?\n\nNo cierres la página durante el proceso.",
            processDone: "¡Proceso completado!\nCon éxito: ",
            fAll: "Todos",
            fNonFollowers: "No Seguidores",
            fMutuals: "Mutuos",
            fPrivate: "Cuentas Privadas",
            fVerified: "Cuentas Verificadas",
            fNoPic: "Sin Foto de Perfil",
            fCloseFriends: "Mejores Amigos",
            sNewest: "Más nuevos",
            sOldest: "Más antiguos",
            userList: "Lista de Usuarios",
            devLink: "Creador @miabeyefendi",
            githubLink: "Github: Munfollow"
        }
    };

    let lang = 'en';
    const t = (key) => dict[lang][key];

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    const userId = getCookie('ds_user_id');
    const csrfToken = getCookie('csrftoken');

    if (!userId || !csrfToken) {
        alert('User info not found. Make sure you are logged into Instagram.');
        return;
    }

    document.body.innerHTML = '';
    document.title = 'Munfollow - Massive Unfollow';

    // Application state
    let allUsers = [];
    let displayedUsers = [];
    let nonFollowersCount = 0;
    let mutualsCount = 0;
    let selectedUserIds = new Set();
    let closeFriendsIds = new Set();
    let isScanning = false;
    let isUnfollowing = false;
    let successCount = 0;

    const els = {};

    const app = document.createElement('div');
    app.style.cssText = 'min-height: 100vh; background-color: #09090b; color: #fafafa; font-family: system-ui, -apple-system, sans-serif; display: flex; flex-direction: column;';
    document.body.appendChild(app);

    // HEADER
    const header = document.createElement('header');
    header.style.cssText = 'background-color: #18181b; border-bottom: 1px solid #27272a; padding: 16px 32px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;';
    app.appendChild(header);

    const logoContainer = document.createElement('div');
    logoContainer.style.cssText = 'display: flex; align-items: center; gap: 12px;';
    header.appendChild(logoContainer);

    const logoText = document.createElement('div');
    logoContainer.appendChild(logoText);

    els.appTitle = document.createElement('h1');
    els.appTitle.style.cssText = 'margin: 0; font-size: 22px; font-weight: 800; background: linear-gradient(to right, #22d3ee, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;';
    logoText.appendChild(els.appTitle);

    els.appDesc = document.createElement('span');
    els.appDesc.style.cssText = 'font-size: 13px; color: #a1a1aa; font-weight: 500;';
    logoText.appendChild(els.appDesc);

    const headerRight = document.createElement('div');
    headerRight.style.cssText = 'display: flex; align-items: center; gap: 16px; flex-wrap: wrap;';
    header.appendChild(headerRight);

    // Language selector
    const langContainer = document.createElement('div');
    langContainer.style.cssText = 'display: flex; gap: 8px; font-size: 20px;';
    [
        { id: 'en', flag: '🇬🇧' },
        { id: 'tr', flag: '🇹🇷' },
        { id: 'es', flag: '🇪🇸' }
    ].forEach(l => {
        const flagSpan = document.createElement('span');
        flagSpan.textContent = l.flag;
        flagSpan.style.cssText = 'cursor: pointer; opacity: 0.6; transition: opacity 0.2s;';
        flagSpan.addEventListener('mouseenter', () => flagSpan.style.opacity = '1');
        flagSpan.addEventListener('mouseleave', () => { if (lang !== l.id) flagSpan.style.opacity = '0.6'; });
        flagSpan.addEventListener('click', () => {
            lang = l.id;
            Array.from(langContainer.children).forEach(c => c.style.opacity = '0.6');
            flagSpan.style.opacity = '1';
            updateTranslations();
        });
        if (l.id === lang) flagSpan.style.opacity = '1';
        langContainer.appendChild(flagSpan);
    });
    headerRight.appendChild(langContainer);

    els.devLink = document.createElement('a');
    els.devLink.href = 'https://www.instagram.com/miabeyefendi/';
    els.devLink.target = '_blank';
    els.devLink.style.cssText = 'color: #22d3ee; text-decoration: none; font-size: 14px; font-weight: 600; padding: 8px 16px; background: rgba(34, 211, 238, 0.1); border-radius: 8px; transition: background 0.2s;';
    headerRight.appendChild(els.devLink);

    els.githubLink = document.createElement('a');
    els.githubLink.href = 'https://github.com/Miabeyefendi/munfollow';
    els.githubLink.target = '_blank';
    els.githubLink.style.cssText = 'color: #fff; text-decoration: none; font-size: 14px; font-weight: 600; padding: 8px 16px; background: #27272a; border-radius: 8px; transition: background 0.2s; display: flex; align-items: center; gap: 8px;';
    els.githubLink.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg> <span class="gh-text"></span>`;
    els.githubText = els.githubLink.querySelector('.gh-text');
    headerRight.appendChild(els.githubLink);

    // MAIN
    const main = document.createElement('main');
    main.style.cssText = 'flex: 1; display: flex; padding: 24px; gap: 24px; max-width: 1400px; margin: 0 auto; width: 100%; box-sizing: border-box; flex-wrap: wrap;';
    app.appendChild(main);

    // SIDEBAR
    const sidebar = document.createElement('aside');
    sidebar.style.cssText = 'width: 320px; display: flex; flex-direction: column; gap: 20px; flex-shrink: 0;';
    main.appendChild(sidebar);

    // Filters Panel
    const filtersPanel = document.createElement('div');
    filtersPanel.style.cssText = 'background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px;';
    sidebar.appendChild(filtersPanel);

    els.filtersGroup = document.createElement('h2');
    els.filtersGroup.style.cssText = 'margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #fff;';
    filtersPanel.appendChild(els.filtersGroup);

    const filterWrapper = document.createElement('div');
    filterWrapper.style.cssText = 'margin-bottom: 12px;';
    els.filterLabel = document.createElement('label');
    els.filterLabel.style.cssText = 'display: block; font-size: 13px; color: #e4e4e7; margin-bottom: 6px; font-weight: 500;';
    filterWrapper.appendChild(els.filterLabel);

    const filterSelect = document.createElement('select');
    filterSelect.style.cssText = 'width: 100%; padding: 8px 12px; background: #09090b; border: 1px solid #3f3f46; border-radius: 6px; color: #fff; font-size: 14px; outline: none; cursor: pointer;';
    ['ALL', 'NON_FOLLOWERS', 'MUTUALS', 'VERIFIED', 'PRIVATE', 'NO_PIC', 'CLOSE_FRIENDS'].forEach(val => {
        const op = document.createElement('option');
        op.value = val;
        filterSelect.appendChild(op);
    });
    filterWrapper.appendChild(filterSelect);
    filtersPanel.appendChild(filterWrapper);

    const sortWrapper = document.createElement('div');
    sortWrapper.style.cssText = 'margin-bottom: 16px;';
    els.sortLabel = document.createElement('label');
    els.sortLabel.style.cssText = 'display: block; font-size: 13px; color: #e4e4e7; margin-bottom: 6px; font-weight: 500;';
    sortWrapper.appendChild(els.sortLabel);

    const sortSelect = document.createElement('select');
    sortSelect.style.cssText = 'width: 100%; padding: 8px 12px; background: #09090b; border: 1px solid #3f3f46; border-radius: 6px; color: #fff; font-size: 14px; outline: none; cursor: pointer;';
    ['NEWEST', 'OLDEST'].forEach(val => {
        const op = document.createElement('option');
        op.value = val;
        sortSelect.appendChild(op);
    });
    sortWrapper.appendChild(sortSelect);
    filtersPanel.appendChild(sortWrapper);

    els.scanBtn = document.createElement('button');
    els.scanBtn.style.cssText = 'width: 100%; padding: 12px; background: #2563eb; color: #fff; border: none; border-radius: 8px; font-weight: 600; font-size: 14px; cursor: pointer; transition: background 0.2s;';
    els.scanBtn.addEventListener('mouseenter', () => { if (!isScanning) els.scanBtn.style.background = '#1d4ed8'; });
    els.scanBtn.addEventListener('mouseleave', () => { if (!isScanning) els.scanBtn.style.background = '#2563eb'; });
    filtersPanel.appendChild(els.scanBtn);

    // Stats Panel
    const statsPanel = document.createElement('div');
    statsPanel.style.cssText = 'background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px;';
    sidebar.appendChild(statsPanel);

    els.statsGroup = document.createElement('h2');
    els.statsGroup.style.cssText = 'margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #fff;';
    statsPanel.appendChild(els.statsGroup);

    const statsContent = document.createElement('div');
    statsContent.style.cssText = 'display: flex; flex-direction: column; gap: 8px; font-size: 14px; color: #e4e4e7;';

    const mkStatRow = (lblEl, id, color) => {
        const row = document.createElement('div');
        row.style.cssText = 'display: flex; justify-content: space-between;';
        const val = document.createElement('strong');
        val.id = id;
        val.style.color = color || '#fff';
        val.textContent = '0';
        row.appendChild(lblEl);
        row.appendChild(val);
        statsContent.appendChild(row);
        return val;
    };

    els.statTotalL = document.createElement('span');
    els.statNonFollowersL = document.createElement('span');
    els.statMutualsL = document.createElement('span');
    els.statSelectedL = document.createElement('span');
    els.statSuccessL = document.createElement('span');

    const vTotal = mkStatRow(els.statTotalL, 'stat-total', '#fff');
    const vNonFollowers = mkStatRow(els.statNonFollowersL, 'stat-nonfollowers', '#f43f5e');
    const vMutuals = mkStatRow(els.statMutualsL, 'stat-mutuals', '#a78bfa');
    const vSelected = mkStatRow(els.statSelectedL, 'stat-selected', '#22d3ee');
    const vSuccess = mkStatRow(els.statSuccessL, 'stat-success', '#10b981');
    statsPanel.appendChild(statsContent);

    // Settings Panel
    const settingsPanel = document.createElement('div');
    settingsPanel.style.cssText = 'background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; padding: 20px;';
    sidebar.appendChild(settingsPanel);

    els.antiBanGroup = document.createElement('h2');
    els.antiBanGroup.style.cssText = 'margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #fff;';
    settingsPanel.appendChild(els.antiBanGroup);

    function createInput(labelObj, id, defaultValue) {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'margin-bottom: 12px;';
        labelObj.style.cssText = 'display: block; font-size: 13px; color: #e4e4e7; margin-bottom: 6px; font-weight: 500;';
        wrapper.appendChild(labelObj);

        const input = document.createElement('input');
        input.type = 'number';
        input.id = id;
        input.value = defaultValue;
        input.style.cssText = 'width: 100%; padding: 8px 12px; background: #09090b; border: 1px solid #3f3f46; border-radius: 6px; color: #fff; font-size: 14px; box-sizing: border-box; outline: none;';
        input.addEventListener('focus', () => input.style.borderColor = '#22d3ee');
        input.addEventListener('blur', () => input.style.borderColor = '#3f3f46');
        wrapper.appendChild(input);

        settingsPanel.appendChild(wrapper);
        return input;
    }

    els.minDelayL = document.createElement('label');
    els.maxDelayL = document.createElement('label');
    els.pauseCountL = document.createElement('label');
    els.pauseDurationL = document.createElement('label');

    const minDelayInput = createInput(els.minDelayL, 'minDelay', 3);
    const maxDelayInput = createInput(els.maxDelayL, 'maxDelay', 8);
    const autoPauseCountInput = createInput(els.pauseCountL, 'pauseCount', 50);
    const autoPauseDurationInput = createInput(els.pauseDurationL, 'pauseDuration', 300);

    // Unfollow Action Panel
    const actionPanel = document.createElement('div');
    actionPanel.style.cssText = 'background-color: #18181b; border: 1px solid #ed143d; border-radius: 12px; padding: 20px; margin-top: auto;';
    sidebar.appendChild(actionPanel);

    els.unfollowBtn = document.createElement('button');
    els.unfollowBtn.disabled = true;
    els.unfollowBtn.style.cssText = 'width: 100%; padding: 14px; background: #e11d48; color: #fff; border: none; border-radius: 8px; font-weight: bold; font-size: 15px; cursor: not-allowed; opacity: 0.5; transition: all 0.2s;';
    actionPanel.appendChild(els.unfollowBtn);

    // CONTENT AREA
    const contentArea = document.createElement('div');
    contentArea.style.cssText = 'flex: 1; min-width: 400px; display: flex; flex-direction: column; background-color: #18181b; border: 1px solid #27272a; border-radius: 12px; overflow: hidden;';
    main.appendChild(contentArea);

    const contentHeader = document.createElement('div');
    contentHeader.style.cssText = 'padding: 16px 24px; border-bottom: 1px solid #27272a; display: flex; justify-content: space-between; align-items: center; background: #09090b;';
    contentArea.appendChild(contentHeader);

    els.userListTitle = document.createElement('h2');
    els.userListTitle.style.cssText = 'margin: 0; font-size: 16px; font-weight: 600; color: #fff;';
    contentHeader.appendChild(els.userListTitle);

    const selectAllLabel = document.createElement('label');
    selectAllLabel.style.cssText = 'display: flex; align-items: center; gap: 8px; font-size: 14px; color: #e4e4e7; cursor: pointer; user-select: none;';
    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.disabled = true;
    selectAllCheckbox.style.cssText = 'width: 16px; height: 16px; cursor: pointer; accent-color: #22d3ee;';
    selectAllLabel.appendChild(selectAllCheckbox);
    els.selectAllText = document.createTextNode('');
    selectAllLabel.appendChild(els.selectAllText);
    contentHeader.appendChild(selectAllLabel);

    const listContainer = document.createElement('div');
    listContainer.style.cssText = 'flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 12px;';
    contentArea.appendChild(listContainer);

    els.emptyState = document.createElement('div');
    els.emptyState.style.cssText = 'text-align: center; color: #a1a1aa; margin-top: 100px; font-size: 15px; padding: 0 20px;';

    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = 'height: 4px; background: #27272a; width: 100%; display: none;';
    const progressBar = document.createElement('div');
    progressBar.style.cssText = 'height: 100%; width: 0%; background: #22d3ee; transition: width 0.3s;';
    progressContainer.appendChild(progressBar);
    contentArea.insertBefore(progressContainer, listContainer);

    function updateTranslations() {
        els.appTitle.textContent = t('appTitle');
        els.appDesc.textContent = t('appDesc');
        els.antiBanGroup.textContent = t('antiBanGroup');
        els.minDelayL.textContent = t('minDelay');
        els.maxDelayL.textContent = t('maxDelay');
        els.pauseCountL.textContent = t('pauseCount');
        els.pauseDurationL.textContent = t('pauseDuration');

        if (isScanning) els.scanBtn.textContent = t('scanning');
        else if (allUsers.length > 0) els.scanBtn.textContent = t('rescanBtn');
        else els.scanBtn.textContent = t('scanBtn');

        els.statsGroup.textContent = t('statsGroup');
        els.statTotalL.textContent = t('statTotal');
        els.statNonFollowersL.textContent = t('statNonFollowers');
        els.statMutualsL.textContent = t('statMutuals');
        els.statSelectedL.textContent = t('statSelected');
        els.statSuccessL.textContent = t('statSuccess');

        els.filtersGroup.textContent = t('filtersGroup');
        els.filterLabel.textContent = t('filterLabel');
        els.sortLabel.textContent = t('sortLabel');

        filterSelect.options[0].text = t('fAll');
        filterSelect.options[1].text = t('fNonFollowers');
        filterSelect.options[2].text = t('fMutuals');
        filterSelect.options[3].text = t('fVerified');
        filterSelect.options[4].text = t('fPrivate');
        filterSelect.options[5].text = t('fNoPic');
        filterSelect.options[6].text = t('fCloseFriends');

        sortSelect.options[0].text = t('sNewest');
        sortSelect.options[1].text = t('sOldest');

        if (isUnfollowing) els.unfollowBtn.textContent = els.unfollowBtn.dataset.paused ? t('pauseStatus') : t('unfollowing');
        else els.unfollowBtn.textContent = t('unfollowBtn');

        els.selectAllText.textContent = t('selectAll');
        els.userListTitle.textContent = t('userList');
        els.devLink.textContent = t('devLink');
        els.githubText.textContent = t('githubLink');

        if (allUsers.length === 0 && !isScanning) {
            els.emptyState.innerHTML = t('emptyList') + '<br><br><a href="https://www.instagram.com/miabeyefendi/" target="_blank" style="color: #22d3ee; text-decoration: none;">' + t('devLink') + '</a>';
        }
    }

    updateTranslations();

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const randomDelay = (min, max) => sleep(Math.floor(Math.random() * (max - min + 1) + min) * 1000);

    function updateStats() {
        vTotal.textContent = allUsers.length;
        vNonFollowers.textContent = nonFollowersCount;
        vMutuals.textContent = mutualsCount;
        vSelected.textContent = selectedUserIds.size;
        vSuccess.textContent = successCount;

        if (selectedUserIds.size > 0 && !isScanning && !isUnfollowing) {
            els.unfollowBtn.disabled = false;
            els.unfollowBtn.style.opacity = '1';
            els.unfollowBtn.style.cursor = 'pointer';
            els.unfollowBtn.onmouseenter = () => { if (!els.unfollowBtn.disabled) els.unfollowBtn.style.background = '#be123c'; };
            els.unfollowBtn.onmouseleave = () => { if (!els.unfollowBtn.disabled) els.unfollowBtn.style.background = '#e11d48'; };
        } else {
            els.unfollowBtn.disabled = true;
            els.unfollowBtn.style.opacity = '0.5';
            els.unfollowBtn.style.cursor = 'not-allowed';
            els.unfollowBtn.style.background = '#e11d48';
        }

        // Handle select all checkbox state
        if (displayedUsers.length > 0) {
            const allSelected = displayedUsers.every(u => selectedUserIds.has(u.id));
            selectAllCheckbox.checked = allSelected;
        } else {
            selectAllCheckbox.checked = false;
        }
    }

    function applyFilterAndSort() {
        const f = filterSelect.value;
        const s = sortSelect.value;

        let filtered = allUsers.filter(user => {
            if (f === 'ALL') return true;
            if (f === 'NON_FOLLOWERS') return !user.follows_viewer;
            if (f === 'MUTUALS') return user.follows_viewer;
            if (f === 'VERIFIED') return user.is_verified;
            if (f === 'PRIVATE') return user.is_private;
            if (f === 'NO_PIC') return user.has_anonymous_profile_picture || (user.profile_pic_url && (user.profile_pic_url.includes('11906329_960233084022564_1448528159_a.jpg') || user.profile_pic_url.includes('44884218_345707102882519')));
            if (f === 'CLOSE_FRIENDS') return closeFriendsIds.has(String(user.id));
            return true;
        });

        if (s === 'OLDEST') {
            filtered = [...filtered].reverse();
        }

        displayedUsers = filtered;
        renderList();
        updateStats();
    }

    filterSelect.addEventListener('change', applyFilterAndSort);
    sortSelect.addEventListener('change', applyFilterAndSort);

    function renderList() {
        listContainer.innerHTML = '';
        if (allUsers.length === 0 && !isScanning) {
            updateTranslations(); // re-evaluates empty state
            listContainer.appendChild(els.emptyState);
            return;
        }

        if (displayedUsers.length === 0) {
            const msg = document.createElement('div');
            msg.style.cssText = 'text-align: center; color: #a1a1aa; margin-top: 50px;';
            msg.textContent = 'No users match the current filter.';
            listContainer.appendChild(msg);
            return;
        }

        displayedUsers.forEach(user => {
            const item = document.createElement('label');
            item.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #09090b; border: 1px solid #27272a; border-radius: 8px; cursor: pointer; transition: border-color 0.2s;';
            item.addEventListener('mouseenter', () => item.style.borderColor = '#3f3f46');
            item.addEventListener('mouseleave', () => item.style.borderColor = '#27272a');

            const left = document.createElement('div');
            left.style.cssText = 'display: flex; align-items: center; gap: 16px;';

            const img = document.createElement('img');
            img.src = user.profile_pic_url || '';
            img.style.cssText = 'width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 1px solid #27272a;';
            left.appendChild(img);

            const info = document.createElement('div');
            info.style.cssText = 'display: flex; flex-direction: column;';

            const username = document.createElement('a');
            username.href = `/${user.username}`;
            username.target = '_blank';
            username.textContent = user.username;
            username.style.cssText = 'color: #fff; font-weight: 600; font-size: 14px; text-decoration: none;';
            username.addEventListener('mouseenter', () => username.style.textDecoration = 'underline');
            username.addEventListener('mouseleave', () => username.style.textDecoration = 'none');
            info.appendChild(username);

            const fullname = document.createElement('span');
            fullname.textContent = user.full_name || '';
            fullname.style.cssText = 'color: #a1a1aa; font-size: 12px; margin-top: 2px; text-transform: capitalize;';
            info.appendChild(fullname);

            left.appendChild(info);
            item.appendChild(left);

            const right = document.createElement('div');
            right.style.cssText = 'display: flex; align-items: center; gap: 12px;';

            if (user.is_verified) {
                const badge = document.createElement('span');
                badge.textContent = '✓';
                badge.style.cssText = 'background: #3b82f6; color: #fff; font-size: 10px; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: bold;';
                badge.title = 'Verified';
                right.appendChild(badge);
            }
            if (user.is_private) {
                const lock = document.createElement('span');
                lock.textContent = '🔒';
                lock.style.cssText = 'font-size: 12px;';
                lock.title = 'Private';
                right.appendChild(lock);
            }

            const relationship = document.createElement('span');
            relationship.style.cssText = 'font-size: 11px; padding: 4px 8px; border-radius: 4px; font-weight: 600;';
            if (user.follows_viewer) {
                relationship.textContent = 'Mutual';
                relationship.style.background = 'rgba(167, 139, 250, 0.1)';
                relationship.style.color = '#a78bfa';
            } else {
                relationship.textContent = 'Not Following';
                relationship.style.background = 'rgba(244, 63, 94, 0.1)';
                relationship.style.color = '#f43f5e';
            }
            right.appendChild(relationship);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = selectedUserIds.has(user.id);
            checkbox.style.cssText = 'width: 18px; height: 18px; cursor: pointer; accent-color: #22d3ee; margin-left: 8px;';
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    selectedUserIds.add(user.id);
                } else {
                    selectedUserIds.delete(user.id);
                }
                updateStats();
            });

            right.appendChild(checkbox);
            item.appendChild(right);
            listContainer.appendChild(item);
        });
    }

    selectAllCheckbox.addEventListener('change', (e) => {
        if (e.target.checked) {
            displayedUsers.forEach(u => selectedUserIds.add(u.id));
        } else {
            displayedUsers.forEach(u => selectedUserIds.delete(u.id));
        }
        renderList();
        updateStats();
    });

    async function fetchFollowing(cursor = '') {
        const url = cursor
            ? `https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables={"id":"${userId}","include_reel":"true","fetch_mutual":"false","first":"50","after":"${cursor}"}`
            : `https://www.instagram.com/graphql/query/?query_hash=3dec7e2c57367ef3da3d987d89f9dbc8&variables={"id":"${userId}","include_reel":"true","fetch_mutual":"false","first":"50"}`;

        try {
            const res = await fetch(url);
            const json = await res.json();
            return json.data.user.edge_follow;
        } catch (err) {
            console.error(err);
            return null;
        }
    }

    async function fetchCloseFriends() {
        try {
            const res = await fetch('https://www.instagram.com/api/v1/friendships/besties/', {
                headers: {
                    'x-ig-app-id': '936619743392459',
                    'x-csrftoken': csrfToken
                }
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.users) {
                    data.users.forEach(u => closeFriendsIds.add(String(u.pk || u.pk_id || u.id)));
                }
            }
        } catch (e) {
            console.error('Error fetching close friends:', e);
        }
    }

    els.scanBtn.addEventListener('click', async () => {
        if (isScanning) return;
        isScanning = true;
        els.scanBtn.disabled = true;
        updateTranslations();
        els.scanBtn.style.opacity = '0.5';

        allUsers = [];
        displayedUsers = [];
        nonFollowersCount = 0;
        mutualsCount = 0;
        selectedUserIds.clear();
        closeFriendsIds.clear();
        updateStats();

        await fetchCloseFriends();

        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        listContainer.innerHTML = `<div style="text-align: center; color: #22d3ee; margin-top: 100px; font-weight: 500;">${t('scanning')}</div>`;

        let hasNextPage = true;
        let cursor = '';
        let totalCount = 0;

        while (hasNextPage) {
            const data = await fetchFollowing(cursor);
            if (!data) {
                alert('Error fetching data. Check your connection or try refreshing.');
                break;
            }

            if (totalCount === 0) totalCount = data.count;

            data.edges.forEach(edge => {
                const user = edge.node;
                allUsers.push(user);
                if (!user.follows_viewer) {
                    nonFollowersCount++;
                } else {
                    mutualsCount++;
                }
            });

            progressBar.style.width = `${(allUsers.length / totalCount) * 100}%`;
            updateStats();

            hasNextPage = data.page_info.has_next_page;
            cursor = data.page_info.end_cursor;

            if (hasNextPage) {
                await sleep(Math.floor(Math.random() * 1000) + 1000);
            }
        }

        isScanning = false;
        els.scanBtn.disabled = false;
        els.scanBtn.style.opacity = '1';
        selectAllCheckbox.disabled = false;

        updateTranslations();
        applyFilterAndSort();
    });

    els.unfollowBtn.addEventListener('click', async () => {
        if (isUnfollowing || selectedUserIds.size === 0) return;

        if (!confirm(t('confirmUnfollow'))) return;

        isUnfollowing = true;
        els.unfollowBtn.disabled = true;
        selectAllCheckbox.disabled = true;
        updateTranslations();

        const minDelay = parseInt(minDelayInput.value) || 3;
        const maxDelay = parseInt(maxDelayInput.value) || 8;
        const pauseCount = parseInt(autoPauseCountInput.value) || 50;
        const pauseDuration = parseInt(autoPauseDurationInput.value) || 300;

        const usersToUnfollow = Array.from(selectedUserIds);
        let processedCount = 0;

        progressContainer.style.display = 'block';
        progressBar.style.width = '0%';
        progressBar.style.background = '#e11d48';

        for (let i = 0; i < usersToUnfollow.length; i++) {
            const uid = usersToUnfollow[i];

            try {
                const res = await fetch(`https://www.instagram.com/web/friendships/${uid}/unfollow/`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/x-www-form-urlencoded',
                        'x-csrftoken': csrfToken
                    }
                });

                if (res.ok) {
                    successCount++;

                    selectedUserIds.delete(uid);
                    allUsers = allUsers.filter(u => u.id !== uid);
                    const userObj = displayedUsers.find(u => u.id === uid);
                    if (userObj) {
                        if (!userObj.follows_viewer) nonFollowersCount--;
                        else mutualsCount--;
                    }
                    applyFilterAndSort(); // re-render list inline safely
                } else {
                    console.error('Failed to unfollow', uid);
                }
            } catch (err) {
                console.error('Error unfollowing', uid, err);
            }

            processedCount++;
            progressBar.style.width = `${(processedCount / usersToUnfollow.length) * 100}%`;
            updateStats();

            if (i < usersToUnfollow.length - 1) {
                if ((i + 1) % pauseCount === 0) {
                    els.unfollowBtn.dataset.paused = "true";
                    updateTranslations();
                    await sleep(pauseDuration * 1000);
                    els.unfollowBtn.dataset.paused = "";
                    updateTranslations();
                } else {
                    await randomDelay(minDelay, maxDelay);
                }
            }
        }

        isUnfollowing = false;
        selectAllCheckbox.disabled = false;
        progressBar.style.background = '#22d3ee';
        updateTranslations();
        updateStats(); // To reset unfollow button state based on remaining selections

        setTimeout(() => alert(t('processDone') + successCount), 500);
    });

})();

