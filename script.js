// STEP 2 -- FILE STATE MODEL
const files = {
    'index.html': { lang: 'html', content: '<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n    <section class="content">\n      <h1>mini<span>coder</span></h1>\n      <p>the minimalist code environment.</p>\n    </section>\n  </div>\n</body>\n</html>', isDirty: false },
    'style.css':  { lang: 'css', content: ':root {\n   --bg-base: #121212;\n  --text-primary: #e0e0e0;\n  --text-muted: #a0a0a0;\n  --accent: #3b82f6;\n  }\n\n  body {\n    margin: 0;\n    background: var(--bg-base);\n    color: var(--text-primary);\n    font-family: \'Segoe UI\', sans-serif;\n    display: flex; height: 100vh;\n    overflow: hidden;\n  }\n  \n\n  .content { \n    flex: 1;\n    display: flex;\n    flex-direction: column; \n    align-items: center;\n    justify-content: center;\n    text-align: center;\n  }\n  \n\n  h1 {\n    font-size: 2.5rem;\n    font-weight: 300;\n    margin: 0;\n  }\n  \n\n  span {\n    color: var(--accent);\n  }\n  \n  \n  p {\n    color: var(--text-muted);\n    margin: 10px 0 25px;\n    font-size: 0.9rem;\n  }', isDirty: false },
    'script.js':  { lang: 'javascript', content: 'console.log("MiniCoder initialized!");', isDirty: false },
};
let activeFile = 'index.html';
const models = {};

// DOM Elements
const fileListEl = document.getElementById('file-list');
const tabsEl = document.getElementById('tabs');
const consoleEl = document.getElementById('console-output');
const previewEl = document.getElementById('preview');
const btnAddFile = document.getElementById('btn-add-file');
const newFileContainer = document.getElementById('new-file-container');
const newFileInput = document.getElementById('new-file-input');
const btnClearConsole = document.getElementById('btn-clear-console');
const btnTogglePreview = document.getElementById('toggle-preview');
const btnToggleConsole = document.getElementById('toggle-console');
const btnToggleSidebar = document.getElementById('toggle-sidebar');
const sidebarOverlay = document.getElementById('sidebar-overlay');
const btnExportZip = document.getElementById('export-zip');
const btnImportZip = document.getElementById('import-zip');
const zipFileInput = document.getElementById('zip-file-input');
const resizer = document.getElementById('resizer');
const btnRefresh = document.getElementById('btn-refresh');
const resizerCurr = document.getElementById('resizer-curriculum');
const customModal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalMessage = document.getElementById('modal-message');
const btnModalCancel = document.getElementById('modal-cancel');
const btnModalConfirm = document.getElementById('modal-confirm');
const btnToggleCurriculum = document.getElementById('toggle-curriculum');
const curriculumPanel = document.getElementById('curriculum-panel');
const lessonListEl = document.getElementById('lesson-list');
const lessonViewerEl = document.getElementById('lesson-viewer');
const lessonNavContainer = document.querySelector('.lesson-navigation');
const btnBackToLessons = document.getElementById('btn-back-to-lessons');
const curriculumTitle = document.getElementById('curriculum-title');
const btnPrevLesson = document.getElementById('btn-prev-lesson');
const btnNextLesson = document.getElementById('btn-next-lesson');

// Keep track of open tabs (files currently in the tab bar)
let openTabs = Object.keys(files);

// Lessons Tree Structure
let curriculumTree = [];

