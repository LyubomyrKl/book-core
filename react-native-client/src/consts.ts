export const getColors = (theme: 'light' | 'dark') => {
    return Object.freeze({
        textGrey: theme === 'light' ? '#5e5e5e' : '#b0b0b0',
        textBlack: theme === 'light' ? '#101010' : '#f0f0f0',
        textPurpleBlue: '#8f9fd5',

        backgroundWhite: theme === 'light' ? 'rgba(250, 250, 250, 1)' : '#101010',
        backgroundGrey: theme === 'light' ? '#e5e5e5' : '#222222',

        touchAnimation: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',

        darkShade: '#263143',
        green: '#5ab491'
    })
}