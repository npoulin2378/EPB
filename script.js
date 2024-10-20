// Words categorized based on the updated image
// Words categorized based on the updated image
const wordsExceedsMost = [
    'Administered','Aspired','Averted','Carried','Commanded','Constructed','Decreased',
    'Developed','Drove','Efficiently','Eradicated','Exhibited','Formulated','Garnered',
    'Honored','Instilled','Led','Maximized','Motivated','Originated','Pioneered',
    'Protected','Recognized','Rewarded','Sparked','Supervised','Synchronized','Advocate',
    'Asserted','Awarded','Cemented','Commended','Coordinated','Dedicated','Devoted',
    'Earned','Eliminated','Established','Expedited','Fostered','Generated','Influenced',
    'Instituted','Liberated','Mentored','Nominated','Perfected','Presided','Published',
    'Reduced','Saved','Spearheaded','Surged','Thwarted','Amassed','Attained','Bolstered',
    'Certified','Composed','Counseled','Demonstrated','Directed','Educated','Energized',
    'Evaluated','Flawlessly','Freed','Graduated','Innovated','Integrated','Managed',
    'Modernized','Orchestrated','Piloted','Prevailed','Qualified','Rescued','Skyrocketed',
    'Streamlined','Surpassed','Transformed','Appointed','Authored','Capitalized','Championed',
    'Conquered','Cultivated','Deployed','Dominated','Effectively','Epitomized','Excelled',
    'Formed','Fulfilled','Harmonized','Inspired','Invented','Mastered','Molded','Organized',
    'Pinpointed','Promoted','Quarterbacked','Revitalized','Slashed','Strived','Surveyed',
    'Validated'
];

const wordsExceedsSome = [
    'Assisted','Achieved','Alleviated','Augmented','Boosted','Communicated','Controlled',
    'Redesigned','Escorted','Expanded','Focused','Handpicked','Improved','Induced',
    'Intervened','Investigated','Minimized','Navigated','Outshined','Oversaw','Prevented',
    'Propelled','Provided','Refined','Revised','Selected','Simplified','Standardized',
    'Succeed','Sustained','Targeted','Undertook','Accomplished','Afforded','Anticipated',
    'Bested','Collaborated','Contributed','Converted','Enforced','Exceed','Guided','Honed',
    'Increased','Instructed','Introduced','Localized','Mobilized','Networked','Overcame',
    'Planned','Programmed','Proved','Pursued','Revamped','Revived','Seized','Solved',
    'Strengthened','Supported','Tackled','Tightened','Volunteered'
];

const wordsMetExpectations = [
    'Addressed','Affected','Analyzed','Assessed','Built','Completed','Conducted',
    'Corrected','Created','Edited','Emulated','Ensured','Fixed','Guarded','Helped',
    'Inputted','Studied','Issued','Maintained','Monitored','Operated','Prepared',
    'Produced','Raised','Recommended','Reinforced','Reported','Reviewed','Scheduled',
    'Served','taught','Trained','Advised','Alerted','Arranged','Attended','Captured',
    'Complied with','Conserved','Crafted','Detected','Employed','Engaged','Executed',
    'Furthered','Handled','Initiated','Inspected','Interviewed','Launched','Met',
    'Obtained','Performed','Processed','Proficient','Ran','Regulated','Relieved',
    'Resolved','Routed','Secured','Tested'
];

const wordsMetSome = [
    'Adapted','Aided','Aggressive','Detracted','Encouraged','Enrolled','Participated',
    'Recovered','Redeemed','Salvaged','Settled','Shown','Styled','Voiced'
];

const wordsToAvoid = [
    'Facilitated', 'Trumped'
];

// Synchronize content and height between textarea and div
function syncContent(id) {
    const textarea = document.getElementById(`dutyDescription${id}`);
    const highlighter = document.getElementById(`dutyDescriptionHighlighter${id}`);
  
    // Sync content from textarea to highlighter
    applyHighlighting(textarea.value, id);
  
    // Ensure height matches for both elements
    textarea.style.height = 'auto'; // Reset height to auto to allow shrinking
    highlighter.style.height = 'auto';
    const newHeight = textarea.scrollHeight + 'px'; // Calculate new height
    textarea.style.height = newHeight;
    highlighter.style.height = newHeight;
}
  
// Show textarea and hide highlighter when focused
function moveTextToTextArea(id) {
    const textarea = document.getElementById(`dutyDescription${id}`);
    const highlighter = document.getElementById(`dutyDescriptionHighlighter${id}`);
    highlighter.style.visibility = 'hidden'; // Hide highlighter
    textarea.style.visibility = 'visible'; // Show textarea
    textarea.focus(); // Set focus to the textarea
}
  