async function loadCurriculumFromServer(path = 'curriculum/') {
    // Check if we are running on a local file system (file:// protocol)
    if (window.location.protocol === 'file:') {
        console.warn('MiniCoder: Dynamic curriculum loading requires a web server (e.g., http://localhost:8000).');
        return [{ 
            type: 'error', 
            message: 'Server Required', 
            detail: 'Please open MiniCoder through a local server (like http://localhost:8000) to load dynamic lessons.' 
        }];
    }

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const links = Array.from(doc.querySelectorAll('a'))
            .map(a => a.getAttribute('href'))
            .filter(href => href && !href.startsWith('?') && href !== '../' && href !== './');

        if (links.length === 0) {
            return [{ 
                type: 'error', 
                message: 'No Lessons Found', 
                detail: `The curriculum folder is empty or couldn't be indexed.` 
            }];
        }

        const tree = [];
        for (const link of links) {
            let cleanLink = link;
            if (cleanLink.startsWith('/')) {
                if (cleanLink.startsWith('/curriculum/')) {
                    cleanLink = cleanLink.replace('/curriculum/', '');
                }
            }
            
            const fullPath = path + (path.endsWith('/') ? '' : '/') + cleanLink;
            
            if (cleanLink.endsWith('/')) {
                const name = cleanLink.slice(0, -1).replace(/^[0-9]+-/, '').replace(/-/g, ' ');
                const children = await loadCurriculumFromServer(fullPath);
                // Only add if it has children or it's a valid folder structure
                if (children.length > 0) {
                    tree.push({ type: 'folder', name, children });
                }
            } else if (cleanLink.toLowerCase().endsWith('.md') || cleanLink.toLowerCase().endsWith('.dm')) {
                const title = cleanLink.replace(/\.(md|dm)$/i, '').replace(/^[0-9]+-/, '').replace(/-/g, ' ');
                tree.push({ type: 'file', title, path: fullPath, content: null });
            }
        }
        return tree;
    } catch (e) {
        console.error('Failed to load curriculum from server:', e);
        return [{ 
            type: 'error', 
            message: 'Load Error', 
            detail: 'Failed to connect to the curriculum directory. Make sure the server is running.' 
        }];
    }
}

// Horizontal resizing logic
let isResizing = false;
let isResizingCurr = false;
let animationFrameId = null;
let lastLayoutTime = 0;

resizer.onmousedown = (e) => {
    isResizing = true;
    document.body.classList.add('resizing');
    resizer.classList.add('active');
};

resizerCurr.onmousedown = (e) => {
    isResizingCurr = true;
    document.body.classList.add('resizing');
    resizerCurr.classList.add('active');
};

window.onmousemove = (e) => {
    if (!isResizing && !isResizingCurr) return;
    
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
    
    animationFrameId = requestAnimationFrame(() => {
        const mainEl = document.querySelector('main');
        const mainRect = mainEl.getBoundingClientRect();
        
        if (isResizing) {
            const sidebarWidth = document.body.classList.contains('hide-sidebar') ? 0 : 200;
            const resizerCurrWidth = document.body.classList.contains('hide-curriculum') ? 0 : 4;
            const curriculumWidth = document.body.classList.contains('hide-curriculum') ? 0 : (parseInt(getComputedStyle(mainEl).getPropertyValue('--curriculum-width')) || 300);
            
            const editorWidth = e.clientX - mainRect.left - sidebarWidth;
            const totalAvailableWidth = mainRect.width - sidebarWidth - 4 - resizerCurrWidth - curriculumWidth;
            
            if (editorWidth > 100 && editorWidth < totalAvailableWidth - 100) {
                const percentage = (editorWidth / totalAvailableWidth) * 100;
                mainEl.style.setProperty('--editor-ratio', `${percentage}%`);
                safeLayout();
            }
        } else if (isResizingCurr) {
            const currWidth = mainRect.right - e.clientX;
            if (currWidth > 150 && currWidth < mainRect.width - 400) {
                mainEl.style.setProperty('--curriculum-width', `${currWidth}px`);
                safeLayout();
            }
        }
        
        const now = Date.now();
        if (now - lastLayoutTime > 16) {
            safeLayout();
            lastLayoutTime = now;
        }
    });
};

window.onmouseup = () => {
    if (isResizing || isResizingCurr) {
        isResizing = false;
        isResizingCurr = false;
        document.body.classList.remove('resizing');
        resizer.classList.remove('active');
        resizerCurr.classList.remove('active');
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        safeLayout();
    }
};

// Utils
const isMobile = () => window.innerWidth <= 768;
const getExt = (name) => name.split('.').pop().toLowerCase();
const getLang = (ext) => {
    const map = { html: 'html', css: 'css', js: 'javascript', ts: 'typescript', json: 'json', md: 'markdown' };
    return map[ext] || 'plaintext';
};
const getIconClass = (ext) => {
    const map = {
        html: 'devicon-html5-plain colored',
        css: 'devicon-css3-plain colored',
        js: 'devicon-javascript-plain colored',
        ts: 'devicon-typescript-plain colored',
        json: 'devicon-json-plain colored',
        md: 'devicon-markdown-original colored'
    };
    return map[ext] || 'devicon-file-plain';
};

