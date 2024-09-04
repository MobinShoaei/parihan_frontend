import React, { createContext, Dispatch, SetStateAction } from 'react';

export type DashboardContextType = {
    id?: number;
    setId: Dispatch<SetStateAction<number | undefined>>;
};

export const DashboardContext = createContext<DashboardContextType>({
    setId: () => {},
});

export const DashboardContextProvider: React.FC<{
    value: DashboardContextType;
    children?: any;
}> = ({ value, children }) => {
    return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};
