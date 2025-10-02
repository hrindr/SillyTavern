# 🔍 SillyTavern Extension Development - Lessons Learned

## What Doesn't Work ❌

1. **Complex Template Systems**
   ```javascript
   // DON'T do this - often fails silently
   const settingsHtml = await renderExtensionTemplateAsync(MODULE_NAME, 'settings');
   $('#my_extension_container').append(settingsHtml);
   ```

2. **Assuming Container Existence**
   ```javascript
   // DON'T do this - container might not exist
   $('#my_extension_container').append(html);
   ```

3. **Heavy Dependencies Early**
   ```javascript
   // DON'T start with these - can prevent loading
   import { eventSource, event_types, saveSettingsDebounced } from '../../../script.js';
   import { extension_settings } from '../../extensions.js';
   ```

## What Actually Works ✅

1. **Direct DOM Injection**
   ```javascript
   // DO this - simple and reliable
   jQuery(document).ready(function() {
       const html = `<div id="my-extension-ui">...</div>`;
       $('#extensions_settings2').append(html);
   });
   ```

2. **Multiple Target Fallbacks**
   ```javascript
   // DO this - robust targeting
   const targets = ['#extensions_settings2', '#extensions_settings', '.extensions_block'];
   for (const target of targets) {
       if ($(target).length > 0) {
           $(target).append(html);
           break;
       }
   }
   ```

3. **Simple Starting Point**
   ```javascript
   // DO this - start basic, verify loading
   console.log('Extension: Starting');
   jQuery(document).ready(function() {
       console.log('Extension: DOM Ready');
       // Basic UI injection here
   });
   ```

## Key Lessons 📝

1. **UI Integration**
   - Extensions don't automatically get UI containers
   - Don't rely on template rendering system initially
   - Use direct jQuery DOM manipulation
   - Try multiple container targets

2. **Module Loading**
   - Start with minimal dependencies
   - Verify script loading with console logs
   - Add complexity only after basic loading works
   - Use proper relative paths (../../../script.js from extension directory)

3. **Development Flow**
   - Get console logs working first
   - Add basic UI injection second
   - Add functionality only after UI appears
   - Test each step before adding complexity

## Quick Start That Works 🚀

```javascript
// index.js - Guaranteed to work
console.log('My Extension: Loading');

(function() {
    jQuery(document).ready(function() {
        const html = `
            <div style="padding: 10px; margin: 10px 0; border: 1px solid #ccc;">
                <h4>My Extension</h4>
                <button onclick="alert('Working!')">Test</button>
            </div>
        `;
        
        const targets = ['#extensions_settings2', '#extensions_settings', '.extensions_block'];
        for (const target of targets) {
            if ($(target).length > 0) {
                $(target).append(html);
                break;
            }
        }
    });
})();
```

## Remember 🧠

1. Start simple, get it working, then add features
2. Use direct DOM manipulation before complex systems
3. Always have fallback injection targets
4. Verify each step with console logs
5. Don't overcomplicate initial implementation