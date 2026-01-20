document.addEventListener('DOMContentLoaded', function() {
    const editor = document.getElementById('editor');
    const clearBtn = document.getElementById('clearBtn');
    const storageKey = 'textEditorContent';

    function loadSavedText() {
        const savedText = localStorage.getItem(storageKey);
        if (savedText) {
            editor.value = savedText;
        }
    }

    function saveText() {
        localStorage.setItem(storageKey, editor.value);
    }

    function clearText() {
        editor.value = '';
        localStorage.removeItem(storageKey);
        editor.focus();
    }

    loadSavedText();

    editor.addEventListener('input', saveText);
    clearBtn.addEventListener('click', clearText);
    editor.addEventListener('keydown', function(event) {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Delete') {
            clearText();
            event.preventDefault();
        }
    });
});