const safeLayout = () => {
    if (window.editor && typeof window.editor.layout === 'function') {
        window.editor.layout();
    }
};

// STEP 3 -- BOOTSTRAP MONACO
require.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs' } });
require(['vs/editor/editor.main'], () => {
    // Define custom charcoal theme
    monaco.editor.defineTheme('charcoal-dark', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#121212',
            'editor.lineHighlightBackground': '#1e1e1e',
            'editorCursor.foreground': '#3b82f6',
            'editor.selectionBackground': '#333333',
            'editor.inactiveSelectionBackground': '#222222'
        }
    });

    // Create models
    for (const [name, f] of Object.entries(files)) {
        models[name] = monaco.editor.createModel(f.content, f.lang);
    }

    // Initialize editor
    window.editor = monaco.editor.create(document.getElementById('editor'), {
        model: models[activeFile],
        theme: 'charcoal-dark',
        fontSize: 13,
        fontFamily: "'JetBrains Mono', monospace",
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        automaticLayout: false, // We handle layout manually for better control
        padding: { top: 10 }
    });

    // Listen for changes
    window.editor.onDidChangeModelContent(() => {
        const currentContent = window.editor.getValue();
        if (files[activeFile].content !== currentContent) {
            files[activeFile].isDirty = true;
            renderTabs();
        }
    });

    renderFileList();
    renderTabs();
    refreshPreview();
    
    // Initial layout call
    setTimeout(() => safeLayout(), 10);
});

// STEP 4 -- TABS & FILE ICONS
function renderFileList() {
    fileListEl.innerHTML = '';
    Object.keys(files).forEach(name => {
        const ext = getExt(name);
        const item = document.createElement('div');
        item.className = `file-item ${name === activeFile ? 'active' : ''}`;
        item.innerHTML = `
            <i class="file-icon ${getIconClass(ext)}"></i>
            <span style="flex:1">${name}</span>
            <div class="file-delete" title="Delete File" style="padding:4px; opacity:0.5; display:flex; align-items:center;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </div>
        `;
        item.onclick = (e) => {
            if (e.target.closest('.file-delete')) {
                deleteFile(name);
            } else {
                switchFile(name);
            }
        };
        fileListEl.appendChild(item);
    });
}

function showModal(title, message) {
    modalTitle.textContent = title;
    modalMessage.textContent = message;
    customModal.classList.remove('hidden');
    
    return new Promise((resolve) => {
        const onConfirm = () => {
            cleanup();
            resolve(true);
        };
        const onCancel = () => {
            cleanup();
            resolve(false);
        };
        const onOverlayClick = (e) => {
            if (e.target === customModal) {
                onCancel();
            }
        };
        const cleanup = () => {
            btnModalConfirm.removeEventListener('click', onConfirm);
            btnModalCancel.removeEventListener('click', onCancel);
            customModal.removeEventListener('click', onOverlayClick);
            customModal.classList.add('hidden');
        };
        btnModalConfirm.addEventListener('click', onConfirm);
        btnModalCancel.addEventListener('click', onCancel);
        customModal.addEventListener('click', onOverlayClick);
    });
}

async function deleteFile(name) {
    if (Object.keys(files).length <= 1) {
        alert("Cannot delete the last file.");
        return;
    }

    const confirmed = await showModal("Delete File", `Are you sure you want to delete "${name}"?`);
    if (!confirmed) return;

    // Remove from files and models
    delete files[name];
    if (models[name]) {
        models[name].dispose();
        delete models[name];
    }

    // Remove from openTabs
    const tabIndex = openTabs.indexOf(name);
    if (tabIndex !== -1) {
        openTabs.splice(tabIndex, 1);
    }

    // If active, switch to another
    if (activeFile === name) {
        const remaining = Object.keys(files);
        if (openTabs.length > 0) {
            switchFile(openTabs[0]);
        } else {
            switchFile(remaining[0]);
        }
    }

    renderFileList();
    renderTabs();
    refreshPreview();
}

