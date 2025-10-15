import { useCallback, useEffect, useState } from 'react';

export type Appearance = 'light';





const applyTheme = () => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
};





export function initializeTheme() {
    applyTheme();
}

export function useAppearance() {
    return { appearance: 'light', updateAppearance: () => {} } as const;
}