// Show highlighter and hide textarea when blurred
function moveTextToDiv(id) {
    const textarea = document.getElementById(`dutyDescription${id}`);
    const highlighter = document.getElementById(`dutyDescriptionHighlighter${id}`);
    applyHighlighting(textarea.value, id); // Sync content
    textarea.style.visibility = 'hidden'; // Hide textarea
    highlighter.style.visibility = 'visible'; // Show highlighter
    saveTextToLocalStorage(id); // Save to localStorage
}
  
// Update character count for textarea
function updateTextCount(id) {
    const textarea = document.getElementById(`dutyDescription${id}`);
    const countLabel = document.getElementById(`dutyCount${id}`);
    countLabel.textContent = textarea.value.length;
}
  
// Load saved text from localStorage when the page loads
window.onload = function() {
    const sections = [1, 2, 3, 4, 5, 6]; // Updated to handle 6 sections
    sections.forEach(id => {
        loadSavedText(id); // Load for each section
    });
};
  
// Function to save text to localStorage
function saveTextToLocalStorage(id) {
    const text = document.getElementById(`dutyDescription${id}`).value;
    localStorage.setItem(`dutyDescription${id}`, text); // Save the text in localStorage for each section
}
  
// Function to load saved text from localStorage
function loadSavedText(id) {
    const savedText = localStorage.getItem(`dutyDescription${id}`);
    if (savedText) {
        document.getElementById(`dutyDescription${id}`).value = savedText; // Load saved text into the textarea
        updateTextCount(id); // Update character count
        applyHighlighting(savedText, id); // Apply highlighting to the saved text
    }
}
  
// Function to apply highlighting to the text in the highlighter div
function applyHighlighting(text, id) {
    const highlighter = document.getElementById(`dutyDescriptionHighlighter${id}`);
    const words = text.split(/\s+/); // Split on one or more spaces
  
    let highlightedText = '';
  
    words.forEach((word, index) => {
        let span = document.createElement('span');
        const lowerWord = word.toLowerCase(); // Convert the word to lowercase for case-insensitive comparison

        // Check if the word is a number (digits, commas, or periods)
        if (/^\d+([.,]\d+)*$/.test(word)) {
            span.classList.add('bold-number'); // Apply the bold-number class to the number
        } else {
            // Check which category the word belongs to (all lists are checked in lowercase)
            if (wordsExceedsMost.map(w => w.toLowerCase()).includes(lowerWord)) {
                span.classList.add('word-exceeds-most');
            } else if (wordsExceedsSome.map(w => w.toLowerCase()).includes(lowerWord)) {
                span.classList.add('word-exceeds-some');
            } else if (wordsMetExpectations.map(w => w.toLowerCase()).includes(lowerWord)) {
                span.classList.add('word-met-expectations');
            } else if (wordsMetSome.map(w => w.toLowerCase()).includes(lowerWord)) {
                span.classList.add('word-met-some');
            } else if (wordsToAvoid.map(w => w.toLowerCase()).includes(lowerWord)) {
                span.classList.add('word-avoid');
            }
        }

        span.textContent = word; // Set the word as text

        // Add the processed word to the highlighted text
        highlightedText += span.outerHTML;

        // Add a space after each word except the last one
        if (index < words.length - 1) {
            highlightedText += ' ';
        }
    });

    // Set the highlighter div's content to the processed text
    highlighter.innerHTML = highlightedText;
}


  
// When highlighter is clicked, show textarea and focus it
function focusTextarea(id) {
    moveTextToTextArea(id);
}
  
// Function to copy text from the textarea to the clipboard
function copyToClipboard(id) {
    const textarea = document.getElementById(`dutyDescription${id}`);
    textarea.select();
    navigator.clipboard.writeText(textarea.value).then(() => {
        alert("Text copied to clipboard!");
    }).catch(err => {
        alert("Failed to copy text: " + err);
    });
}
  
// Add event listeners for the highlighter click to trigger textarea focus
function addHighlighterClickListeners() {
    const sections = [1, 2, 3, 4, 5, 6]; // Updated to handle 6 sections
    sections.forEach(id => {
        document.getElementById(`dutyDescriptionHighlighter${id}`).addEventListener('click', function() {
            focusTextarea(id);
        });
    });
}
  
// Initialize event listeners after page load
window.onload = function() {
    const sections = [1, 2, 3, 4, 5, 6]; // Updated to handle 6 sections
    sections.forEach(id => {
        loadSavedText(id); // Load saved text for each section
    });
    addHighlighterClickListeners(); // Add click listeners for highlighters
};