function renderTabs() {
    tabsEl.innerHTML = '';
    openTabs.forEach(name => {
        const ext = getExt(name);
        const file = files[name];
        const tab = document.createElement('div');
        tab.className = `tab ${name === activeFile ? 'active' : ''} ${file.isDirty ? 'dirty' : ''}`;
        tab.innerHTML = `
            <i class="file-icon ${getIconClass(ext)}"></i>
            <span>${name}</span>
            <div class="tab-indicator"></div>
            <div class="tab-close" title="Close">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </div>
        `;
        tab.onclick = (e) => {
            if (e.target.closest('.tab-close')) {
                closeFile(name);
            } else {
                switchFile(name);
            }
        };
        tabsEl.appendChild(tab);
    });
}

function switchFile(name) {
    if (!openTabs.includes(name)) {
        openTabs.push(name);
    }
    activeFile = name;
    window.editor.setModel(models[name]);
    renderFileList();
    renderTabs();
    document.getElementById('status-left').textContent = `Editing ${name}`;
    
    // Auto-hide sidebar on mobile after selection
    if (isMobile()) {
        document.body.classList.remove('show-sidebar');
    }
}

function closeFile(name) {
    const index = openTabs.indexOf(name);
    if (index === -1) return;
    
    openTabs.splice(index, 1);
    
    if (activeFile === name) {
        if (openTabs.length > 0) {
            const nextTab = openTabs[Math.min(index, openTabs.length - 1)];
            switchFile(nextTab);
        } else {
            activeFile = null;
            // Create a temporary empty model to clear the editor
            const emptyModel = monaco.editor.createModel('', 'plaintext');
            window.editor.setModel(emptyModel);
        }
    }
    renderTabs();
}

