export const generateRandomString = (length: number) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
        
    return result;
}

// Listen for all console events and handle errors
export const logConsoleErrorMessages = (page) => {
    page.on('console', msg => {
        if (msg.type() === 'error')
            console.log(`CONSOLE LOG ARROR: "${msg.text()}"`);
    });
}