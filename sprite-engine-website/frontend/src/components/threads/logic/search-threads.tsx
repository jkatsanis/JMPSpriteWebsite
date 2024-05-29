export function handleThreadsEnterClick(event: KeyboardEvent)
{
    if (event.key === 'Enter') {
        console.log('Enter key pressed');
          
        const isInputFocused = document.activeElement === document.getElementById('question-searcher');
    
        if(isInputFocused)
        {
          const detailsSection = document.getElementById('scroll-to-me');
          if (detailsSection) {
              detailsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
}

export function searchThreads(text: string)
{
    let filter, questions, summary, i, cnter, txtValue: string;
    filter = text.toLowerCase();
    
    questions = document.getElementsByClassName('question');
    
    for (i = 0; i < questions.length; i++) {
        let question = questions[i] as HTMLElement;

        // Get text value
        summary = question.getElementsByClassName('question-p')[0];
        cnter = question.getElementsByClassName('question-counter')[0];

        if(summary.textContent === null || cnter === undefined) // Make sure to make like good input yk
        {
            throw new Error("LIKE WTFFFFFFFFFFFF");
        }

        txtValue = summary.textContent.toLowerCase() || summary.textContent?.toLowerCase();
        txtValue += cnter.textContent;

        if (txtValue.includes(filter)) {
            question.style.display = '';
        }
        else question.style.display = 'none';    
    }
}