// STEP 5 -- LIVE PREVIEW
function refreshPreview() {
    const html = files['index.html']?.content || '';
    const css = files['style.css']?.content || '';
    const js = files['script.js']?.content || '';
    
    // Collect other JS/CSS files if they exist (optional but good)
    let extraStyles = '';
    let extraScripts = '';
    Object.entries(files).forEach(([name, f]) => {
        if (name === 'index.html' || name === 'style.css' || name === 'script.js') return;
        if (f.lang === 'css') extraStyles += `\n/* ${name} */\n${f.content}`;
        if (f.lang === 'javascript') extraScripts += `\n// ${name}\n${f.content}`;
    });

    const scriptEnd = '</' + 'script>';
    const doc = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>${css}${extraStyles}</style>
</head>
<body>
    ${html}
    <script>
        (function() {
            const post = (l, a) => parent.postMessage({
                type: 'console',
                level: l,
                args: a.map(arg => {
                    try {
                        return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
                    } catch(e) { return String(arg); }
                })
            }, '*');
            
            console.log = (...a) => post('log', a);
            console.warn = (...a) => post('warn', a);
            console.error = (...a) => post('error', a);
            window.onerror = (m, s, l, c, e) => post('error', [m + ' (line ' + l + ')']);
            
            // Capture unhandled rejections
            window.onunhandledrejection = (e) => post('error', ['Unhandled Promise Rejection: ' + e.reason]);
        })();
    ${scriptEnd}
    <script>${js}${extraScripts}${scriptEnd}
</body>
</html>`;
    previewEl.srcdoc = doc;
}

// STEP 6 -- CONSOLE PANEL
window.addEventListener('message', ({ data }) => {
    if (data?.type !== 'console') return;
    const line = document.createElement('div');
    line.className = 'console-line console-' + data.level;
    line.textContent = `[${data.level.toUpperCase()}] ${data.args.join(' ')}`;
    consoleEl.appendChild(line);
    consoleEl.scrollTop = consoleEl.scrollHeight;
});

btnClearConsole.onclick = () => {
    consoleEl.innerHTML = '';
};

// Panel Toggles
btnTogglePreview.onclick = () => {
            document.body.classList.toggle('hide-preview');
            // Allow transition to finish before layout
            setTimeout(() => safeLayout(), 160);
        };

        btnToggleConsole.onclick = () => {
            document.body.classList.toggle('hide-console');
            setTimeout(() => safeLayout(), 10);
        };

        btnToggleSidebar.onclick = () => {
            if (isMobile()) {
                document.body.classList.toggle('show-sidebar');
            } else {
                document.body.classList.toggle('hide-sidebar');
            }
            setTimeout(() => safeLayout(), 310);
        };

        btnToggleCurriculum.onclick = async () => {
            const isHidden = document.body.classList.toggle('hide-curriculum');
            curriculumPanel.classList.toggle('hidden', isHidden);
            if (!isHidden) {
                curriculumTree = await loadCurriculumFromServer();
                renderLessonList();
            }
            setTimeout(() => safeLayout(), 160);
        };

        btnBackToLessons.onclick = () => {
            lessonListEl.classList.remove('hidden');
            lessonViewerEl.classList.add('hidden');
            lessonNavContainer.classList.add('hidden');
            btnBackToLessons.classList.add('hidden');
            curriculumTitle.textContent = "Lessons";
            renderLessonList();
        };

        sidebarOverlay.onclick = () => {
            document.body.classList.remove('show-sidebar');
        };

        // Export ZIP
        btnExportZip.onclick = () => {
            const zip = new JSZip();
            Object.entries(files).forEach(([name, f]) => {
                zip.file(name, f.content);
            });
            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, 'minicoder-project.zip');
            });
        };

        // Import ZIP
        btnImportZip.onclick = () => zipFileInput.click();

        btnRefresh.onclick = () => {
            files[activeFile].content = window.editor.getValue();
            files[activeFile].isDirty = false;
            refreshPreview();
            renderTabs();
            document.getElementById('status-left').textContent = `Saved & Refreshed ${activeFile}`;
            setTimeout(() => {
                document.getElementById('status-left').textContent = `Editing ${activeFile}`;
            }, 2000);
        };

        zipFileInput.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = async (event) => {
                const jszip = new JSZip();
                const zip = await jszip.loadAsync(event.target.result);
                
                // Clear existing models
                Object.values(models).forEach(m => m.dispose());
                
                // Reset state
                for (const key in files) delete files[key];
                for (const key in models) delete models[key];
                openTabs = [];

                const promises = [];
                zip.forEach((relativePath, zipEntry) => {
                    if (!zipEntry.dir) {
                        promises.push(zipEntry.async('string').then(content => {
                            const name = relativePath;
                    const ext = getExt(name);
                    const lang = getLang(ext);
                    files[name] = { lang, content, isDirty: false };
                    models[name] = monaco.editor.createModel(content, lang);
                }));
                    }
                });

                await Promise.all(promises);
                
                const fileNames = Object.keys(files);
                if (fileNames.length > 0) {
                    const first = fileNames.includes('index.html') ? 'index.html' : fileNames[0];
                    switchFile(first);
                }
                
                renderFileList();
                refreshPreview();
            };
            reader.readAsArrayBuffer(file);
            zipFileInput.value = ''; // Reset input
        };

        // Keyboard Shortcuts
        window.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                // Save content and refresh
                files[activeFile].content = window.editor.getValue();
                files[activeFile].isDirty = false;
                refreshPreview();
                renderTabs();
                document.getElementById('status-left').textContent = `Saved ${activeFile}`;
                setTimeout(() => {
                    document.getElementById('status-left').textContent = `Editing ${activeFile}`;
                }, 2000);
            }
        });

        // Warning before site refresh/exit
        window.onbeforeunload = (e) => {
            e.preventDefault();
            return "You have unsaved changes. Are you sure you want to leave?";
        };

        // STEP 7 -- ADD NEW FILE
        btnAddFile.onclick = () => {
            newFileContainer.classList.toggle('hidden');
            if (!newFileContainer.classList.contains('hidden')) {
                newFileInput.focus();
            }
        };

        newFileInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                const name = newFileInput.value.trim();
                if (name) {
                    if (files[name]) {
                        alert('File already exists');
                        return;
                    }
                    if (!name.includes('.')) {
                        alert('Please include an extension (e.g., .js, .css)');
                        return;
                    }
                    addFile(name);
                    newFileInput.value = '';
                    newFileContainer.classList.add('hidden');
                }
            } else if (e.key === 'Escape') {
                newFileContainer.classList.add('hidden');
                newFileInput.value = '';
            }
        };

function renderLessonList(tree = curriculumTree, container = lessonListEl) {
      container.innerHTML = '';
      tree.forEach(node => {
          if (node.type === 'folder') {
              const folder = document.createElement('div');
              folder.className = 'lesson-folder';
              folder.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="transition: transform 0.2s;"><polyline points="9 18 15 12 9 6"></polyline></svg> ${node.name}`;
              
              const content = document.createElement('div');
              content.className = 'lesson-folder-content hidden';
              
              folder.onclick = () => {
                  const isExpanded = folder.classList.toggle('expanded');
                  content.classList.toggle('hidden');
                  folder.querySelector('svg').style.transform = isExpanded ? 'rotate(90deg)' : 'rotate(0deg)';
              };
              
              container.appendChild(folder);
              container.appendChild(content);
              renderLessonList(node.children, content);
          } else if (node.type === 'file') {
                     const item = document.createElement('div');
                     item.className = 'lesson-item';
                     item.innerHTML = `
                         <span>${node.title}</span>
                     `;
                     item.onclick = () => openLesson(node);
                     container.appendChild(item);
                 } else if (node.type === 'error') {
                     const errorBox = document.createElement('div');
                     errorBox.style.padding = '15px';
                     errorBox.style.background = 'rgba(255, 82, 82, 0.1)';
                     errorBox.style.border = '1px solid var(--err)';
                     errorBox.style.borderRadius = '6px';
                     errorBox.style.marginTop = '10px';
                     errorBox.innerHTML = `
                         <div style="color: var(--err); font-weight: bold; margin-bottom: 5px;">${node.message}</div>
                         <div style="font-size: 11px; opacity: 0.8; line-height: 1.4;">${node.detail}</div>
                     `;
                     container.appendChild(errorBox);
                 }
      });
  }

