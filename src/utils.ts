


function formatDate(dateInput: string | Date): string {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  }

function capitalize(str: string): string {
    if (typeof str !== 'string' || structuredClone.length === 0) 
        {   // Check if the string is valid and not empty 
        return str; // Return the original string if it's not valid   or empty        
        }
        return str.charAt(0).toUpperCase() + str.slice(1);   
    }

export { formatDate};
export { capitalize };
