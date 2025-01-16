// Media Library Management JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const uploadPreview = document.getElementById('uploadPreview');
    const uploadModal = document.getElementById('uploadModal');
    const mediaGrid = document.getElementById('mediaGrid');
    
    // Upload Modal Controls
    document.getElementById('uploadMedia').addEventListener('click', () => {
        uploadModal.style.display = 'block';
    });

    // Close modal buttons
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    // Drag and drop functionality
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // File handling function
    function handleFiles(files) {
        uploadPreview.innerHTML = ''; // Clear previous previews
        
        Array.from(files).forEach(file => {
            if (validateFile(file)) {
                createPreviewElement(file);
            }
        });
    }

    // File validation
    function validateFile(file) {
        const maxSize = 10 * 1024 * 1024; // 10MB
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];

        if (file.size > maxSize) {
            alert(`File ${file.name} is too large. Maximum size is 10MB.`);
            return false;
        }

        if (!allowedTypes.includes(file.type)) {
            alert(`File ${file.name} has an unsupported format.`);
            return false;
        }

        return true;
    }

    // Create preview element
    function createPreviewElement(file) {
        const preview = document.createElement('div');
        preview.className = 'preview-item';

        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = URL.createObjectURL(file);
            preview.appendChild(img);
        } else {
            const icon = document.createElement('div');
            icon.className = 'file-icon';
            icon.textContent = getFileIcon(file.type);
            preview.appendChild(icon);
        }

        const info = document.createElement('div');
        info.className = 'preview-info';
        info.innerHTML = `
            <span class="filename">${file.name}</span>
            <span class="filesize">${formatFileSize(file.size)}</span>
            <button type="button" class="btn-remove">Remove</button>
        `;

        preview.appendChild(info);
        uploadPreview.appendChild(preview);

        // Remove button functionality
        preview.querySelector('.btn-remove').addEventListener('click', () => {
            preview.remove();
        });
    }

    // Utility functions
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    function getFileIcon(type) {
        switch(type) {
            case 'application/pdf':
                return '📄'; // Document emoji
            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return '📄'; // Document emoji
            default:
                return '📁'; // Generic file emoji
        }
    }

    // Upload form submission
    document.getElementById('uploadForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const files = fileInput.files;

        Array.from(files).forEach(file => {
            formData.append('files[]', file);
        });

        try {
            // TODO: Replace with your actual upload endpoint
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Files uploaded successfully!');
                uploadModal.style.display = 'none';
                loadMediaLibrary(); // Refresh media grid
            } else {
                throw new Error('Upload failed');
            }
        } catch (error) {
            alert('Error uploading files: ' + error.message);
        }
    });

    // Load media library
    async function loadMediaLibrary() {
        try {
            // TODO: Replace with your actual API endpoint
            const response = await fetch('/api/media');
            const media = await response.json();
            
            mediaGrid.innerHTML = ''; // Clear existing items
            
            media.forEach(item => {
                const mediaItem = createMediaItem(item);
                mediaGrid.appendChild(mediaItem);
            });
        } catch (error) {
            console.error('Error loading media library:', error);
        }
    }

    // Create media item element
    function createMediaItem(item) {
        const div = document.createElement('div');
        div.className = 'media-item';
        div.innerHTML = `
            <div class="media-preview">
                <img src="${item.url}" alt="${item.alt || item.name}">
            </div>
            <div class="media-info">
                <span class="media-name">${item.name}</span>
                <span class="media-size">${formatFileSize(item.size)}</span>
            </div>
            <div class="media-actions">
                <button class="btn-copy" title="Copy URL">Copy URL</button>
                <button class="btn-delete" title="Delete">Delete</button>
            </div>
        `;

        // Add event listeners for actions
        div.querySelector('.btn-copy').addEventListener('click', () => {
            navigator.clipboard.writeText(item.url);
            alert('URL copied to clipboard!');
        });

        div.querySelector('.btn-delete').addEventListener('click', async () => {
            if (confirm('Are you sure you want to delete this file?')) {
                try {
                    // TODO: Replace with your actual delete endpoint
                    const response = await fetch(`/api/media/${item.id}`, {
                        method: 'DELETE'
                    });

                    if (response.ok) {
                        div.remove();
                    } else {
                        throw new Error('Delete failed');
                    }
                } catch (error) {
                    alert('Error deleting file: ' + error.message);
                }
            }
        });

        return div;
    }

    // Initial load of media library
    loadMediaLibrary();
});
