/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                js: '#efda4c',
                primary: '#EFDA4C',
                secondary: '#141519',
                tertiary: '#323651',
                fourth: '#DADDDB',
                fifth: '#262D41'
            },
            tab: {
                active: 'border-2 w-1/4 border-fifth h-full pl-2 pr-2 bg-tertiary text-primary',
                inactive:
                    'border-2 w-1/4 border-fifth h-full pl-2 pr-2 bg-tertiary text-primary'
            }
        },
        animation: {
            'navbar-transition': 'navbar-transition 0.2s ease-out forwards '
        },
        keyframes: {
            'navbar-transition': {
                from: {
                    transform: 'translateY(-100%)'
                },
                to: {
                    transform: 'translateY(0%)'
                }
            }
        }
    },
    plugins: []
};
