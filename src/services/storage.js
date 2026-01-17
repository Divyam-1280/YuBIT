export const STORAGE_KEYS = {
    USER: 'yufit_user',
    USERS: 'yufit_users',
    MEALS: 'yufit_meals',
    YOGA_ROUTINES: 'yufit_yoga_routines',
    DAILY_ANALYSES: 'yufit_daily_analyses',
};

export const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage', error);
            return null;
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage', error);
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage', error);
        }
    },
};