async function openLesson(lesson) {
    lessonListEl.classList.add('hidden');
    lessonViewerEl.classList.remove('hidden');
    lessonNavContainer.classList.remove('hidden');
    btnBackToLessons.classList.remove('hidden');
    curriculumTitle.textContent = lesson.title;
    
    // Find current lesson index and update navigation buttons
    const allLessons = flattenCurriculumTree(curriculumTree);
    const currentIndex = allLessons.findIndex(l => l.path === lesson.path);

    if (currentIndex > 0) {
        btnPrevLesson.disabled = false;
        btnPrevLesson.onclick = (e) => {
            e.stopPropagation();
            openLesson(allLessons[currentIndex - 1]);
        };
    } else {
        btnPrevLesson.disabled = true;
    }

    if (currentIndex < allLessons.length - 1) {
        btnNextLesson.disabled = false;
        btnNextLesson.onclick = (e) => {
            e.stopPropagation();
            openLesson(allLessons[currentIndex + 1]);
        };
    } else {
        btnNextLesson.disabled = true;
    }

    // Fetch content if not loaded
    if (lesson.content === null) {
        try {
            const response = await fetch(lesson.path);
            lesson.content = await response.text();
        } catch (e) {
            lesson.content = "# Error\nFailed to load lesson content from " + lesson.path;
        }
    }
    
    // Render markdown first
    lessonViewerEl.innerHTML = marked.parse(lesson.content);
    
    // Add copy buttons to code blocks
    const preBlocks = lessonViewerEl.querySelectorAll('pre');
    preBlocks.forEach(pre => {
        const button = document.createElement('button');
        button.className = 'copy-code-btn';
        button.innerHTML = `
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            <span>Copy</span>
        `;
        
        button.onclick = async () => {
            const code = pre.querySelector('code').innerText;
            try {
                await navigator.clipboard.writeText(code);
                button.classList.add('copied');
                button.querySelector('span').textContent = 'Copied!';
                setTimeout(() => {
                    button.classList.remove('copied');
                    button.querySelector('span').textContent = 'Copy';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
            }
        };
        
        pre.appendChild(button);
    });
    
    // Manually trigger Prism highlighting for the new content
    if (window.Prism) {
        Prism.highlightAllUnder(lessonViewerEl);
    }
}

function flattenCurriculumTree(tree) {
    let lessons = [];
    for (const node of tree) {
        if (node.type === 'file') {
            lessons.push(node);
        } else if (node.type === 'folder' && node.children) {
            lessons = lessons.concat(flattenCurriculumTree(node.children));
        }
    }
    return lessons;
}

function addFile(name) {
    const ext = getExt(name);
    const lang = getLang(ext);
    files[name] = { lang, content: '', isDirty: false };
    models[name] = monaco.editor.createModel('', lang);
    switchFile(name);
}

// Resize handling
window.addEventListener('resize', () => {
    safeLayout();
});
