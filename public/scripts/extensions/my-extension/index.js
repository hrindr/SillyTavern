import { 
    extension_settings, 
    renderExtensionTemplateAsync,
    saveSettingsDebounced 
} from '../../extensions.js';

import { 
    eventSource, 
    event_types 
} from '../../../script.js';

// Extension module name - should match the directory name
const MODULE_NAME = 'my-extension';

// Default settings for the extension
const defaultSettings = {
    enabled: true,
    exampleSetting: 'default value',
    numberSetting: 42,
    booleanSetting: false
};

// Load extension settings
function loadSettings() {
    // Initialize settings if they don't exist
    if (!extension_settings[MODULE_NAME]) {
        extension_settings[MODULE_NAME] = {};
    }

    // Merge with default settings
    Object.assign(extension_settings[MODULE_NAME], defaultSettings, extension_settings[MODULE_NAME]);

    // Update UI elements with current settings
    updateUIFromSettings();
}

// Update UI elements based on current settings
function updateUIFromSettings() {
    const settings = extension_settings[MODULE_NAME];
    
    $('#my_extension_enabled').prop('checked', settings.enabled);
    $('#my_extension_example_setting').val(settings.exampleSetting);
    $('#my_extension_number_setting').val(settings.numberSetting);
    $('#my_extension_boolean_setting').prop('checked', settings.booleanSetting);
}

// Event handlers for settings changes
function onEnabledChanged() {
    const value = $('#my_extension_enabled').prop('checked');
    extension_settings[MODULE_NAME].enabled = value;
    saveSettingsDebounced();
    console.log('My Extension enabled:', value);
}

function onExampleSettingChanged() {
    const value = $('#my_extension_example_setting').val();
    extension_settings[MODULE_NAME].exampleSetting = value;
    saveSettingsDebounced();
    console.log('My Extension example setting:', value);
}

function onNumberSettingChanged() {
    const value = parseInt($('#my_extension_number_setting').val()) || 0;
    extension_settings[MODULE_NAME].numberSetting = value;
    saveSettingsDebounced();
    console.log('My Extension number setting:', value);
}

function onBooleanSettingChanged() {
    const value = $('#my_extension_boolean_setting').prop('checked');
    extension_settings[MODULE_NAME].booleanSetting = value;
    saveSettingsDebounced();
    console.log('My Extension boolean setting:', value);
}

// Setup event listeners
function setupEventListeners() {
    $('#my_extension_enabled').on('change', onEnabledChanged);
    $('#my_extension_example_setting').on('input', onExampleSettingChanged);
    $('#my_extension_number_setting').on('input', onNumberSettingChanged);
    $('#my_extension_boolean_setting').on('change', onBooleanSettingChanged);
}

// Initialize extension
async function initializeExtension() {
    console.log('Initializing My Extension');
    
    // Create a container for the extension settings if it doesn't exist
    if ($('#my_extension_container').length === 0) {
        // Add container to the extensions menu or a suitable location
        const containerHtml = `<div id="my_extension_container" style="margin: 10px 0;"></div>`;
        $('#extensions_settings2, #extensions_settings, .extensions_info, body').last().append(containerHtml);
    }
    
    // Load extension settings
    loadSettings();
    
    // Add settings UI to the extensions panel
    const settingsHtml = await renderExtensionTemplateAsync(MODULE_NAME, 'settings');
    $('#my_extension_container').html(settingsHtml);
    
    // Setup event listeners
    setupEventListeners();
    
    console.log('My Extension initialized successfully');
}

// Extension entry point - called when the extension is loaded
jQuery(async function () {
    // Wait for SillyTavern to be fully loaded
    await initializeExtension();
    
    // Listen for relevant events
    eventSource.on(event_types.SETTINGS_LOADED_AFTER, loadSettings);
    
    console.log('My Extension loaded');
});