export const handleEnterPress = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      console.log('Enter key pressed');
        
      const isInputFocused = document.activeElement === document.getElementById('feature-searcher');
  
      if(isInputFocused)
      {
        const detailsSection = document.getElementById('scroll-to-me');
        if (detailsSection) {
            detailsSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
  
export function search(searchText: string) {
    let filter, details, summary, i, j, txtValue;
    filter = searchText.toLowerCase();
    
    details = document.getElementsByTagName('details');
    
    for (i = 0; i < details.length; i++) {
        summary = details[i].getElementsByTagName('summary')[0];
        txtValue = summary.textContent?.toLowerCase() || summary.innerText.toLowerCase();
    
        if (txtValue.includes(filter)) {
            details[i].style.display = '';
        } else {
            let childrenSummaries = details[i].querySelectorAll('summary');
            let foundInChildren = false;
            for (j = 0; j < childrenSummaries.length; j++) {
                let childTxtValue = childrenSummaries[j].textContent?.toLowerCase() || childrenSummaries[j].innerText.toLowerCase();
                if (childTxtValue.includes(filter)) {
                    foundInChildren = true;
                    break;
                }
            }
    
            if (foundInChildren) {
                details[i].style.display = '';
                details[i].open = true; // Open the details element
            } else {
                details[i].style.display = 'none';
                details[i].open = false; // Close the details element
            }
        }
    }
  }

export function collapse() {
    let details = document.querySelectorAll('details');
    details.forEach(function (details) {
      details.removeAttribute('open');
    });
  }