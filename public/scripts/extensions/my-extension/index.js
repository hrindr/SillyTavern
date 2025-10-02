// My Extension - A simple SillyTavern extension
console.log('My Extension: Script started loading');

// Test basic functionality
(function() {
    console.log('My Extension: IIFE executed');
    
    // Try to add a simple element to test if we can modify the DOM
    jQuery(document).ready(function() {
        console.log('My Extension: Document ready');
        
        // Add a simple test element to extensions_settings2
        const testHtml = `
            <div id="my-extension-test" style="padding: 10px; margin: 10px 0; border: 1px solid #ccc; border-radius: 5px; background: #f9f9f9;">
                <h4>🎉 My Extension is Working!</h4>
                <p>This confirms the extension is loading and can modify the DOM.</p>
                <p>Extension status: <span style="color: green; font-weight: bold;">ACTIVE</span></p>
                <button onclick="alert('My Extension button clicked!')" style="padding: 5px 10px; margin: 5px 0;">Test Button</button>
            </div>
        `;
        
        // Try multiple selectors to find the right place to inject
        const targets = ['#extensions_settings2', '#extensions_settings', '.extensions_block'];
        let injected = false;
        
        for (const target of targets) {
            if ($(target).length > 0) {
                console.log(`My Extension: Found target ${target}, injecting UI`);
                $(target).append(testHtml);
                injected = true;
                break;
            }
        }
        
        if (!injected) {
            console.log('My Extension: No suitable target found, trying body');
            $('body').append(`<div style="position: fixed; top: 10px; right: 10px; z-index: 9999;">${testHtml}</div>`);
        }
        
        console.log('My Extension: UI injection complete');
    });
})();

console.log('My Extension: Script finished loading');
